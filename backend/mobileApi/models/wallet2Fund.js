const mongoose = require("mongoose");
const wallet2FundSchema = new mongoose.Schema({
    memberId:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true,
    },
    previousWalletAmount:{
        type:Number,
        required:true
    },
    afterWalletAmount: {
        type: Number,
        required: true
    },
    fundWallet:{
        type:Number,
        required:true
    },
    message:{
        type:String,
        default:'Successfully Transfered',
        required:true
    },
    date: {
        type: Date,
        default:Date.now,
    },
    time: {
        type: String,
        default: new Date().toLocaleTimeString(), 
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
        
    },

})

const Wallet2Fund = mongoose.model("Wallet2Fund", wallet2FundSchema);

module.exports = Wallet2Fund;