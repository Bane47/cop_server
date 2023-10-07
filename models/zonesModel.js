const mongoose = require('mongoose');

const zonesSchema = new mongoose.Schema({
    area:{
        type:String,
        required:true
    },
    stationCode:{
        type:String,
        required:true
    },
    inspector:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }
})

const zonesModel = mongoose.model('zones',zonesSchema);
module.exports = zonesModel;