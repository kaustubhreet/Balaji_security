const express = require('express');
const router = express.Router();
const User = require('../../mobileApi/models/user');
const PositionEquity = require('../models/positionEquity');
const { sendResponse } = require("../../config/helper");
const constant = require('../../config/constant');

// Create a HoldingEquity record and associate it with a user
module.exports = {
    positionEquityCont: async (req, res) => {
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
            let positionEquityData = {
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

            const positionEquity = new PositionEquity(positionEquityData);
            await positionEquity.save();
            //console.log(positionEquity, 47);

            return sendResponse(constant.MESSAGE.POSITIONEQUITY, res, constant.CODE.SUCCESS, { positionEquity }, 1);
        } catch (err) {
            console.error(err);
            return sendResponse(err.message, res, constant.CODE.INTERNAL_SERVER_ERROR, {}, 0);
        }
    },


    // Get all HoldingEquity records associated with a user
    getpositionEquity: async (req, res) => {
        try {
            const { email } = req.params;
            const positionEquity = await PositionEquity.find({ email });
            res.status(200).json(positionEquity);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Server Error" });
        }
    },

    // Update a HoldingEquity record associated with a user
    updatePositionEquity: async (req, res) => {
        try {
            const { id } = req.params;
            const positionEquity = await PositionEquity.findByIdAndUpdate(id, req.body, { new: true });
            if (!positionEquity) {
                return res.status(404).json({ message: "positionEquity not found" });
            }
            res.status(200).json(positionEquity);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Server Error" });
        }
    },

    // Delete a HoldingEquity record associated with a user
    deletePositionEquity: async (req, res) => {
        try {
            const { id } = req.params;
            const positionEquity = await PositionEquity.findByIdAndDelete(id);
            if (!positionEquity) {
                return res.status(404).json({ message: "PositionEquity not found" });
            }
            res.status(200).json({ message: "PositionEquity deleted successfully" });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Server Error" });
        }
    }
};


