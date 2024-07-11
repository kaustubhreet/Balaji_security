const User = require('../../mobileApi/models/user');
const HoldingCommodity = require('../models/HoldingCommodity');
const { sendResponse } = require("../../config/helper");
const constant = require('../../config/constant');

// Create a HoldingCommodity record and associate it with a user
module.exports = {
    holdingCommodityCont:async (req, res) => {
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
            let holdingCommodityData = {
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
      
            const holdingCommodity = new HoldingCommodity(holdingCommodityData);
            await holdingCommodity.save();
            console.log(holdingCommodity,47);
      
            return sendResponse(constant.MESSAGE.HOLDINGCommodity, res, constant.CODE.SUCCESS, { holdingCommodity }, 1);
          } catch (err) {
            console.error(err);
            return sendResponse(err.message, res, constant.CODE.INTERNAL_SERVER_ERROR, {}, 0);
          }
        },


// Get all HoldingCommodity records associated with a user
getholdingCommodity :async (req, res) => {
    try {
        const { email } = req.params;
        const holdingCommodity = await HoldingCommodity.find({ email });
        res.status(200).json(holdingCommodity);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
},

// Update a HoldingCommodity record associated with a user
 updateHoldingCommodity:async (req, res) => {
    try {
        const { id } = req.params;
        const holdingCommodity = await HoldingCommodity.findByIdAndUpdate(id, req.body, { new: true });
        if (!holdingCommodity) {
            return res.status(404).json({ message: "HoldingCommodity not found" });
        }
        res.status(200).json(holdingCommodity);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
},

// Delete a HoldingCommodity record associated with a user
 deleteHoldingCommodity:async (req, res) => {
    try {
        const { id } = req.params;
        const holdingCommodity = await HoldingCommodity.findByIdAndDelete(id);
        if (!holdingCommodity) {
            return res.status(404).json({ message: "HoldingCommodity not found" });
        }
        res.status(200).json({ message: "HoldingCommodity deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
}
};


