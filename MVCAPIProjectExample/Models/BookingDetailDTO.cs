//using tafriMVC.Controllers.tafriMVC.Controllers;


using tafriAPI.Models;

namespace tafrAPI.Models
{
    public class BookingDetailDTO
    {
        public int BookingDetailId { get; set; }
        public int BookingId { get; set; }
        public int TravellerId { get; set; }
        public TravellerDTO Traveller { get; set; }
    }

}
