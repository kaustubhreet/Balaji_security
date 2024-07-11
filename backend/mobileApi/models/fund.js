const mongoose = require('mongoose');
const moment = require('moment');

const fundRequestSchema = new mongoose.Schema({
  memberId: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  transactionId: {
    type: String,
    required: true,
  },
  remark: {
    type: String,
    required: true,
  },
  slip: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  message: {
    type: String,
    default: "",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  time: {
    type: String,
    default: moment().format('HH:mm:ss'),
  },
}, { timestamps: true });

const FundRequest = mongoose.model('FundRequest', fundRequestSchema);

module.exports = FundRequest;