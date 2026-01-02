using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using CleanArchitecture.Core.DTOs;
using CleanArchitecture.Core.Interfaces;
using Microsoft.Extensions.Options;
using CleanArchitecture.Core.Settings;
using System.Net.Http.Json;
using CleanArchitecture.Core.Entities;

namespace CleanArchitecture.Infrastructure.Services
{
    public class AmadeusService : IAmadeusService
    {
        private readonly HttpClient _httpClient;
        private readonly IGenericRepositoryAsync<Airport> _airportRepo;
        private readonly IGenericRepositoryAsync<Airline> _airlineRepo;
        private readonly IGenericRepositoryAsync<Flight> _flightRepo;
        private readonly IGenericRepositoryAsync<Ticket> _ticketRepo;


        private readonly AmadeusSettings _settings;

        public AmadeusService(
            HttpClient httpClient,
            IOptions<AmadeusSettings> settings,
            IGenericRepositoryAsync<Airport> airportRepo,
            IGenericRepositoryAsync<Airline> airlineRepo,
            IGenericRepositoryAsync<Flight> flightRepo,
            IGenericRepositoryAsync<Ticket> ticketRepo)
        {
            _httpClient = httpClient;
            _settings = settings.Value;

            _airportRepo = airportRepo;
            _airlineRepo = airlineRepo;
            _flightRepo = flightRepo;
            _ticketRepo = ticketRepo;
        }

        public async Task<string> GetAccessTokenAsync()
        {
            var content = new FormUrlEncodedContent(new[]
            {
            new KeyValuePair<string, string>("grant_type", "client_credentials"),
            new KeyValuePair<string, string>("client_id", _settings.ClientId),
            new KeyValuePair<string, string>("client_secret", _settings.ClientSecret)
        });

            var response = await _httpClient.PostAsync($"{_settings.BaseUrl}/v1/security/oauth2/token", content);
            var json = await response.Content.ReadFromJsonAsync<JsonElement>();
            return json.GetProperty("access_token").GetString();
        }

        public async Task<List<FlightDto>> SearchFlightsAsync(string origin, string destination, string date, int adults, string travelClass)
        {
            var token = await GetAccessTokenAsync();

            var request = new HttpRequestMessage(HttpMethod.Get,
                $"{_settings.BaseUrl}/v2/shopping/flight-offers" +
                $"?originLocationCode={origin}" +
                $"&destinationLocationCode={destination}" +
                $"&departureDate={date}" +
                $"&adults={adults}" +
                $"&travelClass={travelClass}" + 
                $"&currencyCode=EUR");

            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);

            var response = await _httpClient.SendAsync(request);
            var json = await response.Content.ReadFromJsonAsync<JsonElement>();

            var results = new List<FlightDto>();

            foreach (var item in json.GetProperty("data").EnumerateArray())
            {
                var segments = item
                    .GetProperty("itineraries")[0]
                    .GetProperty("segments");

                var lastSegment = segments[segments.GetArrayLength() - 1];
                var arrivalCode = lastSegment.GetProperty("arrival").GetProperty("iataCode").GetString();

                // ✅ Only include if final arrival matches requested destination
                if (!string.Equals(arrivalCode, destination, StringComparison.OrdinalIgnoreCase))
                    continue;

                var firstSegment = segments[0];
                var depCode = firstSegment.GetProperty("departure").GetProperty("iataCode").GetString();
                var depTime = firstSegment.GetProperty("departure").GetProperty("at").GetString();
                var arrTime = lastSegment.GetProperty("arrival").GetProperty("at").GetString();
                var carrier = firstSegment.GetProperty("carrierCode").GetString();
                var flightNumber = firstSegment.GetProperty("number").GetString();

                var price = item.GetProperty("price").GetProperty("total").GetString();
                var currency = item.GetProperty("price").GetProperty("currency").GetString();

                results.Add(new FlightDto
                {
                    Departure = depCode,
                    Arrival = arrivalCode,
                    DepartureTime = depTime,
                    ArrivalTime = arrTime,
                    Carrier = carrier,
                    FlightNumber = flightNumber,
                    Price = price,
                    Currency = currency
                });
            }

            return results;
        }
        public async Task<FlightDto?> GetLuckyFlightAndCreateTicketAsync(string origin, int userId)
        {
            var random = new Random();
            var maxAttempts = 5;
            var attempts = 0;

            var destinations = new List<string> { "SAW", "ADB", "ESB", "AYT", "ADA", "TZX", "BJV", "GZT", "DIY", "ASR", "VAN", "SZF", "HTY", "ERZ", "OGU", "KYA" }
                .Where(code => !code.Equals(origin, StringComparison.OrdinalIgnoreCase))
                .ToList();

            var airports = await _airportRepo.GetAllAsync();
            var airlines = await _airlineRepo.GetAllAsync();

            while (attempts < maxAttempts)
            {
                attempts++;
                var destination = destinations[random.Next(destinations.Count)];
                var randomDate = DateTime.Today.AddDays(random.Next(1, 31)).ToString("yyyy-MM-dd");

                var flights = await SearchFlightsAsync(origin, destination, randomDate, 1, "ECONOMY");

                if (flights != null && flights.Any())
                {
                    var dto = flights.First();
                    dto.Date = randomDate;

                    // 📌 DB'ye flight ekle
                    var departureId = airports.FirstOrDefault(a => a.Code == dto.Departure)?.Id ?? 0;
                    var destinationId = airports.FirstOrDefault(a => a.Code == dto.Arrival)?.Id ?? 0;
                    var airlineId = airlines.FirstOrDefault(a => a.Name == dto.Carrier)?.Id ?? 1;

                    if (departureId == 0 || destinationId == 0)
                        continue;

                    var flight = new Flight
                    {
                        FlightNumber = dto.FlightNumber,
                        DepartureTime = DateTime.Parse(dto.DepartureTime),
                        EstimatedArrivalTime = DateTime.Parse(dto.ArrivalTime),
                        Price = decimal.Parse(dto.Price),
                        AirlineId = airlineId,
                        DepartureAirportId = departureId,
                        DestinationAirportId = destinationId
                    };

                    await _flightRepo.AddAsync(flight);

                    // ✅ Ticket oluştur
                    var ticket = new Ticket
                    {
                        PassengerId = userId,
                        Flight = flight,
                        BookingDate = DateTime.UtcNow,
                        IsPaid = false,
                        PnrCode = null,
                        Price = flight.Price
                    };

                    await _ticketRepo.AddAsync(ticket);
                    dto.TicketId = ticket.Id;

                    return dto;
                }
            }

            return null;
        }




    }
}
