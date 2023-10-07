const express = require("express");
const bcrypt = require('bcrypt');
const router = express.Router();
const jwt = require("jsonwebtoken");
require('dotenv').config();
const nodemailer = require('nodemailer');
const accountsModel = require("../models/accountsModel");




router.post('/mail-application', async (req, res) => {
    const { email,password, } = req.body;

    try {
     
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
            subject: "Your officer account has been created successful",
            text: `Creadentials
            email:${email}
            Password:${password}
            `
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