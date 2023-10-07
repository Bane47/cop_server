const express = require('express');
const router = express.Router();
const applicationModel = require('../models/applicationModel');


router.get('/get-application', async (req, res) => {
    try {
        const appDetails = await applicationModel.find({})
        res.status(200).json(appDetails);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error" });
    }
})

router.delete('/delete-application/:id', async (req, res) => {
    try {
        const { id } = req.params
        const appDetails = await applicationModel.findByIdAndRemove(id)
        res.status(200).json(appDetails);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error" });
    }
})


router.post('/post-application', async (req, res) => {
    try {
        const { roll, name, email, contact, age, gender, stationDetails, applicationDate, area } = req.body;

        // Create a new application using the applicationModel schema
        const app = await applicationModel.create({
            roll,
            name,
            email,
            contact,
            age,
            gender,
            stationDetails,
            applicationDate,
            area
        });

        res.status(200).json("success");
    } catch (error) {
        console.error(error);

        // Handle unique constraint violation for email field
        if (error.code === 11000) {
            res.status(422).json("Email already used");
        } else {
            res.status(500).json({ error: "Server error", code: 500 });
        }
    }
});




module.exports = router;