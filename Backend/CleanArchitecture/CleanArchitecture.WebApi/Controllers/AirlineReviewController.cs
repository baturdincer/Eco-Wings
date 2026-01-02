using CleanArchitecture.Core.Features.AirlineReviews.Commands.CreateAirlineReview;
using CleanArchitecture.Core.Features.AirlineReviews.Commands.DeleteAirlineReview;
using CleanArchitecture.Core.Features.AirlineReviews.Commands.UpdateAirlineReview;
using CleanArchitecture.Core.Features.AirlineReviews.Queries.GetAllAirlineReviews;
using CleanArchitecture.Core.Features.AirlineReviews.Queries.GetAirlineReviewById;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace CleanArchitecture.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AirlineReviewController : ControllerBase
    {
        private readonly IMediator _mediator;

        public AirlineReviewController(IMediator mediator)
        {
            _mediator = mediator;
        }

        // POST: api/airlinereview
        [HttpPost]
        public async Task<IActionResult> Create(CreateAirlineReviewCommand command)
        {
            var reviewId = await _mediator.Send(command);
            return CreatedAtAction(nameof(GetById), new { id = reviewId }, reviewId);
        }

        // GET: api/airlinereview
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var reviews = await _mediator.Send(new GetAllAirlineReviewsQuery());
            return Ok(reviews);
        }

        // GET: api/airlinereview/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var review = await _mediator.Send(new GetAirlineReviewByIdQuery { Id = id });
            return Ok(review);
        }

        // PUT: api/airlinereview/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, UpdateAirlineReviewCommand command)
        {
            if (id != command.Id)
                return BadRequest("Route ID and body ID must match.");

            var updatedId = await _mediator.Send(command);
            return Ok(updatedId);
        }

        // DELETE: api/airlinereview/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deletedId = await _mediator.Send(new DeleteAirlineReviewCommand { Id = id });
            return Ok(deletedId);
        }
    }
}
