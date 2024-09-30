using System.Text.Json.Serialization;

namespace tafriAPI.Models
{
    public class Review
    {
        public int Id { get; set; }
        public int Rating { get; set; }
        public string Description { get; set; }

        public bool IsAnonymous { get; set; } // If true, hide user details
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;


        public int UserId { get; set; } // Foreign key for User
        public int PackageId { get; set; } // Foreign key for Package


        // Navigation properties
        public User UserDetail { get; set; }
        public Package PackageDetail { get; set; }
    }

}

