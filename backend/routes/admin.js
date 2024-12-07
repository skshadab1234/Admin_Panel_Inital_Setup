const express = require("express");
const app = express();
const pool = require("../config");
const cors = require("cors");
const bcrypt = require("bcrypt");
const authenticate = require("../lib");
const jwt = require("jsonwebtoken"); // Import jsonwebtoken
const fs = require("fs");
const sendEmail = require("./nodemailer");

app.use(express.json());

app.use(cors());

app.use((req, res, next) => {
  req.pool = pool;
  next();
});

const oneDayInSeconds = 24 * 60 * 60; // One day in seconds

app.post("/bappaLogin", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Email ko lower case mein convert karein
    const lowerCaseEmail = email.toLowerCase();

    // Query ko execute karte waqt lower case email ka istemal karein
    const result = await req.pool.query(
      "SELECT * FROM admin_registration WHERE email ILIKE $1",
      [lowerCaseEmail]
    );

    if (result.rows.length > 0) {
      const bappaLogin = result.rows[0];
      const hashedPassword = bappaLogin.password; // Assuming the hashed password is stored in the 'password' field

      // Compare the hashed password with the input password
      const passwordMatch = await bcrypt.compare(password, hashedPassword);
      if (passwordMatch) {
        const token = jwt.sign({ id: bappaLogin.id }, process.env.SECRET_KEY, {
          expiresIn: oneDayInSeconds, // Token expires in one day (in seconds)
        });
        // Set a cookie with the JWT
        const expiryDate = new Date(Date.now() + oneDayInSeconds * 1000); // Calculate the expiry date (one day from now)
        res.cookie("tokenbappaLogin", token, {
          httpOnly: true,
          secure: false, // Set secure to true if you're using HTTPS
          expires: expiryDate, // Set the expiry date
        });

        res.status(200).send({
          status: 200,
          message: "Login successful.",
          token,
          expiryTime: expiryDate, // Return the expiry time to the client
        });
      } else {
        // Passwords do not match
        res.status(200).json({ status: 400, message: "Invalid Password..." });
      }
    } else {
      res.status(200).json({ status: 400, message: "Email does not exist." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/getbappaLoginDetails", authenticate, async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(200).json({
        status: false,
        message: "Please login first",
      });
    }

    // Query to fetch vendor details
    const vendorDataQuery = await req.pool.query(
      "SELECT * FROM admin_registration WHERE id = $1",
      [req.userId]
    );

    if (vendorDataQuery.rows.length === 0) {
      return res.status(200).json({
        status: false,
        message: `User with ID ${req.userId} not found`,
      });
    }

    const vendorDetails = vendorDataQuery.rows[0];
    delete vendorDetails?.password;

    return res.status(200).json({
      status: true,
      data: vendorDetails,
      message:
        "Vendor data with associated stores and user role fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching vendor data:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/recoverpasswords", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // Find vendor by email
    const result = await pool.query(
      "SELECT * FROM admin_registration WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Email not found" });
    }

    // Generate a 4-digit code
    const code = Math.floor(1000 + Math.random() * 9000).toString();

    // Update vendor row with the generated code
    await pool.query(
      "UPDATE admin_registration SET reset_code = $1, reset_code_expiry = NOW() + INTERVAL '15 minutes' WHERE email = $2",
      [code, email]
    );

    // Read and replace placeholders in HTML template
    const htmlTemplate = fs.readFileSync("./html/password_reset.html", "utf8");
    const finalHtml = htmlTemplate
      .replace("{{name}}", result.rows[0].name)
      .replace("{{code}}", code);

    // Send the email
    await sendEmail(email, "OTP for Password Reset", finalHtml);

    // Respond with success
    res.status(200).json({ message: "Password reset code sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/verify_otp_vendor", async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Validate input
    if (!email || !otp) {
      return res.status(400).json({ error: "Email and OTP are required" });
    }

    // Query the database to find the vendor with the provided email
    const result = await pool.query(
      "SELECT reset_code, reset_code_expiry FROM admin_registration WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Email not found" });
    }

    const vendor = result.rows[0];

    // Check if the OTP has expired
    if (new Date() > new Date(vendor.reset_code_expiry)) {
      return res.status(400).json({ error: "OTP has expired" });
    }

    // Check if the provided OTP matches
    if (vendor.reset_code === otp) {
      // OTP is valid
      return res.status(200).json({ message: "OTP verified successfully" });
    } else {
      // OTP is invalid
      return res.status(400).json({ error: "Invalid OTP" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/update_password_vendor", async (req, res) => {
  try {
    const { newPassword, email } = req.body;

    if (!newPassword || !email) {
      return res
        .status(400)
        .json({ error: "Email and new password are required" });
    }

    // Generate a salt
    const salt = await bcrypt.genSalt(10);

    // Hash the new password with the salt
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update the password in the database
    const result = await pool.query(
      "UPDATE admin_registration  SET password = $1 WHERE email = $2 RETURNING email",
      [hashedPassword, email]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Vendor not found" });
    }

    // Generate the HTML content for the email
    const emailHTML = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #0056b3;">Password Updated Successfully</h2>
        <p>Hello,</p>
        <p>We wanted to let you know that your password has been successfully updated.</p>
        <p>If you did not request this change, please contact our support team immediately.</p>
        <p>Thank you,<br>Your Company Team</p>
      </div>
    `;

    // Send the email
    await sendEmail(email, "Password Updated Successfully", emailHTML);

    // Send a success response
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = app;
