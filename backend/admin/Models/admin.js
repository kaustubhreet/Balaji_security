const mongoose = require('mongoose');
const constant=require('../../config/constant')
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    role: {
        type: String, 
        enum: [constant.ADMIN_TYPE.admin, constant.ADMIN_TYPE.subAdmin],
        default: 1
    },
    email:{
        type:String,
        required:true
    },
    mobileNo: {
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },  
},
{
    timestamps: true
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;