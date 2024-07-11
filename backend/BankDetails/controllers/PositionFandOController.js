const express = require('express');
const router = express.Router();
const User = require('../../mobileApi/models/user');
const PositionFandO = require('../models/positionFandO');
const { sendResponse } = require("../../config/helper");
const constant = require('../../config/constant');

// Create a HoldingFandO record and associate it with a user
module.exports = {
    positionFandOCont:async (req, res) => {
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
            let positionFandOData = {
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
      
            const positionFandO = new PositionFandO(positionFandOData);
            await positionFandO.save();
          //  console.log(positionFandO,47);
      
            return sendResponse(constant.MESSAGE.POSITIONFandO, res, constant.CODE.SUCCESS, { positionFandO }, 1);
          } catch (err) {
            console.error(err);
            return sendResponse(err.message, res, constant.CODE.INTERNAL_SERVER_ERROR, {}, 0);
          }
        },


// Get all HoldingFandO records associated with a user
getpositionFandO :async (req, res) => {
    try {
        const { email } = req.params;
        const positionFandO = await PositionFandO.find({ email });
        res.status(200).json(positionFandO);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
},

// Update a HoldingFandO record associated with a user
 updatePositionFandO:async (req, res) => {
    try {
        const { id } = req.params;
        const positionFandO = await PositionFandO.findByIdAndUpdate(id, req.body, { new: true });
        if (!positionFandO) {
            return res.status(404).json({ message: "positionFandO not found" });
        }
        res.status(200).json(positionFandO);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
},

// Delete a HoldingFandO record associated with a user
 deletePositionFandO:async (req, res) => {
    try {
        const { id } = req.params;
        const positionFandO = await PositionFandO.findByIdAndDelete(id);
        if (!positionFandO) {
            return res.status(404).json({ message: "PositionFandO not found" });
        }
        res.status(200).json({ message: "PositionFandO deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
}
};


