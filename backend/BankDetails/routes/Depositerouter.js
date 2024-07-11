// routes/depositRoutes.js
const express = require('express');
const router = express.Router();
const depositController = require('../controllers/DepositController');

// Create a new deposit
router.post('/deposits', depositController.createDeposit);

// Get all deposits
router.get('/deposits', depositController.getAllDeposits);

module.exports = router;
