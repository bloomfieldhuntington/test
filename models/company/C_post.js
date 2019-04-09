// C_post.js
// desciption: C_post
// developer: Stuckcoder devteam
// owner: Stuckcoder AS

// MARK: IMPORTS
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// MARK: CREATE SHEMA, MODEL
const C_PostSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'c_users'
    },
    budget: {
        type: String,
        required: true
    },
    title: {
       type: String,
       required: true
    },
    start: {
        type: Date,
        default: Date.now
    },
    deadline: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    solvers: [
        {
            solver: {
                type: Schema.Types.ObjectId,
                ref: 's_users'
            }
        }
    ],
    views: [
        {
            solvers: {
                type: Schema.Types.ObjectId,
                ref: 's_users'
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = C_post = mongoose.model('c_post', C_PostSchema);