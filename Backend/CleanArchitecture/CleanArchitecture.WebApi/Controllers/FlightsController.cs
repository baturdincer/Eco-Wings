using CleanArchitecture.Core.Features.Flights.Commands.CreateFlight;
using CleanArchitecture.Core.Features.Flights.Commands.UpdateFlight;
using CleanArchitecture.Core.Features.Flights.Commands.DeleteFlight;
using CleanArchitecture.Core.Features.Flights.Queries.GetFlightById;
using CleanArchitecture.Core.Features.Flights.Queries.GetAllFlights;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using CleanArchitecture.Core.DTOs.Flight;
using CleanArchitecture.Core.Entities;
using System;
using CleanArchitecture.Core.Features.Flights.Commands.BookFlight;

namespace CleanArchitecture.WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FlightsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public FlightsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        // Create Flight
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateFlightCommand command)
        {
            var flightId = await _mediator.Send(command);
            return CreatedAtAction(nameof(GetById), new { id = flightId }, new { id = flightId });
        }

        // Get Flight by ID
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var flight = await _mediator.Send(new GetFlightByIdQuery { Id = id });
            if (flight == null)
                return NotFound();

            return Ok(flight);
        }

        // Get All Flights
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var flights = await _mediator.Send(new GetAllFlightsQuery());
            return Ok(flights);
        }

        // Update Flight
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateFlightCommand command)
        {
            if (id != command.Id)
                return BadRequest("ID mismatch.");

            await _mediator.Send(command);
            return NoContent();
        }

        // Delete Flight
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _mediator.Send(new DeleteFlightCommand { Id = id });
            return NoContent();
        }
        [HttpPost("book")]
        public async Task<IActionResult> BookFlight([FromBody] BookFlightCommand command)
        {
            var ticketId = await _mediator.Send(command);
            return Ok(new { ticketId });
        }


    }
}
