// S_user.js
// StuckCoder Development Team 2019

// MARK:- IMPORTS
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// MARK:- CREATE SCHEMA, MODEL
const S_userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    accesscontrol: {
        type: Number,
        default: 2,
        required: true
    }
})

module.exports = S_user = mongoose.model('s_user', S_userSchema);