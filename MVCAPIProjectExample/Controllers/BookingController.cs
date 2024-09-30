using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using tafriAPI.Models;

namespace tafriAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly IEmailSender _emailSender;

        public BookingController(ApplicationDbContext context , IEmailSender emailSender)
        {
            _context = context;
            _emailSender = emailSender;
        }

        // POST: Booking/TravelerDetails
        [HttpPost("TravelerDetails")]
        public JsonResult TravelerDetails([FromBody] List<TravellerDTO> travellers)
        {
            if (travellers == null || !travellers.Any())
            {
                return Json(new { success = false, message = "No traveller details were submitted." });
            }

            foreach (var traveller in travellers)
            {
                if (!ModelState.IsValid)
                {
                    return Json(new { success = false, message = "One or more traveller details are invalid." });
                }
            }

            try
            {
                // Save each traveller to the database
                foreach (var traveller in travellers)
                {
                    Traveller tempTraveller = new Traveller
                    {
                        Name = traveller.Name,
                        Age = traveller.Age,
                        Gender = traveller.Gender
                    };

                    _context.Travellers.Add(tempTraveller);
                }

                // save in db 
                _context.SaveChanges();


               
                return Json(new { success = true, message = "Traveller details submitted successfully." });
            }
            catch (Exception ex)
            {
                
                return Json(new { success = false, message = "An error occurred while processing your request." });
            }
        }

        [HttpPost("CreateBooking")]
        public async Task<IActionResult> CreateBooking([FromBody] BookingDTO bookingDTO)
        {
            if (bookingDTO == null)
            {
                return BadRequest("Invalid booking details.");
            }

            // Begin transaction
            using (var transaction = await _context.Database.BeginTransactionAsync())
            {
                try
                {
                    // Create Booking
                    bookingDTO.BookingDate = DateTime.UtcNow;
                    var booking = new Booking
                    {
                        BookingDate = bookingDTO.BookingDate,
                        TotalAmount = bookingDTO.TotalAmount,
                        PackageId = bookingDTO.PackageId,
                        UserId = bookingDTO.UserId
                    };

                    _context.Bookings.Add(booking);
                    await _context.SaveChangesAsync();

                    var bookingId = booking.BookingId;


                    // Create Payment
                    var payment = new Payment
                    {
                        PaymentMethod = bookingDTO.Payment.PaymentMethod,
                        PaymentStatus = bookingDTO.Payment.PaymentStatus,
                        TransactionId = bookingDTO.Payment.TransactionId,
                        PaymentDate = bookingDTO.Payment.PaymentDate,
                        Amount = bookingDTO.Payment.Amount,
                        BookingId = bookingId
                    };

                    _context.Payments.Add(payment);
                    await _context.SaveChangesAsync();

                    // Create BookingDetails and Travellers
                    var travelerDetails = new StringBuilder();

                    foreach (var detailDTO in bookingDTO.BookingDetails)
                    {
                        var traveller = new Traveller
                        {
                            Name = detailDTO.Traveller.Name,
                            Age = detailDTO.Traveller.Age,
                            Gender = detailDTO.Traveller.Gender
                        };

                        _context.Travellers.Add(traveller);
                        await _context.SaveChangesAsync();

                        var bookingDetail = new BookingDetail
                        {
                            BookingId = bookingId,
                            TravellerId = traveller.TravellerId
                        };

                        _context.BookingDetails.Add(bookingDetail);
                        travelerDetails.AppendLine($"Name: {traveller.Name}, Age: {traveller.Age}, Gender: {traveller.Gender}");

                    }

                    await _context.SaveChangesAsync();

                    var package = await _context.Packages.FindAsync(bookingDTO.PackageId);
                    if (package != null)
                    {
                        package.Available -= bookingDTO.BookingDetails.Count;
                        _context.Packages.Update(package);
                        await _context.SaveChangesAsync();
                    }

                    // Commit transaction
                    await transaction.CommitAsync();

                    // yahan likha hai logic mail ka 
                    var emailRecipient = "ankursharma192001@gmail.com"; 
                    var subject = "Booking Confirmation - TAFRI TRAVELS";
                    var destination = package.Destination;
                    var transactionId = payment.TransactionId;
                    var finalAmount = payment.Amount;

                    // email Sender service ko use kiya hai 

                    _emailSender.SendEmail(emailRecipient, subject, bookingId.ToString(), transactionId, finalAmount, destination, travelerDetails.ToString());


                    return Ok("Booking created successfully.");
                }
                catch (Exception ex)
                {
                    // Rollback transaction
                    await transaction.RollbackAsync();
                    return StatusCode(500, $"Internal server error: {ex.Message}");
                }
            }
        }
        [HttpGet("GetBookingsByUserId/{userId}")]
        public async Task<IActionResult> GetBookingsByUserIdAsync(int userId)
        {
            var bookings = await _context.Bookings
                                 .Include(b => b.BookingDetails)
                                     .ThenInclude(bd => bd.Traveller)
                                 .Include(b => b.Payment)
                                 .Include(b => b.Package)
                                 .Where(b => b.UserId == userId)
                                 .OrderByDescending(b => b.BookingId) // Sort by BookingId in descending order
                                 .ToListAsync();

            return Ok(bookings);
            
        }

        [HttpGet("GetAllBookingsWithPackageDetails")]

        public async Task<IActionResult> GetAllBookingsWithPackageDetails()
        {
            var bookings = await _context.Bookings
                             .Include(b => b.Package).ToListAsync();
            return Ok(bookings);
        }

        [HttpGet("GetAllBookingsWithDetailsForAdmin")]

        public async Task<IActionResult> GetAllBookingsWithDetailsForAdmin()
        {
            //var bookings = await _context.Bookings
            //                 .Include(b => b.Package).
            //                 Include(b => b.User).
            //                 Include(b => b.Payment).
            //                 Include(b => b.BookingDetails).
            //                 ToListAsync();

            var bookings = await _context.Bookings
                             .Include(b => b.Package).
                              Include(b => b.User).
                              Include(b => b.Payment).
                              Include(b=>b.BookingDetails).
                             ToListAsync();

            return Ok(bookings);
        }
    }
}
