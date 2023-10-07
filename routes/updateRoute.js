const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const UpdateModel = require('../models/UpdateModel');

router.post('/update-mail', async (req, res) => {
    const { email, progress, status, officerName, name ,complaintCode } = req.body;

    try {
    
        // Create a transporter for sending emails (assuming you have the required SMTP server settings)
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'priyadarshanmanoharan@gmail.com', // Replace with your Gmail email
                pass: 'ruos jrry mhar hphm' // Replace with your Gmail password or generate an app-specific password
            }
        });

        // Email template
        const mailOptions = {
            from: 'priyadarshanmanoharan@gmail.com', // Replace with your Gmail email
            to: email,
            subject: 'Progress Update on Your Complaint',
            text: `
            Dear ${name},

            We're writing to provide you with an update on your complaint:

            Progress: ${progress}
            Status: ${status}
            Officer: ${officerName}
            Complaint Code: ${complaintCode}

            Thank you for choosing us. Your safety and satisfaction matter.

            Sincerely,
            Police Department
            `
        };

        // Send the email
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                return res.status(500).json({ status: "Error sending email" });
            } else {
                return res.status(200).json({ status: "Success" });
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: "Internal Server Error" });
    }
});



// Create a new progress update
router.post('/progress-update', async (req, res) => {
    try {
        const { progress, status, officerName,email,name,officerNumber ,compCode,firCode} = req.body;
        // Create a new progress update document
        const newUpdate = new UpdateModel({
            progress,
            status,
            officerName,
            email,
            name,
            officerNumber,
            compCode,
            firCode
        });

        // Save the progress update to the database
        await newUpdate.save();

        // Respond with a success message
        res.status(201).json({ status: "Progress update created successfully" });
    } catch (error) {
        console.error(error);
        if(error.code==='E11000'){
            console.log("Duplicate")
        }
        res.status(500).json({ status: "Internal Server Error" });
    }
});


// Retrieve all progress updates
router.get('/progress-updates', async (req, res) => {
    try {
        // Use the find() method to retrieve all progress updates from the database
        const progressUpdates = await UpdateModel.find();

        // Respond with the retrieved progress updates as a JSON array
        res.status(200).json(progressUpdates);
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "Internal Server Error" });
    }
});
module.exports = router;
