const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const packageSchema = new Schema({  
    packageName: { 
        type: String,
        enum:["DEP BASIC PACKAGE","1999 PACKAGE"],
    },
    packageAmount: {
        type:Number,
        enum:[999,1999]
    },
    status:{
        type:String,
        enum:['active','inactive']
    },
    date:{
        type:Date,
        default:Date.now
    },
});

const Package = mongoose.model('Package', packageSchema);

module.exports = Package;