// S_profile.js
// StuckCoder Development Team 2019

// MARK:- IMPORTS
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// MARK:- CREATE SCHEMA, MODEL
const S_profileSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "s_user"
    },
    company: {
        type: String
    },
    website: {
        type: String
    },
    country: {
        type: String
    },
    bio: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = S_profile = mongoose.model('s_profile', S_profileSchema);