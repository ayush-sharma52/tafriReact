namespace tafriAPI.Models
{
    public interface IEmailSender
    {
        void SendEmail(string toEmail, string subject, string bookingId, string transactionId, decimal finalAmount, string destination, string travelerDetails);
    }
}

