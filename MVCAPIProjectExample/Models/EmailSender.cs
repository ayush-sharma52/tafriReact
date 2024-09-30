using System.Net.Mail;
using System.Net;
using System.Text;



namespace tafriAPI.Models
{
    public class EmailSender : IEmailSender
    {

        //public void SendEmail(string toEmail, string subject, string bookingId, string transactionId, decimal finalAmount, string destination, string travelerDetails)
        //{
        //    // Set up SMTP client
        //    SmtpClient client = new SmtpClient("smtp.gmail.com", 587);
        //    client.EnableSsl = true;
        //    client.UseDefaultCredentials = false;
        //    client.Credentials = new NetworkCredential("as0024364@gmail.com", "qcsqfpdygdbasian");

        //    // Create email message
        //    MailMessage mailMessage = new MailMessage();
        //    mailMessage.From = new MailAddress("as0024364@gmail.com");
        //    mailMessage.To.Add(toEmail);
        //    mailMessage.Subject = subject;
        //    mailMessage.IsBodyHtml = true;

        //    // Build email body
        //    StringBuilder mailBody = new StringBuilder();
        //    mailBody.AppendFormat("<h1>TAFRI TRAVELS</h1>");
        //    mailBody.AppendFormat("<br />");
        //    mailBody.AppendFormat("<p>Thank you for booking with us!</p>");
        //    mailBody.AppendFormat("<br />");
        //    mailBody.AppendFormat("<strong>Booking Details:</strong><br />");
        //    mailBody.AppendFormat("<p><strong>Booking ID:</strong> {0}</p>", bookingId);
        //    mailBody.AppendFormat("<p><strong>Transaction ID:</strong> {0}</p>", transactionId);
        //    mailBody.AppendFormat("<p><strong>Final Amount:</strong> {0:C}</p>", finalAmount);
        //    mailBody.AppendFormat("<p><strong>Destination:</strong> {0}</p>", destination);
        //    mailBody.AppendFormat("<p><strong>Traveler Details:</strong> {0}</p>", travelerDetails);
        //    mailBody.AppendFormat("<br />");
        //    mailBody.AppendFormat("<p>We hope you have a wonderful trip!</p>");

        //    mailMessage.Body = mailBody.ToString();

        //    // Send email
        //    client.Send(mailMessage);
        //}

        public void SendEmail(string toEmail, string subject, string bookingId, string transactionId, decimal finalAmount, string destination, string travelerDetails)
        {
            // Set up SMTP client
            SmtpClient client = new SmtpClient("smtp.gmail.com", 587);
            client.EnableSsl = true;
            client.UseDefaultCredentials = false;
            client.Credentials = new NetworkCredential("as0024364@gmail.com", "qcsqfpdygdbasian");

            // Create email message
            MailMessage mailMessage = new MailMessage();
            mailMessage.From = new MailAddress("as0024364@gmail.com");
            mailMessage.To.Add(toEmail);
            mailMessage.Subject = subject;
            mailMessage.IsBodyHtml = true;

            // Build email body with enhanced red and black layout
            StringBuilder mailBody = new StringBuilder();
            mailBody.AppendFormat("<html><body style='font-family: Arial, sans-serif; color: #333;'>");
            mailBody.AppendFormat("<table width='100%' cellpadding='0' cellspacing='0' border='0' style='background-color: #000; color: #fff;'>");
            mailBody.AppendFormat("<tr><td style='padding: 20px; text-align: center;'>");
            mailBody.AppendFormat("<h1 style='color: #FF0000;'>TAFRI TRAVELS</h1>");
            mailBody.AppendFormat("</td></tr>");
            mailBody.AppendFormat("</table>");
            mailBody.AppendFormat("<table width='100%' cellpadding='20' cellspacing='0' border='0' style='background-color: #fff;'>");
            mailBody.AppendFormat("<tr><td>");
            mailBody.AppendFormat("<p style='font-size: 16px;'>Thank you for booking with us!</p>");
            mailBody.AppendFormat("<hr style='border: 0; border-top: 2px solid #FF0000;' />");
            mailBody.AppendFormat("<h2 style='color: #FF0000;'>Booking Details:</h2>");
            mailBody.AppendFormat("<table width='100%' cellpadding='10' cellspacing='0' border='1' bordercolor='#000' style='border-collapse: collapse;'>");
            mailBody.AppendFormat("<tr style='background-color: #f8f8f8;'>");
            mailBody.AppendFormat("<td style='padding: 10px;'><strong>Booking ID:</strong></td>");
            mailBody.AppendFormat("<td style='padding: 10px;'>{0}</td>", bookingId);
            mailBody.AppendFormat("</tr>");
            mailBody.AppendFormat("<tr>");
            mailBody.AppendFormat("<td style='padding: 10px;'><strong>Transaction ID:</strong></td>");
            mailBody.AppendFormat("<td style='padding: 10px;'>{0}</td>", transactionId);
            mailBody.AppendFormat("</tr>");
            mailBody.AppendFormat("<tr style='background-color: #f8f8f8;'>");
            mailBody.AppendFormat("<td style='padding: 10px;'><strong>Final Amount:</strong></td>");
            mailBody.AppendFormat("<td style='padding: 10px;'>{0:C}</td>", finalAmount);
            mailBody.AppendFormat("</tr>");
            mailBody.AppendFormat("<tr>");
            mailBody.AppendFormat("<td style='padding: 10px;'><strong>Destination:</strong></td>");
            mailBody.AppendFormat("<td style='padding: 10px;'>{0}</td>", destination);
            mailBody.AppendFormat("</tr>");
            mailBody.AppendFormat("<tr style='background-color: #f8f8f8;'>");
            mailBody.AppendFormat("<td style='padding: 10px;'><strong>Traveler Details:</strong></td>");
            mailBody.AppendFormat("<td style='padding: 10px;'>{0}</td>", travelerDetails);
            mailBody.AppendFormat("</tr>");
            mailBody.AppendFormat("</table>");
            mailBody.AppendFormat("<hr style='border: 0; border-top: 2px solid #FF0000;' />");
            mailBody.AppendFormat("<p style='font-size: 16px;'>We hope you have a wonderful trip!</p>");
            mailBody.AppendFormat("</td></tr>");
            mailBody.AppendFormat("</table>");
            mailBody.AppendFormat("</body></html>");

            mailMessage.Body = mailBody.ToString();

            // Send email
            client.Send(mailMessage);
        }
    }
}
