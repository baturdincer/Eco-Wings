using CleanArchitecture.Core.Features.Auth.Commands.LoginUser;
using CleanArchitecture.Core.Features.Auth.Commands.RegisterUser;
using CleanArchitecture.Core.Features.Auth.Commands.SendConfirmEmail;
using CleanArchitecture.Core.Features.Auth.Commands.ConfirmEmail;
using CleanArchitecture.Core.Features.Auth.Commands.ForgetPassword;
using CleanArchitecture.Core.Features.Auth.Commands.ResetPassword;
using CleanArchitecture.Core.DTOs.Email;
using CleanArchitecture.Core.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;

namespace CleanArchitecture.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly IEmailService _emailService;
        private readonly ILogger<AuthController> _logger;

        public AuthController(
            IMediator mediator, 
            IEmailService emailService,
            ILogger<AuthController> logger)
        {
            _mediator = mediator;
            _emailService = emailService;
            _logger = logger;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterUserCommand command)
        {
            var userId = await _mediator.Send(command);
            return Ok(new { UserId = userId, Message = "User registered successfully." });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginUserCommand command)
        {
            var token = await _mediator.Send(command);
            return Ok(new { Token = token });
        }

        [HttpPost("send-confirm-email")]
        public async Task<IActionResult> SendConfirmEmail(SendConfirmEmailCommand command)
        {
            var result = await _mediator.Send(command);
            if (result)
                return Ok(new { Message = "Confirmation email sent successfully." });
            else
                return BadRequest(new { Message = "Failed to send confirmation email." });
        }

        [HttpPost("confirm-email")]
        public async Task<IActionResult> ConfirmEmail(ConfirmEmailCommand command)
        {
            var result = await _mediator.Send(command);
            if (result)
                return Ok(new { Message = "Email confirmed successfully." });
            else
                return BadRequest(new { Message = "Failed to confirm email." });
        }

        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword(ForgetPasswordCommand command)
        {
            try
            {
                _logger.LogInformation($"Processing forgot password request for email: {command.Email}");
                var result = await _mediator.Send(command);
                if (result)
                {
                    _logger.LogInformation($"Password reset email sent successfully to: {command.Email}");
                    return Ok(new { Message = "Password reset email sent successfully." });
                }
                else
                {
                    _logger.LogWarning($"Failed to send password reset email to: {command.Email}");
                    return BadRequest(new { Message = "Failed to send password reset email. Please check the email address and try again." });
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error processing forgot password request: {ex.Message}");
                return StatusCode(500, new { Message = $"An error occurred: {ex.Message}" });
            }
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword(ResetPasswordCommand command)
        {
            var result = await _mediator.Send(command);
            if (result)
                return Ok(new { Message = "Password reset successfully." });
            else
                return BadRequest(new { Message = "Failed to reset password." });
        }

        // Test endpoint for email sending
        [HttpPost("test-email")]
        public async Task<IActionResult> TestEmail([FromBody] TestEmailRequest request)
        {
            try
            {
                _logger.LogInformation($"Testing email sending to: {request.Email}");
                
                await _emailService.SendAsync(new EmailRequest
                {
                    To = request.Email,
                    Subject = "Test Email from Your Application",
                    Body = "<h4>This is a test email</h4><p>If you received this email, your email configuration is working correctly.</p>"
                });
                
                _logger.LogInformation($"Test email sent successfully to: {request.Email}");
                return Ok(new { Message = "Test email sent successfully" });
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error sending test email: {ex.Message}");
                if (ex.InnerException != null)
                {
                    _logger.LogError($"Inner exception: {ex.InnerException.Message}");
                }
                return StatusCode(500, new { Error = ex.Message, InnerError = ex.InnerException?.Message });
            }
        }
    }

    public class TestEmailRequest
    {
        public string Email { get; set; }
    }
}
