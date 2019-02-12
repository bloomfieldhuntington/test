// S_user.js
// desciption: S_user or solver user. auth/registration
// developer: Benjamin Opsal
// owner: Stuckcoder AS

// MARK: IMPORTS
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// MARK: CREATE SHEMA, MODEL
const S_userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    password2: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = S_user = mongoose.model('s_users', S_userSchema);