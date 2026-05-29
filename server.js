import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Gmail SMTP (FIXED version for Railway)
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // ✅ IMPORTANT
  auth: {
    user: "dtoherocycles@gmail.com",       // ✅ your Gmail
    pass: "vvitbmqajjdkqidd",              // ✅ app password (NO spaces)
  },
});

// ✅ OTP API
app.post("/send-otp", async (req, res) => {
  const { email, otp } = req.body;

  console.log("📩 Sending OTP to:", email);

  try {
    await transporter.sendMail({
      from: `"Hero Cycles OTP" <dtoherocycles@gmail.com>`,
      to: email,
      subject: "Your OTP Code",
      html: `<h2>Your OTP is: ${otp}</h2>`,
    });

    console.log("✅ Email sent successfully");

    res.status(200).json({ success: true });

  } catch (error) {
    console.error("❌ Email error:", error);

    res.status(500).json({ success: false });
  }
});

// ✅ Required for Railway
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
