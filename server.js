import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const API_KEY = "re_5WAXCfoD_DWPV8AcwXfRZ9o7bLdmRfz4E";

app.post("/send-otp", async (req, res) => {
  const { email, otp } = req.body;

  console.log("Received request:", req.body); // ✅ debug

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Your OTP Code",
        html: `<h2>Your OTP is: ${otp}</h2>`,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Resend error:", data);
      return res.json({ success: false });
    }

    console.log("✅ Email sent:", data);

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
