using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace tafriAPI.Models
{
    public class Booking
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int BookingId { get; set; }
        public DateTime BookingDate { get; set; }
        public decimal TotalAmount { get; set; }

        // Navigation properties
        public ICollection<BookingDetail> BookingDetails { get; set; } = new List<BookingDetail>();
        public Payment Payment { get; set; }

        // Foreign key for Package
        public int PackageId { get; set; }
        // Navigation property for Package
        public Package Package { get; set; }

        // Foreign key for User
        public int UserId { get; set; }

        // Navigation property for User
        public User User { get; set; }
    }
}
