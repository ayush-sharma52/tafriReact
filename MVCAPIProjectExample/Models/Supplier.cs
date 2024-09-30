using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace tafriAPI.Models
{
    public class Supplier
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public bool IsAuthorized { get; set; }
        public string Contact { get; set; }
        public string Password { get; set; }

        // Navigation property for ORM relationship
        public ICollection<Package> Packages { get; set; }
    }
}
