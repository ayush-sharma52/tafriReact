using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using NuGet.Packaging.Signing;
using tafrAPI.Models;
using tafriAPI.Models;

namespace YourNamespace.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SpecialAssignedPackagesApiController : Controller
    {
         private readonly ApplicationDbContext _context;
        

        public SpecialAssignedPackagesApiController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("AssignPackage")]
        public async Task<IActionResult> AddSpecialAssignedPackage([FromBody] AssignPackageRequest request)
        {
            // Validate input parameters
            if (request.UserId <= 0 || request.PackageId <= 0)
            {
                return BadRequest("Invalid userId or packageId.");
            }

            // Create a new SpecialAssignedPackage object
            var specialAssignedPackage = new SpecialAssignedPackage
            {
                UserId = request.UserId,
                PackageId = request.PackageId
            };

            // Add the new object to the DbContext
            await _context.SpecialAssignedPackages.AddAsync(specialAssignedPackage);

            // Save changes to the database
            await _context.SaveChangesAsync();

            // Return success response
            return Ok("Special assigned package created successfully.");
        }

    }
    public class AssignPackageRequest
    {
        public int UserId { get; set; }
        public int PackageId { get; set; }
    }

}
