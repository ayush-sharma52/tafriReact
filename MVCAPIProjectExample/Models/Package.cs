using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using tafriAPI.Models;
using System.Text.Json.Serialization;


namespace tafriAPI.Models

{

    public class Package

    {

        [Key]

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]

        public int Id { get; set; }

        public string Name { get; set; }

        public string Destination { get; set; }

        public string Details { get; set; }

        //total count given by supplier

        public int Count { get; set; }

        //count holded by supplier

        public int OnHold { get; set; }

        //whether some counts are being holded by supplier or not(will get set automatically)

        public bool Hold { get; set; }

        //add comment here to tell its need (by ankur)

        public int Available { get; set; }

        //price given by supplier 

        public decimal Price { get; set; }

        //final price (price given by admin)

        public decimal FinalPrice { get; set; }

        //whether admin wants to make the package visible or not

        public bool Visible { get; set; }

        //whether package is released currently or withdrawn(by supplier) { true by default}

        //modifications in the package can only take place when it is unreleased

        //Released packages can only be withdrawn

        public bool Released { get; set; }

        // Foreign key and Navigation property for PackagesAssigned(admin assigning to particular user)

        public int? AssignedUserId { get; set; }

        public User AssignedUser { get; set; }

        // Foreign key and Navigation property for PackagesWishlisted(wishlisted by users {not needed to set})

        public int? WishlistedUserId { get; set; }

        public User WishlistedUser { get; set; }

        // Foreign key and Navigation property for PackagesPublished

        //(which supplier published it(gets set through session})

        public int UserId { get; set; }

        public User PublishedByUser { get; set; }


        [JsonIgnore]
        public ICollection<Booking> Bookings { get; set; } = new List<Booking>();
    }

}

