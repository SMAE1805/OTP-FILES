import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Nodemailer setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "dtoherocycles@gmail.com",   // ✅ Your Gmail
    pass: "vvitbmqajjdkqidd",      // ✅ App password (NO spaces)
  },
});

app.post("/send-otp", async (req, res) => {
  const { email, otp } = req.body;

  console.log("Received request:", email, otp);

  try {
    await transporter.sendMail({
      from: `"Hero Cycles OTP" <dtoherocycles@gmail.com>`,
      to: email,
      subject: "Your OTP Code",
      html: `<h2>Your OTP is: ${otp}</h2>`,
    });

    console.log("✅ Email sent");

    res.json({ success: true });

  } catch (error) {
    console.error("❌ Error sending email:", error);
    res.json({ success: false });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
