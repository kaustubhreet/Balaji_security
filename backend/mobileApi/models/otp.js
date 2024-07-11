const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  mobileNo: {
    type: String,
    required: true,
  },
  memberId: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  
});

// Create an index on the mobileNumber field for quicker lookups
otpSchema.index({ memberId: 1 }, { unique: true });

const OTP = mongoose.model('OTP', otpSchema);

module.exports = OTP;