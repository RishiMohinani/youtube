const otpStore = {};

// Function to store OTP for a user
function storeOTP(email, otp) {
  otpStore[email] = otp;
}

// Function to retrieve OTP for a user
function getOTP(email) {
  return otpStore[email];
}

// Function to delete OTP after verification
function deleteOTP(email) {
  delete otpStore[email];
}

module.exports = { storeOTP, getOTP, deleteOTP };
