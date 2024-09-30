using Microsoft.AspNetCore.Mvc;
using tafriAPI.Models;


namespace tafriAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RegisterController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public RegisterController(ApplicationDbContext context)
        {
            _context = context;
        }

        
        [HttpPost("registerUser")]
        public async Task<IActionResult> RegisterUser([FromBody] UserDto userDto)
        {
            if (userDto == null)
            {
                return BadRequest("User data is null.");
            }

            // user entity from DTO

            var user = new User
            {
                Name = userDto.Username,
                EmailId = userDto.Email,
                Password = userDto.Password, 
                IsAuthorized = userDto.IsAuthorized,
                Role = userDto.Role,    

            };

            // Save user to the db

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok("User registered successfully.");
        }

        [HttpPost("registerSupplier")]
        public async Task<IActionResult> RegisterSupplier([FromBody] UserDto userDto)
        {
            if (userDto == null)
            {
                return BadRequest("User data is null.");
            }

            // user entity from DTO

            var user = new User
            {
                Name = userDto.Username,
                EmailId = userDto.Email,
                Password = userDto.Password,
                IsAuthorized = userDto.IsAuthorized,
                Role = userDto.Role,
                AccountNumber = userDto?.accountNumber,
                Address = userDto?.Address,
                PhoneNumber = userDto?.PhoneNumber,
                ContactPerson = userDto?.ContactPerson,
                CompanyName = userDto?.CompanyName,

            };


            // Save user to the db

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok("User registered successfully.");
        }
    }

}
