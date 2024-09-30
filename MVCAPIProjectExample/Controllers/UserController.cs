using tafriMVC.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using tafriAPI.Models;
using Org.BouncyCastle.Pkcs;

namespace tafriAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UserController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("getUsers")]
        public async Task<IActionResult> getAllUsers()
        {
            var users = await _context.Users.ToListAsync();

            return Ok(users);
        }

        [HttpPost("approveSupplier")]
        public async Task<IActionResult> ApproveSupplier([FromBody] int supplierId)
        {
            var supplier = await _context.Users.FindAsync(supplierId);
            if (supplier == null)
            {
                return NotFound($"Supplier with ID {supplierId} not found.");
            }

            // Update the supplier's status to approved
            supplier.IsAuthorized = true; 
            await _context.SaveChangesAsync();

            return Ok($"Supplier with ID {supplierId} has been approved.");
        }


        [HttpPost("lockSupplier")]
        public async Task<IActionResult> LockSupplier([FromBody] int supplierId)
        {
            var supplier = await _context.Users.FindAsync(supplierId);
            if (supplier == null)
            {
                return NotFound($"Supplier with ID {supplierId} not found.");
            }

            // Update the supplier's status to locked
            supplier.IsAuthorized = false;
            await _context.SaveChangesAsync();

            return Ok($"Supplier with ID {supplierId} has been locked.");
        }


        // get  user by email id 

        [HttpPost("findUserByEmailId")]
        public async Task<IActionResult> findUserByEmailId([FromBody] string email)
        {
            var sqlQuery = "SELECT * FROM Users WHERE EmailId = @p0";

            // Execute the SQL query
            var user = await _context.Users
                .FromSqlRaw(sqlQuery, email)
                .FirstOrDefaultAsync();

            return Ok(user);

        }

        [HttpGet("findUserById/{userId}")]
        public async Task<IActionResult> findUserById(int userId)
        {
            var sqlQuery = "SELECT * FROM Users WHERE Id = @p0";

            // Execute the SQL query
            var user = await _context.Users
                .FromSqlRaw(sqlQuery, userId)
                .FirstOrDefaultAsync();

            return Ok(user);

        }

        [HttpPost("AddReview")]

        public async Task<IActionResult> AddReview([FromBody]ReviewDTO request)
        {
            Review newReview = new Review
            {
                Rating = request.Rating,
                Description = request.Description,
                UserId = request.UserId,
                PackageId = request.PackageId,
                IsAnonymous = request.IsAnonymous,  
            };

            var alreadyExist = _context.Reviews.Where(rvw => rvw.UserId == request.UserId && rvw.PackageId == request.PackageId);

            if (alreadyExist.Any()) {

                return BadRequest("You have already given the feedback for this package");
            }

            await _context.Reviews.AddAsync(newReview);

            await _context.SaveChangesAsync();

            return Ok(newReview);
           
        }





    }

}
