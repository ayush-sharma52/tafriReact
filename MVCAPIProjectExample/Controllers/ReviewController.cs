using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using tafriAPI.Models;

namespace tafriAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewController : ControllerBase
    {
        

        private readonly ApplicationDbContext _context;


        public ReviewController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("getReviewsByPackageId")]

        public async Task<IActionResult> getReviewByPackageId(int pkgId)
        {

            var reviews = await _context.Reviews.
                                Include(rvw => rvw.UserDetail)
                                .Where(rvw => rvw.PackageId == pkgId).
                                ToListAsync();

            foreach (var review in reviews)
            {
                _context.Entry(review).Reference(r => r.UserDetail).Load();
            }

            return Ok(reviews);

        }

        [HttpGet("getAllReviews")]

        public async Task<IActionResult> getAllReviews()
        {


            var reviews = await _context.Reviews.Include(r => r.PackageDetail).
                Include(r => r.UserDetail)
                .ToListAsync();

            return Ok(reviews);

        }
    }
}
