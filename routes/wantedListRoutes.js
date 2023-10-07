const express = require('express');
const router = express.Router();
const wantedListModel = require('../models/wantedListModel');

router.get('/get-wantedlist', async (req,res)=>{
    try{
        
        const wantedList = wantedListModel.fing({})
        res.status(200).json(wantedList);
    }catch(error){
        console.log(error);
        res.status(500).json({error:"Server error",code:500});
    }
})


module.exports = router;