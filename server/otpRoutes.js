const express = require('express');
const nodemailer = require('nodemailer');
const { storeOTP, getOTP, deleteOTP } = require('./otpStorage');
require('dotenv').config(); // Import dotenv to access environment variables
const router = express.Router();

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
}

router.post('/send-otp', async (req, res) => {
  const { email } = req.body;

  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).send('Invalid email address.');
  }

  const otp = generateOTP();
  storeOTP(email, otp);

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('OTP sent successfully!');
  } catch (error) {
    console.error('Failed to send OTP:', error);
    res.status(500).send('Failed to send OTP.');
  }
});

router.post('/verify-otp', (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).send('Email and OTP are required.');
  }

  const storedOTP = getOTP(email);
  if (storedOTP === otp) {
    deleteOTP(email);
    res.status(200).send('OTP verified successfully!');
  } else {
    res.status(400).send('Invalid OTP.');
  }
});

module.exports = router;
