const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const adminModel = require('../models/adminModel');



router.post('/post-admin', async (req, res) => {
    try {
        const { name, age, email, contact, password, image , category } = req.body;
        const hash = await bcrypt.hash(password, 13)
        const civilianAccount = await adminModel.create({
            name,
            age,
            email,
            contact,
            password: hash,
            image,
            category
        });

        res.status(201).json(civilianAccount);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }

});


module.exports = router;