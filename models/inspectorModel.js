const mongoose = require('mongoose');

const inspectorSchema = new mongoose.Schema({
    
    id: {
        type: String,
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
        default:'Inspector',
        required: true
    },
    password:{
        type:String,
        required: true
    }
});

const inspectorModel = mongoose.model("inspectors",inspectorSchema);
module.exports = inspectorModel;