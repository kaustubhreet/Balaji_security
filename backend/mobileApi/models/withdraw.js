const mongoose = require('mongoose');

const withdrawalSchema = new mongoose.Schema({
 email: {
    type: String,
    required: true,
 },
 availabefund:{
   type: Number,
    required: true,
 },
 requestamount: {
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
 }
});

// Pre-save hook to update paidTime when the status changes to 'approved'

const Withdrawal = mongoose.model('Withdrawal', withdrawalSchema);

module.exports = Withdrawal;