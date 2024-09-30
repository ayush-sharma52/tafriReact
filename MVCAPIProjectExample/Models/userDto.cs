namespace tafriAPI.Models
{
    public class UserDto
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

        public string Role { get; set; }
        public bool IsAuthorized { get; set; }

        public string? CompanyName { get; set; }
        public string? Address { get; set; }
        public string? ContactPerson { get; set; }
        public string? PhoneNumber { get; set; }
        public string? accountNumber { get; set; }
    }
}
