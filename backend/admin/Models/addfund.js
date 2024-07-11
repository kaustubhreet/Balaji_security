
const mongoose = require('mongoose');
const constant=require('../../config/constant')
const Schema = mongoose.Schema;

const adminBankDetailsSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    
    ifscCode: {
        type: String,
        required:true
    },
    accountHolderName: {
        type: String,
        required:true
    },
    accountNumber: {
        type: String,
        required:true
    },
    documents: {
        QRImage:{
            type: String,
            required:true
        }
    },
},
{
    timestamps: true
});

const AdminBankDetails = mongoose.model('AdminBankDetails', adminBankDetailsSchema);

module.exports = AdminBankDetails;