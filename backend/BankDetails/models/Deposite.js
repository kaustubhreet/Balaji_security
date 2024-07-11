const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const depositSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  processedBy: {
    type: String,
    required: true,
  },
  transactionId: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['pending', 'rejected', 'success'],
    default: 'pending',
  },
});

const Deposit = mongoose.model('Deposit', depositSchema);

module.exports = Deposit;