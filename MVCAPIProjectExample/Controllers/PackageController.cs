using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using tafriAPI.Models;


namespace tafriAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PackageController : ControllerBase
    {
        private readonly ApplicationDbContext _context;


        public PackageController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpOptions]
        public IActionResult HandleOptions()
        {
            return Ok();
        }
        [HttpPost("AddPackage")]
        public async Task<IActionResult> AddPackage([FromBody] PackageDTO packageDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Create and save the Package entity
            var package = new Package
            {
                Name = packageDto.Name,
                Destination = packageDto.Destination,
                Details = packageDto.Details,
                Count = packageDto.Count,
                OnHold = packageDto.OnHold,
                Price = packageDto.Price,
                Released = packageDto.Released,
                Hold = packageDto.Hold,
                Available = packageDto.Available,
                FinalPrice = packageDto.Price,
                UserId = packageDto.UserId // Assuming this is the user who created the package
            };

            _context.Packages.Add(package);
            await _context.SaveChangesAsync();

            //// Create and save PackageInstance entities
            //var packageInstances = new List<PackageInstance>();
            //for (int i = 0; i < package.Count; i++)
            //{
            //    var packageInstance = new PackageInstance
            //    {
            //        IsAvailable = i < package.OnHold ? false : true, // Set IsAvailable based on OnHold
            //        PackageId = package.Id,

            //    };

            //    packageInstances.Add(packageInstance);
            //}

            //_context.PackageInstances.AddRange(packageInstances);
            //await _context.SaveChangesAsync();

            return Ok(package);
        }

        //get all packages
        [HttpGet("GetPackages")]
        public async Task<IActionResult> GetPackages()
        {

            var packages = await _context.Packages.ToListAsync();

            //if (packages == null || !packages.Any())
            //{
            //    return NotFound("No packages found currently");
            //}

            return Ok(packages);

        }

        [HttpGet("GetPackagesBySupplier/{supplierId}")]
        public async Task<IActionResult> GetPackagesBySupplier(int supplierId)
        {
            if (supplierId <= 0)
            {
                return BadRequest("Invalid supplier ID.");
            }

            var packages = await _context.Packages
                .Where(p => p.UserId == supplierId)
                .ToListAsync();


            //if (packages == null || !packages.Any())
            //{
            //    return NotFound("No packages found for the given supplier ID.");
            //}

            return Ok(packages);
        }

        public class SearchRequest
        {
            public string Destination { get; set; }
            public DateTime CheckinDate { get; set; }
            public decimal Budget { get; set; }
        }
        [HttpPost("PackageSearchBar")]
        public async Task<IActionResult> SearchPackages([FromBody] SearchRequest request)
        {
            // Validate the incoming request
            if (request == null || string.IsNullOrWhiteSpace(request.Destination))
            {
                return BadRequest("Invalid search parameters.");
            }

            if (request.Budget <= 0)
            {
                request.Budget = 100000000;
            }

            //.Where(p => p.Destination.Equals(request.Destination, StringComparison.OrdinalIgnoreCase)
            //               && p.CheckinDate.Date == request.CheckinDate.Date
            //               && p.Price <= request.Budget)


            if (request.Destination.Equals("All", StringComparison.OrdinalIgnoreCase))
            {
                // Return all packages
                var allMatchingPackages = await _context.Packages
             .Where(p => p.Price <= request.Budget && p.Visible == true)
             .ToListAsync();

                // Return the matching packages
                return Ok(allMatchingPackages);
            }


            var matchingPackages = await _context.Packages
             .Where(p => p.Destination.ToLower() == request.Destination.ToLower()
                         && p.Price <= request.Budget)
             .ToListAsync();

            // Return the matching packages
            return Ok(matchingPackages);
        }
        //get package by id

        [HttpGet("Details/{id}")]
        public async Task<IActionResult> GetPackageDetails(int id)
        {
            var package = await _context.Packages
                .FirstOrDefaultAsync(p => p.Id == id);

            if (package == null)
            {
                return NotFound();
            }

            return Ok(package);
        }

        [HttpGet("GetPackageById/{id}")]
        public async Task<IActionResult> GetPackageById(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid Package ID.");
            }

            var package = await _context.Packages.FirstOrDefaultAsync(p => p.Id == id);

            if (package == null)
            {
                return NotFound("No package found for the given ID.");
            }

            return Ok(package);

        }

        [HttpGet("findBookingByUserId/{userId}")]

        public async Task<IActionResult> getBookingsByUserId(int userId)
        {
            var packages = await _context.Bookings
           .Where(b => b.UserId == userId)
           .Select(b => b.Package)
           .Distinct()
           .ToListAsync();


            return Ok(packages);
        }
        //updating existing package
        [HttpPost("ModifyPackage")]
        public async Task<IActionResult> ModifyPackage([FromBody] PackageDTO packageDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            //fetchin from db the existing one
            var package = await _context.Packages.FindAsync(packageDto.Id);

            if (package == null)
            {
                return NotFound("Package not found.");
            }


            //Updating fetched one
            package.Name = packageDto.Name;
            package.Destination = packageDto.Destination;
            package.Details = packageDto.Details;
            package.Count = packageDto.Count;
            package.OnHold = packageDto.OnHold;
            package.Hold = packageDto.Hold;

            if (packageDto.Price != package.Price) //modifying by supplier
            { package.Price = packageDto.Price; package.FinalPrice = packageDto.Price; }

            if (packageDto.finalprice != package.FinalPrice) //modifying by admin
            { package.Price = packageDto.Price; package.FinalPrice = packageDto.finalprice; }
            package.Available = packageDto.Available;
            package.Visible = packageDto.Visible;
            package.Released = packageDto.Released;
            package.UserId = packageDto.UserId;
            package.AssignedUserId = packageDto.AssignedUserId;


            await _context.SaveChangesAsync();

            return Ok(package);
        }

        //Toggling package visibility
        [HttpPost("TogglePackage")]
        public async Task<IActionResult> TogglePackage([FromBody] int packageId)
        {
            //fetchin from db the existing one
            var package = await _context.Packages.FindAsync(packageId);

            if (package == null)
            {
                return NotFound("Package not found.");
            }

            //toggling visibility 
            package.Visible = !package.Visible;



            //update db
            await _context.SaveChangesAsync();

            return Ok(package.Visible);
        }


        [HttpGet("ReleasePackage/{id}")]
        public async Task<IActionResult> ReleasePackage(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid Package ID.");
            }

            var package = await _context.Packages.FirstOrDefaultAsync(p => p.Id == id);

            if (package == null)
            {
                return NotFound("No package found for the given ID.");
            }

            //toggling Release 
            package.Released = !package.Released;



            //update db
            await _context.SaveChangesAsync();

            return Ok(package.Released);


        }


        [HttpGet("DisapprovePackage/{id}")]
        public async Task<IActionResult> DisapprovePackage(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid Package ID.");
            }

            var package = await _context.Packages.FirstOrDefaultAsync(p => p.Id == id);

            if (package == null)
            {
                return NotFound("No package found for the given ID.");
            }

            //unreleasing and invisible
            package.Released = false;
            package.Visible = false;



            //update db
            await _context.SaveChangesAsync();

            return Ok(package);


        }

        // Get special assigned packages for the user

        [HttpGet("SpeciallyAssignedPackages/{userId}")]
        public async Task<IActionResult> GetSpeciallyAssignedPackages(int userId)
        {
            // Validate userId
            if (userId <= 0)
            {
                return BadRequest("Invalid user ID");
            }

            // Get special assigned packages for the user
            var specialAssignedPackages = await _context.SpecialAssignedPackages
                .Where(p => p.UserId == userId)
                .Join(
                    _context.Packages, 
                    sap => sap.PackageId,
                    pkg => pkg.Id,
                    (sap, pkg) => new
                    {
                        pkg.Id,
                        pkg.Name,
                        pkg.Destination,
                        pkg.Price,
                        pkg.Details,
                        pkg.Visible,
                        pkg.FinalPrice
                    }
                )
                .Where(p => p.Visible == true)
                .ToListAsync();

            return Ok(specialAssignedPackages);
        }

        [HttpGet("getwishlistedPackage")]
        public async Task<IActionResult> GetUserWishlist([FromQuery] int userId)
        {
            // LINQ query to get the wishlisted packages for the given user ID
            var userWishlistedPackages = await (from watchlist in _context.Wishlists
                                                join package in _context.Packages
                                                on watchlist.PackageId equals package.Id
                                                where watchlist.UserId == userId && package.Visible == true
                                                select new
                                                {
                                                    package.Id,
                                                    package.Name,
                                                    package.Destination,
                                                    package.Price,
                                                    package.Details,
                                                    package.FinalPrice
                                                })
                                    .ToListAsync();

            if (!userWishlistedPackages.Any())
            {
                return NotFound("No packages found in the wishlist for the specified user.");
            }

            return Ok(userWishlistedPackages);
        }

        [HttpGet("getPackagesByDestinationName")]
        public async Task<IActionResult> GetPackagesByDestinationName([FromQuery] string destination)
        {
            var packages = await _context.Packages
                .Where(p => p.Destination == destination && p.Visible == true)
                .ToListAsync();

            // Check if any packages were found
            if (packages == null || !packages.Any())
            {
                return NotFound("No packages found for the specified destination name.");
            }

            return Ok(packages);
        }

        
    }
}
