const express = require('express');
const allAccountsModel = require('../models/allAccountsModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Get all accounts
router.get('/all-accounts', async (req, res) => {
  const allAccounts = await allAccountsModel.find();
  res.json(allAccounts);
});

// Get a single account
router.get('/all-accounts/:id', async (req, res) => {
  const accountId = req.params.id;
  const account = await allAccountsModel.findById(accountId);
  if (!account) {
    res.status(404).json({ message: 'Account not found' });
    return;
  }
  res.json(account);
});


router.post('/post-main-model', async (req, res) => {
    try {
       
        const { name,  email, contact, password,  category } = req.body;
        const hash = await bcrypt.hash(password, 13)
        const civilianAccount = await allAccountsModel.create({
            name,
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


// Update an existing account
router.put('/all-accounts/:id', async (req, res) => {
  const accountId = req.params.id;
  const updatedAccount = req.body;
  const account = await allAccountsModel.findByIdAndUpdate(accountId, updatedAccount, { new: true });
  if (!account) {
    res.status(404).json({ message: 'Account not found' });
    return;
  }
  res.json(account);
});

// Delete an account
router.delete('/all-accounts/:id', async (req, res) => {
  const accountId = req.params.id;
  await allAccountsModel.findByIdAndDelete(accountId);
  res.status(204).send();
});




const secret_key = process.env.JWT_SECRET;



router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await allAccountsModel.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    const userPayload = { email: user.email, password: user.password };
    const accessToken = jwt.sign(userPayload, secret_key, { expiresIn: '2d' });

    res.json({
      status: 'success',
      user: {
        email: user.email,
        role: user.category,
        name: user.name,
        contact: user.contact,
      },
      accessToken,
    });
  } catch (error) {
    console.error('Problem with the login', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
