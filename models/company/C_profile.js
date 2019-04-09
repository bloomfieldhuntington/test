// C_profile.js
// desciption: Company profile
// developer: Benjamin Opsal
// owner: Stuckcoder AS

// MARK: IMPORTS
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// MARK: CREATE SHEMA, MODEL
const C_profileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'c_users'
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
    avatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = C_profile = mongoose.model('c_profile', C_profileSchema);