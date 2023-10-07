const mongoose = require('mongoose');

const softDeleteSchema = new mongoose.Schema({
 crimeType:{
        type:String,        
    },
    complaintDescription:{
        type:String
    },
    incidentDate:{
        type: Date, 
        required: true,
    },
    incidentLocation:{
        type:String,
        required:true
    },
    stationCode:{
        type:String,
        required:true
    },
    incidentDescription:{
        type:String,
        required:true
    },
    evidenceFile:{
        type:String,
        required:false
    },
    contact:{
        type:String,
        required:true
    },
    userEmail:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true
    },
    reportedAt:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    complaintCode:{
        type:String,
        required:true
    },
    witnessName:{
        type:String
    },
    witnessContact:{
        type:String
    },
    witnessAddress:{
        type:String
    },
    witnessStatement:{
        type:String
    },
    additionalDetails:{
        type:String
    },
    reportedTime:{
        type:String
    },
    inspector:{
        type:String,
        required:true
    },
    deletedTime:{
        type:Date,
        required:true
    }
})

const softDeleteModel = mongoose.model('softdelete-reports',softDeleteSchema);
module.exports = softDeleteModel;