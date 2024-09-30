using tafriMVC.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using tafriAPI.Models;
using System.Globalization;

namespace tafriAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SaleController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public SaleController(ApplicationDbContext context)
        {
            _context = context;
        }
        [HttpPost("saveSaleRequest")]
        public async Task<IActionResult> saveSaleRequest([FromBody] Sale saleRequest)
        {   

            Sale sale = new Sale
            {
                SaleDate = saleRequest.SaleDate,
                SaleType = saleRequest.SaleType,
                Description = saleRequest.Description,
                Discount = saleRequest.Discount,
            };

            bool saleExists = await _context.Sales
                                   .AnyAsync(s => s.SaleDate == saleRequest.SaleDate);

            if (saleExists)
            {
                return BadRequest("A sale already exists on this date. Please choose a different date.");
            }

            await _context.Sales.AddAsync(sale);

            await _context.SaveChangesAsync();

            return Ok("Sale Added Successfully");
        }

        [HttpGet("checkSaleByDate")]
        public async Task<IActionResult> CheckSaleByDate(string date)
        {
            // Check if a sale already exists on the provided date

            if (!DateTime.TryParseExact(date, "yyyy-MM-dd", CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime parsedDate))
            {
                return BadRequest("Invalid date format. Please provide a date in yyyy-MM-dd format.");
            }

            var existingSale = await _context.Sales
                .FirstOrDefaultAsync(s => s.SaleDate == date);

            if (existingSale == null)
            {
                // Return a conflict status if a sale exists
                return BadRequest("No sale exist for today");
            }

            // Return OK if no sale exists
            return Ok(existingSale);
        }
    }

}
