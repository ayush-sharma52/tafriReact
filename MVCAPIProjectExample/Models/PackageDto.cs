namespace tafriAPI.Models
{
    // DTOs/PackageDTO.cs
    public class PackageDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Destination { get; set; }
        public string Details { get; set; }
        public int Count { get; set; }
        public int OnHold { get; set; }
        public int Available { get; set; }
        public decimal Price { get; set; }
        public decimal finalprice { get; set; } //field to be used by admin

        //whether some counts are being holded by supplier or not(will get set automatically)
        public bool Hold { get; set; }

        public bool Visible { get; set; } //field to be used by admin
        public bool Released { get; set; }

        public int UserId { get; set; }
        public int? AssignedUserId { get; set; } //field to be used by admin
        public int? WishlistedUserId { get; set; } //may be need later on


    }
}
