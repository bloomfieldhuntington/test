// S_profile.js
// desciption: Solver profile
// developer: Benjamin Opsal
// owner: Stuckcoder AS

// MARK: IMPORTS
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// MARK: CREATE SHEMA, MODEL
const S_profileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 's_users'
    },
    handle: {
        type: String,
        required: true,
        max: 40
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
    skills: {
        type: [String],
        required: true
    },
    bio: {
        type: String
    },
    githubusername: {
        type: String
    },
    experience: [
        {
            title: {
                type: String,
                required: true
            },
            company: {
                type: String,
                required: true
            },
            location: {
                type: String
            },
            from: {
                type: Date,
                required: true
            },
            to: {
                type: Date
            },
            current: {
                type: Boolean,
                default: false
            }
        }
    ],
    education: [
        {
            school: {
                type: String,
                required: true
            },
            degree: {
                type: String,
                required: true
            },
            fieldofstudy: {
                type: String,
                required: true
            },
            from: {
                type: Date,
                required: true
            },
            to: {
                type: String
            },
            current: {
                type: Boolean,
                default: false
            },
            desciption: {
                type: String
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = C_profile = mongoose.model('s_profile', S_profileSchema);