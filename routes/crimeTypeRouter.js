const express = require('express');
const crimeTypeModel = require('../models/crimetypeModel');
const router = express.Router();



router.post('/post-crimetype', async (req, res) => {
    try {
        const { crimeType } = req.body;
    
        const crimeTypedb = await crimeTypeModel.create({
          crimeType
        });

        res.status(201).json(crimeTypedb);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }

});


router.get('/get-crimetype', async (req, res) => {
    try {  
        const crimeTypedb = await crimeTypeModel.find({});

        res.status(200).json(crimeTypedb);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }

});



module.exports = router;