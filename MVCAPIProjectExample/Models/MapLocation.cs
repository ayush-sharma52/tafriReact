using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace tafriAPI.Models
{
    public class MapLocation
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int MapId { get; set; }
        public string Name { get; set; }
        public double Lattitude { get; set; }
        public double Longitude { get; set; }
        public string Url { get; set; }
    }
}
