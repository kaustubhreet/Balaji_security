const express = require('express');
const Deposite = require('../models/Deposite');
const { sendResponse } = require("../../config/helper");
const constant = require('../../config/constant');
const User = require('../../mobileApi/models/user');

module.exports = {
// Get all deposite records associated with a user
getdeposite :async (req, res) => {
    try {
        const { email } = req.params;
        const deposite = await Deposite.find({ email });
        //res.status(200).json(holdingEquity);
        return sendResponse(constant.MESSAGE.DEPOSITE, res, constant.CODE.SUCCESS, { deposite }, 1);
         
    } catch (err) {
        console.error(err);
        return sendResponse(err.message, res, constant.CODE.INTERNAL_SERVER_ERROR, {}, 0);
    }
},

createdeposite:async (req, res) => {
    try {
        const { email } = req.params;
        //console.log(email);
    
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        //console.log(user, 31);
    
        // Find the deposit details for the found user
        const userdetails = await Deposite.findOne({ email });
        //console.log(userdetails, "12");

    
        // Destructure request body and set default values
        const {
          amount,
          processedBy,
          transactionId,
          date,
          status,
        } = req.body;
    
        // Create a new Deposite instance
        const holdingEquity = new Deposite({
          amount,
          processedBy,
          transactionId,
          date,
          status,
          email: user.email,
        });
    
        // Save the new Deposite instance
        await holdingEquity.save();
        console.log(holdingEquity, 47);
    
        return sendResponse(constant.MESSAGE.HOLDINGEQUITY, res, constant.CODE.SUCCESS, { holdingEquity }, 1);
      } catch (err) {
        console.error(err);
        return sendResponse(err.message, res, constant.CODE.INTERNAL_SERVER_ERROR, {}, 0);
      }
    },

// Update a HoldingEquity record associated with a user
updatedeposite:async (req, res) => {
try {
    const { id } = req.params;
    const holdingEquity = await Deposite.findByIdAndUpdate(id, req.body, { new: true });
    if (!holdingEquity) {
        return res.status(404).json({ message: "HoldingEquity not found" });
    }
    res.status(200).json(holdingEquity);
} catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
}
},

// Delete a HoldingEquity record associated with a user
deletedeposite:async (req, res) => {
try {
    const { id } = req.params;
    const holdingEquity = await Deposite.findByIdAndDelete(id);
    if (!holdingEquity) {
        return res.status(404).json({ message: "Deposite not found" });
    }
    res.status(200).json({ message: "Deposite deleted successfully" });
} catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
}
}
};