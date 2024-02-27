const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // Set to true if using SSL/TLS
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

const sendWelcomeEmail = async (userEmail, username) => {
  try {
    await transporter.sendMail({
      from: '"UhuyyEstate" <ridloghfry@gmail.com>',
      to: userEmail,
      subject: "Welcome to Our Website!",
      text: `Hello ${username},\n\nWelcome to UhuyyEstate! We're thrilled to have you join our community. Get ready to embark on an exciting journey filled with amazing properties, great deals, and wonderful experiences. If you ever need assistance or have any questions, feel free to reach out to us. Happy exploring!\n\nBest regards,\nThe UhuyyEstate Team`,
      html: `<h2>Hello ${username},</h2><p>Welcome to UhuyyEstate! We're thrilled to have you join our community. Get ready to embark on an exciting journey filled with amazing properties, great deals, and wonderful experiences. If you ever need assistance or have any questions, feel free to reach out to us. Happy exploring!</p><p>Best regards,<br/>The UhuyyEstate Team</p>`,
    });
  } catch (error) {
    console.error("Error sending welcome email:", error);
    throw new Error("Error sending welcome email");
  }
};

module.exports = { sendWelcomeEmail };
