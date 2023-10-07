const express = require('express');
const router = express.Router();
const crimesModel = require('../models/crimeModel');

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + file.originalname);
    }
})

const upload = multer({ storage: storage })



router.post('/upload-image', upload.single('image'), async (req, res) => {
    console.log(req.body);
    res.send('Uploaded');
    const imageName = req.file.filename
})
router.post('/post-crimes', upload.single('evidenceFile'), async (req, res) => {
    try {
        // Get data from the request body
        const {
            crimeType,
            complaintDescription,
            incidentDate,
            incidentLocation,
            stationCode,
            incidentDescription,
            contact,
            userEmail,
            userName,
            reportedAt,
            status,
            witnessName,
            witnessContact,
            witnessAddress,
            witnessStatement,
            additionalDetails,
            reportedTime,
            inspector,
            complaintCode,
            evidenceFile
        } = req.body;

        // Create a new crime report
        const newCrimeReport = new crimesModel({
            crimeType,
            complaintDescription,
            incidentDate,
            incidentLocation,
            stationCode,
            incidentDescription,
            contact,
            userEmail,
            userName,
            reportedAt,
            status,
            witnessName,
            witnessContact,
            witnessAddress,
            witnessStatement,
            additionalDetails,
            reportedTime,
            inspector,
            complaintCode,
            evidenceFile
        });

        // Save the crime report to the database
        await newCrimeReport.save();

        res.status(201).json({ message: 'Crime report created successfully' });
    } catch (error) {
        console.log(error)
        console.error("There has been an error");
        res.status(500).json({ error: "Server error", code: 500 });
    }
});

// Define a GET route to retrieve crime reports with image data
router.get('/get-crimes', async (req, res) => {
    try {
        // Retrieve all crime reports
        const crimeReports = await crimesModel.find({});

        res.status(200).json(crimeReports);
    } catch (error) {
        console.error("There has been an error");
        res.status(500).json({ error: "Server error", code: 500 });
    }
});

router.get('/get-crimes/:code', async (req, res) => {
    try {
        const { code } = req.params.code
        // Retrieve all crime reports
        const crimeReports = await crimesModel.find({stationCode:code});

        res.status(200).json(crimeReports);
    } catch (error) {
        console.error("There has been an error");
        res.status(500).json({ error: "Server error", code: 500 });
    }
});
module.exports = router;





router.delete('/delete-crime/:id', async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id)
        const crimeReports = await crimesModel.findByIdAndRemove({ _id: id });
        res.status(200).json(crimeReports);
    } catch (error) {
        console.error("There has been an error");
        res.status(500).json({ error: "Server error", code: 500 });
    }
})


module.exports = router;    