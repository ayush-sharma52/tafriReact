using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace tafriAPI.Models
{
    public class Traveller
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int TravellerId { get; set; }
        public string Name { get; set; }
        public int Age { get; set; }
        public string Gender { get; set; }

        // One-to-one relationship with BookingDetail
        [JsonIgnore]
        public BookingDetail? BookingDetail { get; set; }
    }
}
