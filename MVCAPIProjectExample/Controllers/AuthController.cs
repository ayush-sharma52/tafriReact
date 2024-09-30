using tafriMVC.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using tafriAPI.Models;

namespace tafriAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AuthController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDto loginRequest)
        {
            if (loginRequest == null)
            {
                return BadRequest("Invalid client request");
            }

            var email = loginRequest.Email.Trim();  // Ensure there are no leading/trailing spaces

            //// Define the SQL query
            var sqlQuery = "SELECT * FROM Users WHERE EmailId = @p0";

            // Execute the SQL query
            var user = await _context.Users
                .FromSqlRaw(sqlQuery, email)
                .FirstOrDefaultAsync();

            return Ok(user);
        }
    }

    public class LoginRequestDto
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
