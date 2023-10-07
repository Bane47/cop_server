const express = require("express");
const bcrypt = require('bcrypt');
const router = express.Router();
const jwt = require("jsonwebtoken");
require('dotenv').config();
const nodemailer = require('nodemailer');
const accountsModel = require("../models/accountsModel");




router.post('/forgotPassword', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await accountsModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const token = jwt.sign({ id: user._id }, "jwt_secret_key", {
            expiresIn: "1d"
        });

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
            subject: "Here is your password reset link",
            text: `http://localhost:3000/password-reset/${user._id}/${token}`
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


// Route for resetting the password
router.post("/password-reset/:id/:token", async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;

    try {
        jwt.verify(token, "jwt_secret_key", async (err, decoded) => {
            if (err) {
                return res.status(401).json({ status: "Error with token" });
            } else {
                const hash = await bcrypt.hash(password, 10);

                const updatedUser = await accountsModel.findByIdAndUpdate(id, { password: hash });

                if (!updatedUser) {
                    return res.status(404).json({ status: "User not found" });
                }

                return res.status(200).json({ status: "Success" });
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: "Internal Server Error" });
    }
});

module.exports = router;