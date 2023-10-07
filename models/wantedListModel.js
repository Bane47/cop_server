const mongoose = require('mongoose');

const wantedListSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    imageSrc:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    link:{
        type:String,
        required:true
    }
})

const wantedListModel = mongoose.model('wantedlist',wantedListSchema);
module.exports = wantedListModel;