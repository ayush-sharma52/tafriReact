using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using tafrAPI.Models;

using tafriAPI.Models;
namespace tafriAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WishlistController : ControllerBase
    {
        private readonly ApplicationDbContext _context; // Assuming you have a DataContext for database operations

        public WishlistController(ApplicationDbContext context)
        {
            _context = context;
        }

        // POST: api/Wishlist/add
        [HttpGet("addToWishList")]
        public async Task<IActionResult> AddToWishlist(int userId, int packageId)
        {
            // Validate input
            if (userId <= 0 || packageId <= 0)
            {
                return BadRequest("Invalid userId or packageId.");
            }

            try
            {
                // Check if the package is already in the wishlist
                var existingWishlistItem = await _context.Wishlists
                    .FirstOrDefaultAsync(w => w.UserId == userId && w.PackageId == packageId);

                //if (existingWishlistItem != null)
                //{
                //    return Ok(new { Success = true, Message = "Package is already in the wishlist." });
                //}

                // Create a new wishlist item
                var wishlistItem = new Wishlist
                {
                    UserId = userId,
                    PackageId = packageId
                };

                // Add to the database and save changes
                _context.Wishlists.Add(wishlistItem);
                int result = await _context.SaveChangesAsync();

                return Ok(new { Success = true, Message = "Package added to wishlist successfully." });

                //if (result > 0)
                //{
                //    return Ok(new { Success = true, Message = "Package added to wishlist successfully." });
                //}
                //else
                //{
                //    return BadRequest(new { Success = false, Message = "Failed to add package to wishlist." });
                //}
            }
            catch (Exception ex)
            {
                // Log the exception and return an error response
                // You can log the error using a logging framework like Serilog, NLog, etc.
                return StatusCode(500, new { Success = false, Message = $"An error occurred: {ex.Message}" });
            }
        }
    }
}
