using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace tafriAPI.Models
{
    public class Sale
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int SaleId { get; set; }
        public string SaleDate { get; set; }
        public string SaleType { get; set; }
        public string Description { get; set; }
        public double Discount { get; set; }

    }
}
