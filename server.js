// server.js
// desciption: server for The Stuckcoder Application (web)
// developer: Benjamin Opsal
// owner: Stuckcoder AS


const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

// MARK: IMPORT ROUTES ("Use routes" below)
// Companies
const c_users = require('./routes/api/company/c_users');
const c_profile = require('./routes/api/company/c_profile');
const posts = require('./routes/api/company/posts');
// Solvers
const s_users = require('./routes/api/solver/s_users');
const s_profile = require('./routes/api/solver/s_profile');

// EXPRESS INIT
const app = express();

// MARK: MIDDLEWARE
// Body-Parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// Passport
app.use(passport.initialize());
// Passport Config
require('./config/passport')(passport);

// MARK: DATABASE
// Database Configuration
const db = require('./config/keys').mongoURI
// Connect to MongoDB using mongoose
mongoose
    .connect(db)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));
    
app.get('/', (req, res) => res.send('Hello'));

// MARK: USE ROUTES
// Companies
app.use('/api/company/c_users', c_users);
app.use('/api/company/c_profile', c_profile);
app.use('/api/company/posts', posts);
// Solvers
app.use('/api/solver/s_users', s_users);
app.use('/api/solver/s_profile', s_profile);
// Server Static assets if in production
if(process.env.NODE_ENV === 'production') {
    //Set static folder
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}


// Using process.env.PORT for heroko compatibility. Depends on deployment target
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));