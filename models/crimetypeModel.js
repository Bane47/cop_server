const mongoose = require('mongoose');

const crimeTypesSchema = new mongoose.Schema({
    crimeType:{
        type:String,
        required:true
    }
});

const crimeTypeModel = mongoose.model('crimetype',crimeTypesSchema);
module.exports= crimeTypeModel;