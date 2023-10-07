const express = require('express');
const router = express.Router();
const adminToInsModel = require('../models/AdminToPoliceModel'); // Adjust the path as needed

// Route to create a new crime record
router.post('/admin-to-inspector', async (req, res) => {
    try {
        const newCrime = await adminToInsModel.create(req.body);
        res.status(201).json(newCrime);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

// Route to get all crime records
router.get('/admin-to-inspector', async (req, res) => {
    try {
        const crimes = await adminToInsModel.find();
        res.status(200).json(crimes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

// Route to get a specific crime record by ID
router.get('/admin-to-inspector/:code', async (req, res) => {
    const { code } = req.params.code;
    try {
        console.log(req.params.code,"this is the code")
        const crime = await adminToInsModel.find({stationCode:req.params.code});
        if (!crime) {
            return res.status(404).json({ error: "Crime not found" });
        }
        res.status(200).json(crime);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

// Route to update a specific crime record by ID
router.put('/admin-to-inspector/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const updatedCrime = await adminToInsModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedCrime) {
            return res.status(404).json({ error: "Crime not found" });
        }
        res.status(200).json(updatedCrime);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

// Route to delete a specific crime record by ID
router.delete('/admin-to-inspector/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedCrime = await adminToInsModel.findByIdAndRemove(id);
        if (!deletedCrime) {
            return res.status(404).json({ error: "Crime not found" });
        }
        res.status(200).json(deletedCrime);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
