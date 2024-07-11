const express = require('express');
const router = express.Router();
const User = require('../../mobileApi/models/user');
const HoldingFandO = require('../models/HoldingFandO');
const { sendResponse } = require("../../config/helper");
const constant = require('../../config/constant');

// Create a HoldingFandO record and associate it with a user
module.exports = {
    holdingFandOCont:async (req, res) => {
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
            let holdingFandOData = {
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
      
            const holdingFandO = new HoldingFandO(holdingFandOData);
            await holdingFandO.save();
           // console.log(holdingFandO,47);
      
            return sendResponse(constant.MESSAGE.HOLDINGFandO, res, constant.CODE.SUCCESS, { holdingFandO }, 1);
          } catch (err) {
            console.error(err);
            return sendResponse(err.message, res, constant.CODE.INTERNAL_SERVER_ERROR, {}, 0);
          }
        },


// Get all HoldingFandO records associated with a user
getholdingFandO :async (req, res) => {
    try {
        const { email } = req.params;
        const holdingFandO = await HoldingFandO.find({ email });
        res.status(200).json(holdingFandO);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
},

// Update a HoldingFandO record associated with a user
 updateHoldingFandO:async (req, res) => {
    try {
        const { id } = req.params;
        const holdingFandO = await HoldingFandO.findByIdAndUpdate(id, req.body, { new: true });
        if (!holdingFandO) {
            return res.status(404).json({ message: "HoldingFandO not found" });
        }
        res.status(200).json(holdingFandO);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
},

// Delete a HoldingFandO record associated with a user
 deleteHoldingFandO:async (req, res) => {
    try {
        const { id } = req.params;
        const holdingFandO = await HoldingFandO.findByIdAndDelete(id);
        if (!holdingFandO) {
            return res.status(404).json({ message: "HoldingFandO not found" });
        }
        res.status(200).json({ message: "HoldingFandO deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
}
};


