// A_post.js
// A = General Object
// StuckCoder Development Team

// MARK:- IMPORTS
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// MARK:- CREATE SCHEMA, MODEL
const A_postSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "c_user"
    },
    title: {
        type: String,
        required: true
    },
    category: {
        type: String
    },
    description: {
        type: String,
        required: true
    },
    skills: {
        type: String
    },
    deadline: {
        type: Date,
        default: Date.now
    },
    budget: {
        type: String,
        required: true
    },
    fastestsolution: {
        type: Boolean,
        default: false
    },
    bestsolution: {
        type: Boolean,
        default: false
    },
    solvers: [
        {
            solver: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "s_user"
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now()
    }


})

module.exports = A_post = mongoose.model('a_post', A_postSchema);