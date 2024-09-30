using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace tafriAPI.Models
{
    [Table("SpecialAssignedPackages")]
    public class SpecialAssignedPackage
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        public int PackageId { get; set; }
    }
}
