const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    roll: {
        type: String,
        required: true,
        unique: true
    },
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
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    stationDetails: {
        type: String,
        required: true
    },
    applicationDate: {
        type: Date,
        required: true
    },
    area: {
        type: String,
        required: true
    },
    category:{
        type:String,
        required:true
    }
});

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;
