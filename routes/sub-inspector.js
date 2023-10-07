const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

router.post('/post-account', async (req, res) => {
    try {
        const { roll, name, age, email, contact, password, category } = req.body;
        const hash = await bcrypt.hash(password, 13)
        const civilianAccount = await accountsModel.create({
            roll,
            name,
            age,
            email,
            contact,
            password: hash,
            category
        });

        res.status(201).json(civilianAccount);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }

});

module.exports = router;