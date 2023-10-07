const mongoose = require('mongoose');

const policeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    contact: {
        type: Number,
        required: true,
        validate: {
            validator: function (value) {
                return /^\d{10}$/.test(value);
            },
            message: 'Invalid phone number format'
        }
    },
    image: {
        type: String
    }
});

const policeModel = mongoose.model('officers-accounts',policeSchema);
module.exports = policeModel;