const express = require('express');
const User = require('../../mobileApi/models/user');
const HoldingEquity = require('../models/HoldingEquity');
const { sendResponse } = require("../../config/helper");
const constant = require('../../config/constant');

// Create a HoldingEquity record and associate it with a user
module.exports = {
    holdingEquityCont:async (req, res) => {
        try {
            const { email } = req.params;
           // console.log(email);
      
            const user = await User.findOne({ email });
            if (!user) {
              return res.status(404).json({ message: "User not found" });
            }
      
            const { useremail } = req.params;
            //console.log(email, "38");
      
            const userdetails = await User.findOne({ useremail });
           // console.log(userdetails.email, "12");
      
            if (!userdetails) {
              return res.status(404).json({ message: "User not found" });
            }
            let holdingEquityData = {
              scriptname,
              exchange,
              sellbuy,
              price1,
              quantity,
              tradeValue,
              buysell,
              price2,
              sellvalue,
              ltp,
              plAmount,
              time,
              date,
              email: userdetails.email,
            } = req.body;
      
            const holdingEquity = new HoldingEquity(holdingEquityData);
            await holdingEquity.save();
            //console.log(holdingEquity,47);
      
            return sendResponse(constant.MESSAGE.HOLDINGEQUITY, res, constant.CODE.SUCCESS, { holdingEquity }, 1);
          } catch (err) {
            console.error(err);
            return sendResponse(err.message, res, constant.CODE.INTERNAL_SERVER_ERROR, {}, 0);
          }
        },


// Get all HoldingEquity records associated with a user
getholdingEquity :async (req, res) => {
    try {
        const { email } = req.params;
        const holdingEquity = await HoldingEquity.find({ email });
        res.status(200).json(holdingEquity);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
},

// Update a HoldingEquity record associated with a user
 updateHoldingEquity:async (req, res) => {
    try {
        const { id } = req.params;
        const holdingEquity = await HoldingEquity.findByIdAndUpdate(id, req.body, { new: true });
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
 deleteHoldingEquity:async (req, res) => {
    try {
        const { id } = req.params;
        const holdingEquity = await HoldingEquity.findByIdAndDelete(id);
        if (!holdingEquity) {
            return res.status(404).json({ message: "HoldingEquity not found" });
        }
        res.status(200).json({ message: "HoldingEquity deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
}
};


