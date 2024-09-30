using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using tafriMVC.Models;

namespace tafriAPI.Models
{
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public string Name { get; set; }

        public string EmailId { get; set; }

        public string Password { get; set; }

        public string Role { get; set; }

        public bool IsAuthorized { get; set; }

        public DateTime CreatedAt { get; set; }

        // Optional fields
        public string? CompanyName { get; set; }

        public string? Address { get; set; }

        public string? ContactPerson { get; set; }

        public string? PhoneNumber { get; set; }

        public string? AccountNumber { get; set; }

        // Collections for one-to-many relationships

        [JsonIgnore]
        public ICollection<Booking> Bookings { get; set; } = new List<Booking>();

        [JsonIgnore]
        public ICollection<Package> PackagesPublished { get; set; } = new List<Package>();
        public ICollection<Package> PackagesAssigned { get; set; } = new List<Package>();
        public ICollection<Package> PackagesWishlisted { get; set; } = new List<Package>();
        public ICollection<PackageInstance> PackagesBooked { get; set; } = new List<PackageInstance>();

        public User()
        {
            CreatedAt = DateTime.UtcNow;
        }
    }
}
