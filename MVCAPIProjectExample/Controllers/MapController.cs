using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using tafriAPI.Models;

namespace tafriAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MapController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public MapController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("AddLocation")]
        public async Task<IActionResult> AddLocation([FromBody] MapLocation mapLocationRequest)
        {
            MapLocation newMapLocation = new MapLocation
            {
                Name = mapLocationRequest.Name,
                Longitude = mapLocationRequest.Longitude,
                Lattitude = mapLocationRequest.Lattitude,
                Url = mapLocationRequest.Url,
            };

            bool locationExists = await _context.MapLocations
                                   .AnyAsync(mp => mp.Name== mapLocationRequest.Name);

            if (locationExists)
            {
                return BadRequest("Location already exists in the map");
            }



            await _context.MapLocations.AddAsync(newMapLocation);

            await _context.SaveChangesAsync();

            return Ok("Success");
        }

        [HttpGet("GetAllMapLocations")]

        public async Task<IActionResult> GetAllLocations()
        {
            
            var allLocations = await _context.MapLocations.ToListAsync();


            return Ok(allLocations);

        }

       

    }
}
