// C_profile.js
// StuckCoder Development Team 2019

// MARK:- IMPORTS
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// MARK:- CREATE SCHEMA, MODEL
const C_profileSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'c_user'
    },
    company: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    website: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = C_profile = mongoose.model('c_profile', C_profileSchema);