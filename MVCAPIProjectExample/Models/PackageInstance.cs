using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace tafriAPI.Models
{
    public class PackageInstance
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public bool IsAvailable { get; set; }

        // Foreign keys and Navigation properties
        public int PackageId { get; set; }
        public Package Package { get; set; }

        public int? UserId { get; set; }
        public User User { get; set; }
    }
}
