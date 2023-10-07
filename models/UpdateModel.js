const mongoose = require('mongoose');

const UpdateSchema = new mongoose.Schema({
    progress:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    officerName:{
        type:String,
        required:true
    },
    officerNumber:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    compCode:{
        type:String,
        required:true,
    },
    firCode:{
        type:String,
        required:true,
    }
   
});

const UpdateModel = mongoose.model('UpdateModel',UpdateSchema);
module.exports = UpdateModel;