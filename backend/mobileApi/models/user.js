const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    adharNumber: {
        type: String,
        required: true,
        unique: true
    },
    panNumber: {
        type: String,
        required: true,
        unique: true
    },
    fatherName: {
        type: String,
        required:true
    },
    motherName: {
        type: String,
        required:true
    },
    nomineeName: {
        type: String,
        required:true
    },
    bankDetails: {
        accountHolderName: {
            type: String,
            required:true
        },
        accountNumber: {
            type: String,
            required:true
        },
        ifscCode: {
            type: String,
            required:true
        }
    },
    documents: {
        passportImage:{
            type: String,
            required:true
        },
        adharCardFront: {
            type: String,
            required:true
        },
        adharCardBack: {
            type: String,
            required:true
        },
        panCard: {
            type: String,
            required:true
        },
        bankPassbook: {
            type: String,
            required:true
        }
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
