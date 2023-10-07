const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const inspectorModel = require('../models/inspectorModel');
const nodemailer = require('nodemailer');
const zonesModel = require('../models/zonesModel');


router.post('/post-inspector', async (req, res) => {
    try {
        const { id, name, age, email, contact, gender, stationDetails, applicationDate, area, category, password } = req.body;
        const hash = await bcrypt.hash(password, 13)
        const civilianAccount = await inspectorModel.create({
            id,
            name,
            age,
            email,
            contact,
            password: hash,
            category,
            gender,
            stationDetails,
            applicationDate,
            area
        });

        res.status(201).json(civilianAccount);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }

});

router.put('/transfer-inspector/:id', async (req, res) => {
    const { id } = req.params;
    const { inspector, area , email} = req.body;

    try {
        // Use { _id: id } to specify the condition based on _id
        const transfer = await zonesModel.findOneAndUpdate({ stationCode: id }, { inspector, area , email}, { new: true });

        if (!transfer) {
            // Handle the case where the document with the provided _id is not found
            return res.status(404).json({ error: "Document not found" });
        }

        res.status(200).json(transfer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});



router.post('/send-email-credentials', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await inspectorModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }


        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'priyadarshanmanoharan@gmail.com',
                pass: "ruos jrry mhar hphm"
            }
        });

        var mailOptions = {
            from: 'priyadarshanmanoharan@gmail.com',
            to: email,
            subject: "Your credentials for you account",
            text: `Email:${email} 
                   Password: ${password}`
        };

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

router.get('/get-inspector/:email', async (req, res) => {
    const { email } = req.params;
  
    try {
      // Find the inspector by email
      const inspector = await inspectorModel.findOne({ email });
  
      if (!inspector) {
        return res.status(404).json({ error: "Inspector not found" });
      }
  
      // Return the inspector data
      res.status(200).json(inspector);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  });

  router.get('/get-inspector', async (req, res) => {
    
    try {
      // Find the inspector by email
      const inspector = await inspectorModel.find({  });
  
      if (!inspector) {
        return res.status(404).json({ error: "Inspector not found" });
      }
  
      // Return the inspector data
      res.status(200).json(inspector);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  });

  router.put('/update-inspector/:email', async (req, res) => {
    const { email } = req.params.email;
    const updateData = req.body; // Update data sent in the request body

    try {
        

        // Find the inspector by email and update their information
        const updatedInspector = await inspectorModel.findOneAndUpdate({ email:req.params.email }, req.body, { new: true });
        

        if (!updatedInspector) {
            return res.status(404).json({ error: "Inspector not found" });
        }

        res.status(200).json(updatedInspector);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});



module.exports = router;