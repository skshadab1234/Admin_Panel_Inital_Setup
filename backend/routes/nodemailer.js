const nodemailer = require("nodemailer");

// Create a function to send emails
const sendEmail = async (
  toEmail,
  subject,
  htmlContent,
  attachment,
  attachmentFilename
) => {
  try {
    // Create a transport object using Office365 SMTP settings
    // const transporter = nodemailer.createTransport({
    //   host: "smtp.office365.com",
    //   port: 587,
    //   secure: false, // Use TLS
    //   auth: {
    //     user: "client.services.team@outlook.com",
    //     pass: "socfujkvbkujhkit", // Replace with your actual password
    //   },
    //   tls: {
    //     rejectUnauthorized: false, // Only use this for local testing
    //   },
    // });

    // For Localhost
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "ks615044@gmail.com", // Update with your Gmail email
        pass: "yoqizxrgswkuybcl", // Update with your Gmail password or an app-specific password
      },
    });

    let message = {
      // from: "Sagartech <client.services.team@outlook.com>",
      from: "Sagartech <ks615044@gmail.com>",
      to: toEmail,
      subject: subject,
      html: htmlContent,
      attachments:
        attachment && attachmentFilename
          ? [
              {
                filename: attachmentFilename, // Use the filename passed as a parameter
                content: attachment, // The content of the file (in your case, it can be the PDF content)
                encoding: "base64", // If the content is base64-encoded
              },
            ]
          : undefined,
    };

    await transporter.verify(); // Verify the connection configuration
    await transporter.sendMail(message); // Send the email

    console.log("Email sent successfully");
    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, message: error.message };
  }
};

module.exports = sendEmail;
