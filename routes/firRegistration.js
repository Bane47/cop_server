const express = require('express');
const router = express.Router();
const firModel = require('../models/firModel');
const solvedModel = require('../models/solvedModel');
const crimesModel = require('../models/crimeModel');


router.post('/file-fir', async (req, res) => {
    try {
        const {
            crimeType,
            complaintDescription,
            incidentDate,
            incidentLocation,
            stationCode,
            incidentDescription,
            evidenceFile,
            witnessStatement,
            witnessContact,
            witnessAddress,
            additionalDetails,
            witnessName,
            contact,
            userEmail,
            userName,
            reportedAt,
            reportedTime,
            status,
            complaintCode,
            inspector,
            firCode
        } = req.body;

        const firReport = await firModel.create({
            crimeType,
            complaintDescription,
            incidentDate,
            incidentLocation,
            stationCode,
            incidentDescription,
            evidenceFile,
            witnessStatement,
            witnessContact,
            witnessAddress,
            additionalDetails,
            witnessName,
            contact,
            userEmail,
            userName,
            reportedAt,
            reportedTime,
            status,
            complaintCode,
            inspector,
            firCode
        });
        res.status(200).json(firReport);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error", code: 500 })
    }
})



router.get('/registered-firs', async (req, res) => {
    try {
        const crimeReports = await firModel.find({});
        res.status(200).json(crimeReports);
    } catch (error) {
        console.error("There has been an error");
        res.status(500).json({ error: "Server error", code: 500 });
    }
})

router.get('/registered-firs/:id', async (req, res) => {
    try {
        const { id } = req.params.id;
        console.log(req.params.id,'This')
        const crimeReports = await firModel.find({ stationCode: req.params.id });
        res.status(200).json(crimeReports);
    } catch (error) {
        console.error("There has been an error");
        res.status(500).json({ error: "Server error", code: 500 });
    }
})


router.put('/pending-fir/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const {
            crimeType,
            complaintDescription,
            incidentDate,
            incidentLocation,
            stationCode,
            incidentDescription,
            evidenceFile,
            witnessStatement,
            witnessContact,
            witnessAddress,
            additionalDetails,
            witnessName,
            contact,
            userEmail,
            userName,
            reportedAt,
            reportedTime,
            status,
            complaintCode,
            inspector } = req.body;

        const checkStatus = await firModel.findByIdAndUpdate(id, {
            crimeType,
            complaintDescription,
            incidentDate,
            incidentLocation,
            stationCode,
            incidentDescription,
            evidenceFile,
            witnessStatement,
            witnessContact,
            witnessAddress,
            additionalDetails,
            witnessName,
            contact,
            userEmail,
            userName,
            reportedAt,
            reportedTime,
            status: "Pending",
            complaintCode,
            inspector
        });

        res.status(200).json(checkStatus);
        console.log(checkStatus)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server", code: 500 })
    }
})

router.post('/solve-fir', async (req, res) => {
    try {
        const {
            crimeType,
            complaintDescription,
            incidentDate,
            incidentLocation,
            stationCode,
            incidentDescription,
            evidenceFile,
            witnessStatement,
            witnessContact,
            witnessAddress,
            additionalDetails,
            witnessName,
            contact,
            userEmail,
            userName,
            reportedAt,
            reportedTime,
            status,
            complaintCode,
            inspector } = req.body;

        const checkStatus = await solvedModel.create({
            crimeType,
            complaintDescription,
            incidentDate,
            incidentLocation,
            stationCode,
            incidentDescription,
            evidenceFile,
            witnessStatement,
            witnessContact,
            witnessAddress,
            additionalDetails,
            witnessName,
            contact,
            userEmail,
            userName,
            reportedAt,
            reportedTime,
            status,
            complaintCode,
            inspector
        });

        res.status(200).json(checkStatus);
        console.log(checkStatus)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server", code: 500 })
    }
})

router.delete('/decline-fir/:id', async (req, res) => {
    try {
        const { id } = req.params

        console.log(id)
        const deleteReport = await crimesModel.findByIdAndRemove(id)
        console.log(deleteReport)
        res.status(200).json(deleteReport);
    } catch (error) {
        console.error(error);
    }
})

router.delete('/delete-fir/:id', async (req, res) => {
    try {
        const { id } = req.params

        console.log(id)
        const deleteReport = await firModel.findByIdAndRemove(id)
        console.log(deleteReport)
        res.status(200).json(deleteReport);
    } catch (error) {
        console.error(error);
    }
})

module.exports = router