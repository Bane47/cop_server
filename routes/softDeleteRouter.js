const express = require('express');
const router = express.Router();
const softDeleteModel = require('../models/softdeleteReports')


router.post('/post-softDelete', async (req, res) => {
    try {
        const { crimeType,
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
            deletedTime } = req.body;

        const crimesReport = await softDeleteModel.create({
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
            deletedTime
        });
        res.status(201).json(crimesReport);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error", code: 500 });
    }
})

router.get('/get-softDelete/:email', async (req, res) => {
    try {
        const { email } = req.params.email

        const crimesReport = await softDeleteModel.find({ userEmail: email })
        res.status(200).json(crimesReport);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error", code: 500 });
    }
})

module.exports = router;