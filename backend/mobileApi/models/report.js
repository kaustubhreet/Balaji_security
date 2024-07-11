const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');


const reportSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    memberId:{
        type:String,
        required:true,
    },
    type: {
        type: String,
        required: true
    },
    sponser_id: {
        type: String,
        required: true
    },
    earnerId:{
        type:String,
        required:true
    },
    fullname: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    previous_amount: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    after_amount: {
        type: Number,
        required: true
    },
    fund_type: {
        type: String,
        enum:['Debit','Credit'],
        required: true
    },
    transactionId:{
        type:String,
        required:true
    },
    status: {
        type: String,
        required: true
    },

    transaction_type: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default:Date.now,
    },
    time: {
        type: String,
        default: moment().format('HH:mm:ss'), 
      },
    timestamp: {
        type: Date,
        required: true
    }
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;