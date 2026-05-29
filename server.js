import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Nodemailer (Gmail SMTP - works on Railway)
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "dtoherocycles@gmail.com", // ✅ your Gmail
    pass: "vvitbmqajjdkqidd",       // ✅ app password (NO spaces)
  },
});

app.post("/send-otp", async (req, res) => {
  const { email, otp } = req.body;

  console.log("📩 Sending OTP to:", email);

  try {
    // ✅ Email send with timeout protection
    const sendPromise = transporter.sendMail({
      from: `"Hero Cycles OTP" <dtoherocycles@gmail.com>`,
      to: email,
      subject: "Your OTP Code",
      html: `<h2>Your OTP is: ${otp}</h2>`,
    });

    await Promise.race([
      sendPromise,
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Timeout ❌")), 12000)
      ),
    ]);

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
