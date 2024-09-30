using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace tafriAPI.Models
{
    public class BookingDetail
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int BookingDetailId { get; set; }

        public int BookingId { get; set; }
        [JsonIgnore]
        public Booking Booking { get; set; }

        public int TravellerId { get; set; }
        public Traveller Traveller { get; set; }


    }
}
