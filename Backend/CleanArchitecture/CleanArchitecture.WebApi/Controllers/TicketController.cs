using CleanArchitecture.Core.Features.Tickets.Commands.CreateTicket;
using CleanArchitecture.Core.Features.Tickets.Commands.DeleteTicket;
using CleanArchitecture.Core.Features.Tickets.Commands.UpdateTicket;
using CleanArchitecture.Core.Features.Tickets.Commands.CreateTicketWithCoupon;
using CleanArchitecture.Core.Features.Tickets.Queries.GetAllTickets;
using CleanArchitecture.Core.Features.Tickets.Queries.GetTicketById;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using CleanArchitecture.Core.Features.Tickets.Queries.GetUserFlights;

namespace CleanArchitecture.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketController : ControllerBase
    {
        private readonly IMediator _mediator;

        public TicketController(IMediator mediator)
        {
            _mediator = mediator;
        }

        // POST: api/ticket
        [HttpPost]
        public async Task<IActionResult> Create(CreateTicketCommand command)
        {
            var ticketId = await _mediator.Send(command);
            return CreatedAtAction(nameof(GetById), new { id = ticketId }, ticketId);
        }

        // GET: api/ticket
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var tickets = await _mediator.Send(new GetAllTicketsQuery());
            return Ok(tickets);
        }

        // GET: api/ticket/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var ticket = await _mediator.Send(new GetTicketByIdQuery { Id = id });
            return Ok(ticket);
        }

        // PUT: api/ticket/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, UpdateTicketCommand command)
        {
            if (id != command.Id)
                return BadRequest("Route ID and body ID must match.");

            var updatedTicketId = await _mediator.Send(command);
            return Ok(updatedTicketId);
        }

        // DELETE: api/ticket/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deletedTicketId = await _mediator.Send(new DeleteTicketCommand { Id = id });
            return Ok(deletedTicketId);
        }

        // POST: api/ticket/with-coupon
        [HttpPost("with-coupon")]
        public async Task<IActionResult> ApplyCouponToTicket([FromBody] CreateTicketWithCouponCommand command)
        {
            var result = await _mediator.Send(command);
            return Ok(result);
        }

        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetFlightsForUser(int userId)
        {
            var result = await _mediator.Send(new GetUserFlightsQuery(userId));
            return Ok(result);
        }

    }
}
