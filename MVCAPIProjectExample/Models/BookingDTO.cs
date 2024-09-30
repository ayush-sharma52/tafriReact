using tafrAPI.Models;

namespace tafriAPI.Models
{
    public class BookingDTO
    {
        public int BookingId { get; set; }
        public DateTime BookingDate { get; set; }
        public decimal TotalAmount { get; set; }
        public int PackageId { get; set; }
        public int UserId { get; set; }
        public List<BookingDetailDTO> BookingDetails { get; set; }
        public PaymentDTO Payment { get; set; }
    }

}
