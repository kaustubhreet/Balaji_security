const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const positionCommoditySchema = new Schema({
    scriptname:{
        type:String,
        required:true
    },
    exchange:{
        type:String,
        required:true
    },
    sellbuy:{
        type:String,
        required:true
    },
    price1:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    tradeValue:{
        type:Number,
        required:true
    },
    buysell:{
        type:String,
        required:true
    },
    price2:{
        type:Number,
        required:true
    },
    sellvalue:{
        type:Number,
        required:true
    },
    ltp:{
        type:String,
        required:true
    },
    plAmount:{
        type:Number,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
},
{
    timestamps: true
});

const PositionCommodity = mongoose.model('PositionCommodity', positionCommoditySchema);

module.exports = PositionCommodity;