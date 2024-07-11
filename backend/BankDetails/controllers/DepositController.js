// controllers/depositController.js
const Deposit = require('../models/Deposite');

// Controller to create a new deposit
exports.createDeposit = async (req, res) => {
  try {
    const { depositId, amount, processedBy, transactionId } = req.body;

    // Check if processedBy is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(processedBy)) {
      return res.status(400).json({ error: 'Invalid processedBy ID' });
    }

    const deposit = new Deposit({
      depositId,
      amount,
      processedBy,
      transactionId,
    });

    await deposit.save();

    res.status(201).json({ message: 'Deposit created successfully' });
  } catch (error) {
    console.error('Error creating deposit:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller to get all deposits
exports.getAllDeposits = async (req, res) => {
  try {
    const deposits = await Deposit.find().populate('processedBy', 'username'); // Populate user details
    res.status(200).json({ success: true, data: deposits });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
