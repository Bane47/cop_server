const express = require('express');
const router = express.Router();
const firModel = require('../models/firModel');
const crimesModel = require('../models/crimeModel');
const solvedModel = require('../models/solvedModel');

router.get('/check-status-unregistered/:email', async (req, res) => {
    try {
        const email = req.params.email;
        const checkStatus = await crimesModel.find({ userEmail: email })


        console.log(checkStatus)
        res.status(200).json(checkStatus);

        } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server", code: 500 })
    }
})

router.get('/check-status-registered/:email', async (req, res) => {
    try {
        const email = req.params.email;
        console.log("Im in ", email)
        const checkStatus = await firModel.find({ userEmail: email })


        console.log(checkStatus)
        res.status(200).json(checkStatus);

        } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server", code: 500 })
    }
})

router.get('/check-status-solved/:email', async (req, res) => {
    try {
        const email = req.params.email;
        console.log("Im in ", email)
        const checkStatus = await solvedModel.find({ userEmail: email })


        console.log(checkStatus)
        res.status(200).json(checkStatus);

        } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server", code: 500 })
    }
})

module.exports = router;
