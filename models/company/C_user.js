// C_user.js
// StuckCoder Development Team 2019

// MARK:- IMPORTS
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// MARK:- CREATE SCHEMA, MODEL
const C_userSchema = new Schema({
    name: {
        type: String
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
        default: Date.now
    },
    accesscontrol: {
        type: Number,
        default: 1,
        required: true
    }
})

module.exports = C_user = mongoose.model('c_user', C_userSchema);