const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bankListSchema = new Schema({
    id: String,
    bank_name: String,
    bnk_code: String,
    date: Date,
});

const BankList = mongoose.model('BankList', bankListSchema);

module.exports = BankList;