const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const accountsModel = require('../models/accountsModel');
const allAccountsModel = require('../models/allAccountsModel');
require('dotenv').config();


router.get('/get-civilian',async (req, res) => {
    const { name } = req.query;
    try{    
   const allaccounts = await accountsModel.findOne({ name: name })
        .then((user) => {
            if (!user) {
                res.status(404).json({ error: "User not found" });
                return;
            }
        })
        res.status(200).json(allaccounts);

    }catch(error){
        console.log(error);
        res.status(500).json({ error: "Server error" });

    }
})


router.post('/post-account', async (req, res) => {
    try {
        const { name, age, email, contact, password, image , category } = req.body;
        const hash = await bcrypt.hash(password, 13)
        const civilianAccount = await accountsModel.create({
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

const secret_key = process.env.JWT_SECRET;
router.post(`/login`, async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await allAccountsModel.findOne({ email: email });

        if (user) {
            if (user.password) {
                const isValid = await bcrypt.compare(password, user.password);
                // if (isValid) {
                    let userPayload = { email: user.email, password: user.password };                

                    const accessToken = jwt.sign(userPayload, secret_key, { expiresIn: '2d' });
                    console.log(user);
                    res.json({
                        status: "success",
                        user: {
                            email: user.email,
                            role: user.category,
                            name: user.name,
                            contact:user.contact
                        },
                        accessToken: accessToken
                    })
                    console.log(user.category)
                } else {
                    res.status(401).json({ error: "Password is incorrect", code: 401 });
                }
            // } else {
            //     res.status(400).json({ error: "No password set for this user", code: 400 });
            // }

        } else {
            res.status(404).json({ error: "User not found", code: 404 });
        }
    } catch (error) {
        console.error("Problem with the logi    n", error);
        res.status(500).json({ error: "Internal server error", code: 500 })
    }
})


router.get("/get-profile/:email", async (req, res) => {
  
    try {
        const { email } = req.params.email;
        console.log(email)
      // Find the user with the specified email
      const account = await accountsModel.findOne({ email: email });
  
      if (!account) {
        return res.status(404).json({ error: "User not found" });
      }
  
      res.status(200).json(account);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  






module.exports = router;