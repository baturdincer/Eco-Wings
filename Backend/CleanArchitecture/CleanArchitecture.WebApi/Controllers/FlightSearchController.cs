using CleanArchitecture.Core.Enums;
using CleanArchitecture.Core.Features.Flights.Commands.SearchFlightsAndCreateTickets;
using CleanArchitecture.Core.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Components.Forms;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class FlightSearchController : ControllerBase
{
    private readonly IMediator _mediator;
    private readonly IAmadeusService _amadeusService;

    public FlightSearchController(IAmadeusService amadeusService, IMediator mediator)
    {
        _amadeusService = amadeusService;
        _mediator = mediator;
    }

    [HttpGet("search")]
    public async Task<IActionResult> SearchAndBook(
    [FromQuery] string origin,
    [FromQuery] string destination,
    [FromQuery] string date,
    [FromQuery] int userId,
    [FromQuery] int adults = 1,
    [FromQuery] TravelClass travelClass = TravelClass.ECONOMY)
    {
        var command = new SearchFlightsAndCreateTicketsCommand
        {
            Origin = origin,
            Destination = destination,
            Date = date,
            UserId = userId,
            Adults = adults,
            TravelClass = travelClass.ToString()
        };

        var result = await _mediator.Send(command);

        var response = result.Select(r => new
        {
            Flight = r.Flight,
            TicketId = r.TicketId
        });

        return Ok(response);
    }
}