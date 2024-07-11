const express = require('express');
const router = express.Router();
const User = require('../../mobileApi/models/user');
const PositionCommodity = require('../models/positionCommodity');
const { sendResponse } = require("../../config/helper");
const constant = require('../../config/constant');

// Create a HoldingCommodity record and associate it with a user
module.exports = {
    positionCommodityCont:async (req, res) => {
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
            let positionCommodityData = {
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
      
            const positionCommodity = new PositionCommodity(positionCommodityData);
            await positionCommodity.save();
           // console.log(positionCommodity,47);
      
            return sendResponse(constant.MESSAGE.POSITIONCommodity, res, constant.CODE.SUCCESS, { positionCommodity }, 1);
          } catch (err) {
            console.error(err);
            return sendResponse(err.message, res, constant.CODE.INTERNAL_SERVER_ERROR, {}, 0);
          }
        },


// Get all HoldingCommodity records associated with a user
getpositionCommodity :async (req, res) => {
    try {
        const { email } = req.params;
        const positionCommodity = await PositionCommodity.find({ email });
        res.status(200).json(positionCommodity);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
},

// Update a HoldingCommodity record associated with a user
 updatePositionCommodity:async (req, res) => {
    try {
        const { id } = req.params;
        const positionCommodity = await PositionCommodity.findByIdAndUpdate(id, req.body, { new: true });
        if (!positionCommodity) {
            return res.status(404).json({ message: "positionCommodity not found" });
        }
        res.status(200).json(positionCommodity);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
},

// Delete a HoldingCommodity record associated with a user
 deletePositionCommodity:async (req, res) => {
    try {
        const { id } = req.params;
        const positionCommodity = await PositionCommodity.findByIdAndDelete(id);
        if (!positionCommodity) {
            return res.status(404).json({ message: "PositionCommodity not found" });
        }
        res.status(200).json({ message: "PositionCommodity deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
}
};


