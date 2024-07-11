const Users = require("../models/user");
const OTP =require('../models/otp')

module.exports = {
  findUser: async (userData) => {
    return await Users.findOne({
      $or: [
        { _id: userData._id },
        { memberid: { $regex: `^${userData.memberid}$`, $options: "i" } },
        { mobile: userData.mobile },
      ],
    });
  },
  createUser: async (UserData) => {
    return await Users(UserData).save();
  },

  isVerifyOtp: async (otpData) => {
    return await OTP.findOne(otpData);
  },

  createOrUpdateOtp:async(otpData)=>{
    return await OTP.updateOne(
      { mobileNo: otpData.mobileNo, memberId: otpData.memberId },
      { $set: { otp:otpData.otp, expiresAt: otpData.expirationTime } }, // Update OTP and expiration time
      { upsert: true }
    );
  }
 
};