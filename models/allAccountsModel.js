const mongoose = require('mongoose');

const allAccountsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    contact: {
        type: String,
        required: true
    },
    password:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    }
})

const allAccountsModel = mongoose.model('all-accounts',allAccountsSchema);
module.exports = allAccountsModel