// databse.js
// StuckCoder Development Team
// db logic

const mongoose = require('mongoose');

// To enable access to default.json
const config = require('config');
// To store data fra default.json
const db = config.get('mongoURI');

// Connect to databse
const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        console.log('MongoDB Connected...');

    } catch(err) {
        console.error(err.message);
        //exit process with failure
        process.exit(1);
    }
}

module.exports = connectDB;