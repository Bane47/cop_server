const express = require('express');
const router = express.Router();
const zonesModel = require('../models/zonesModel');

router.post('/add-zones', async (req, res) => {
    try {
        const { area, inspector, stationCode , email} = req.body;
        const zones = await zonesModel.create({ area, stationCode, inspector ,email})
        res.status(200).json(zones);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error", code: 500 })
    }
});

router.get('/get-zones/:area', async (req, res) => {
    try {
        const { area } = req.params.area;
        const policeStation = await zonesModel.find({ area: area });
        res.status(200).json(policeStation);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error finding the area", code: 500 });
    }
});

router.get('/get-zones-email/:name', async (req, res) => {

    try {
        console.log(req.params.name)
        const policeStation = await zonesModel.findOne({ inspector: req.params.name });
        res.status(200).json(policeStation);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error finding the area", code: 500 });
    }
});

router.get('/get-zones-code/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const policeStation = await zonesModel.findOne({ stationCode: id });
        res.status(200).json(policeStation);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error finding the area", code: 500 });
    }
});

router.get('/all-zones', async (req, res) => {
    try {
        const allStations = await zonesModel.find({});
        res.status(200).json(allStations);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error", code: 500 });
    }
})

module.exports = router;