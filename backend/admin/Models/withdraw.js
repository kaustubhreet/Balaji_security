const mongoose = require('mongoose');

const withdrawalSchema = new mongoose.Schema({
 memberId: {
    type: String,
    required: true,
 },
 amount: {
    type: Number,
    required: true,
 },
 tds: {
    type: Number,
    required: true,
 },
 status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
 },
 time: {
    type: String,
    default: new Date().toLocaleTimeString(),
 },
 date: {
    type: Date,
    default: Date.now,
 },
 paidDate: {
    type: String,
    default: '', // Set default to an empty string
 },
 paidTime: {
    type: String,
    default: '',
 },
 fundWallet: {
    type: Number,
    required: true,
 },
 user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
 },
});

// Pre-save hook to update paidTime when the status changes to 'approved'

const Withdrawal = mongoose.model('Withdrawal', withdrawalSchema);

module.exports = Withdrawal;