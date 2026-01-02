namespace CleanArchitecture.Core.DTOs
{
    public class FlightDto
    {
        public string Departure { get; set; }       // IATA code
        public string Arrival { get; set; }         // IATA code
        public string Carrier { get; set; }         // Airline code
        public string FlightNumber { get; set; }
        public string DepartureTime { get; set; }   // ISO format
        public string ArrivalTime { get; set; }     // ISO format
        public string Price { get; set; }
        public string Currency { get; set; }
        public string TravelClass { get; set; }     // ECONOMY, BUSINESS etc.
        public string Date { get; set; }            // Only for LuckyFlight
        public int? TicketId { get; set; }
    }
}
