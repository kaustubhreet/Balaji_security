const User = require("../models/user");
const { inputValidation } = require("../../validators/api/userValidator");
const { sendResponse } = require("../../config/helper");
const constant = require("../../config/constant");
const jwt = require('jsonwebtoken');
const {sendMail}=require("../../helper/mail");
const bcrypt = require('bcrypt');
const helper = require("../../config/helper");
const HoldingEquity = require("../../BankDetails/models/HoldingEquity");
const AddFund = require("../../admin/Models/addfund");
const Withdrawal = require("../../mobileApi/models/withdraw");
const Desposite = require("../../BankDetails/models/Deposite");

module.exports = {
  getAmountByEmail: async (req, res) => {
    try {
      const { email } = req.params;

      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }

      // Find the deposit by email
      const deposit = await Desposite.findOne({ email: email });
      if (!deposit) {
        return res.status(404).json({ success: false, message: "Deposit not found for this user" });
      }

      // Return the amount
      res.status(200).json({ success: true, amount: deposit.amount });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  holdingEquityCont: async (req, res) => {
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
      //console.log(holdingEquity);

      return sendResponse(constant.MESSAGE.HOLDINGEQUITY, res, constant.CODE.SUCCESS, { holdingEquity }, 1);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server Error" });
    }
  },

  userRegister: async (req, res) => {
    try {
      const requestValidation = await inputValidation(req.body, "userRegister");
      if (requestValidation) return sendResponse(requestValidation, res, constant.CODE.INPUT_VALIDATION, {}, 0);

      const isUserExist = await User.findOne({ mobile: req.body.mobile, email: req.body.email });
      if (isUserExist) return sendResponse(constant.MESSAGE.ALREADY_EXIST, res, constant.CODE.EMAILEXIST, {}, 0);

      const { name, email, password, mobile, adharNumber, panNumber, fatherName, motherName, nomineeName, accountHolderName, accountNumber, ifscCode, } = req.body;

      const { passportImage, adharCardBack, adharCardFront, panCard, bankPassbook } = req.files;

      // Extract original filenames
      // console.log(req.files);

      const passportImageName = passportImage[0].filename;
      const adharCardFrontName = adharCardFront[0].filename;
      const adharCardBackName = adharCardBack[0].filename;
      const panCardName = panCard[0].filename;
      const bankPassbookName = bankPassbook[0].filename;

      const newPassword = await helper.encryptPassword(password)
      const userObj = {
        name,
        email,
        password: newPassword,
        mobile,
        adharNumber,
        panNumber,
        fatherName,
        motherName,
        nomineeName,
        bankDetails: { accountHolderName, accountNumber, ifscCode },
        documents: { passportImage: passportImageName, adharCardFront: adharCardFrontName, adharCardBack: adharCardBackName, panCard: panCardName, bankPassbook: bankPassbookName },
      };

      const userSaved = new User(userObj);
      await userSaved.save();

      console.log(userSaved);

      return sendResponse(constant.MESSAGE.REGISTERED, res, constant.CODE.SUCCESS, { userSaved }, 1);
    } catch (error) {
      return sendResponse(error.message, res, constant.CODE.INTERNAL_SERVER_ERROR, {}, 0);
    }
  },

  userLogin: async (req, res) => {
    try {
      const requestValidation = await inputValidation(req.body, "userLogin");
      if (requestValidation) return sendResponse(requestValidation, res, constant.CODE.INPUT_VALIDATION, {}, 0);

      const user = await User.findOne({ email: req.body.email });
      if (!user) return sendResponse(constant.MESSAGE.INVALID_USER, res, constant.CODE.SUCCESS, {}, 0);

      const checkPassword = await helper.comparePassword(req.body.password, user.password);
      //console.log(checkPassword)
      if (!checkPassword) return sendResponse(constant.MESSAGE.INCORRECT_PASS, res, constant.CODE.AUTH, {}, 0);

      const { email, _id } = user
      const token = helper.createJwtToken({ email, _id })

      return sendResponse(constant.MESSAGE.LOGIN, res, constant.CODE.SUCCESS, { token: "Bearer " + token }, 1);
    } catch (error) {
      return sendResponse(error.message, res, constant.CODE.INTERNAL_SERVER_ERROR, {}, 0);
    }
  },

  changePassword: async (req, res) => {
    try {
      const requestValidation = await inputValidation(req.body, "changePassword");
      if (requestValidation) return sendResponse(requestValidation, res, constant.CODE.INPUT_VALIDATION, {}, 0);

      if (!req.user) return sendResponse(constant.MESSAGE.Unauthorized, res, constant.CODE.AUTH, {}, 0);
      // console.log(req.user)

      const { _id } = req.user
      const isUserExist = await User.findById({ _id: _id });
      if (!isUserExist) return sendResponse(constant.MESSAGE.EMAIL_NOT_REGISTERED, res, constant.CODE.SUCCESS, {}, 0);

      const checkPassword = await helper.comparePassword(req.body.currentPassword, isUserExist.password);
      if (!checkPassword) return sendResponse(constant.MESSAGE.CURR_INCORRECT_PASS, res, constant.CODE.AUTH, {}, 0);

      const hashPassword = await helper.encryptPassword(req.body.newPassword)

      const result = await User.findOneAndUpdate({ _id: _id }, { $set: { password: hashPassword } }, { new: true });

      return sendResponse(constant.MESSAGE.PASSWORD_UPDATE, res, constant.CODE.SUCCESS, { result }, 1);
    } catch (error) {
      return sendResponse(error.message, res, constant.CODE.INTERNAL_SERVER_ERROR, {}, 0);
    }

  },

  forgotPassword: async (req, res) => {
    try {

      const email = req.body.email ? req.body.email.toLowerCase() : {};
      console.log(email,9);
      const adminData = await User.findOne({ email: email });
       console.log(adminData,8);

      if (!adminData)
        return sendResponse(constant.MESSAGE.EMAIL_NOT_REGISTERED, res, constant.CODE.SUCCESS, {}, constant.CODE.NOT_EXIST)

      const token = jwt.sign({ email: adminData.email, _id: adminData._id },
        process.env.JWT_SECRET_KEY,
        {
          algorithm: "HS256",
          expiresIn: "300s",
        });


      const sendvar = await sendMail(res, {
        name: adminData.username,
        email,
        subject: "Password Reset Link",
        link: `${process.env.USER_RESET_PASSWORD_URL}/${token}`,

      });


      //console.log(sendvar.response);
      return sendResponse(constant.MESSAGE.EMAIL_SEND, res, constant.CODE.SUCCESS, {}, 1);
    } catch (error) {
      console.log(error)
      return sendResponse(error.message, res, constant.CODE.INTERNAL_SERVER_ERROR, {}, 0)
    }
  },

  resetPassword: async (req, res) => {
    try {
      // validation
      const error = await inputValidation(req.body, "resetPassword");
      if (error) return sendResponse(error, res, constant.CODE.INPUT_VALIDATION, {}, 0);

      const { token, confirmPassword } = req.body;

      // checks token is expired or not
      const tokenValidation = jwt.verify(
        token,
        process.env.JWT_SECRET_KEY,
        (error, valid) => {
          if (error) {
            return sendResponse(constant.MESSAGE.EXPIRE_LINK, res, constant.CODE.SUCCESS, {}, 0);
          } else {
            return valid;
          }
        }
      );

      if (tokenValidation) {
        // bcrypt admin's password
        const hashPassword = await bcrypt.hash(
          confirmPassword,
          +constant.SALT_VALUE.value
        );
        await User.findOneAndUpdate(
          { email: tokenValidation.email },
          { $set: { password: hashPassword } }
        );
        return sendResponse(constant.MESSAGE.PASSWORD_UPDATE, res, constant.CODE.SUCCESS, {}, 1)
      }
    } catch (error) {
      console.log(error)
      return sendResponse(error.message, res, constant.CODE.INTERNAL_SERVER_ERROR, {}, 0)

    }
  },


  profile: async (req, res) => {
    try {
      // console.log(req.user);
      if (!req.user) return sendResponse(constant.MESSAGE.Unauthorized, res, constant.CODE.AUTH, {}, 0);

      const { _id } = req.user;

      const userProfile = await User.findById({ _id: _id });
      if (!userProfile) return sendResponse(constant.MESSAGE.EMAIL_NOT_REGISTERED, res, constant.CODE.SUCCESS, {}, 0);

      return sendResponse(constant.MESSAGE.FETCH, res, constant.CODE.SUCCESS, { userProfile }, 1);

    } catch (error) {
      return sendResponse(error.message, res, constant.CODE.INTERNAL_SERVER_ERROR, {}, 0);

    }
  },

  getBankDetails: async (req, res) => {
    try {
      //console.log(req.user);
      if (!req.user) return sendResponse(constant.MESSAGE.Unauthorized, res, constant.CODE.AUTH, {}, 0);

      //const { _id } = req.user;

      const BankDetails = await AddFund.find();
      if (!BankDetails) return sendResponse(constant.MESSAGE.EMAIL_NOT_REGISTERED, res, constant.CODE.SUCCESS, {}, 0);

      return sendResponse(constant.MESSAGE.FETCH, res, constant.CODE.SUCCESS, { BankDetails }, 1);

    } catch (error) {
      return sendResponse(error.message, res, constant.CODE.INTERNAL_SERVER_ERROR, {}, 0);

    }
  },

  // Controller function to add a withdrawal request for a user
  addWithdrawalRequest: async (req, res) => {
    try {
      const userEmail = req.params.email; // Extracting email from URL
      const user = await User.findOne({ email: userEmail });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const withdrawalData = req.body;
      withdrawalData.email = userEmail;

      const withdrawal = new Withdrawal(withdrawalData);
      await withdrawal.save();
      res.status(201).json({ message: "Withdrawal request added successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  // Controller function to edit a withdrawal request for a user
  editWithdrawalRequest: async (req, res) => {
    try {
      const userEmail = req.params.email; // Extracting email from URL
      const withdrawalId = req.params.id;

      const updatedData = req.body;

      await Withdrawal.findOneAndUpdate({ _id: withdrawalId, email: userEmail }, updatedData);
      res.status(200).json({ message: "Withdrawal request updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  // Controller function to delete a withdrawal request for a user
  deleteWithdrawalRequest: async (req, res) => {
    try {
      const userEmail = req.params.email; // Extracting email from URL
      const withdrawalId = req.params.id;

      await Withdrawal.findOneAndDelete({ _id: withdrawalId, email: userEmail });
      res.status(200).json({ message: "Withdrawal request deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  // Controller function to get all withdrawal requests for a user
  getWithdrawalRequests: async (req, res) => {
    try {
      const userEmail = req.params.email; // Extracting email from URL

      const user = await User.findOne({ email: userEmail });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const withdrawalRequests = await Withdrawal.find({ email: userEmail });
      res.status(200).json(withdrawalRequests);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  updateWithdrawalRequestFromAdmin: async (req, res) => {
    try {
      const userEmail = req.params.email; // Extracting email from URL
      const withdrawalId = req.params.id;

      const { availableFunds, status } = req.body;

      const updatedData = {};

      if (availableFunds !== undefined) {
        updatedData.availableFunds = availableFunds;
      }

      if (status !== undefined) {
        updatedData.status = status;
      }

      await Withdrawal.findOneAndUpdate({ _id: withdrawalId, email: userEmail }, updatedData);
      res.status(200).json({ message: "Withdrawal request updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

};
