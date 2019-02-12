// server.js
// desciption: server for The Stuckcoder Application (web)
// developer: Benjamin Opsal
// owner: Stuckcoder AS


const express = require('express');
const mongoose = require('mongoose');

// MARK: IMPORT ROUTES ("Use routes" below)
// Companies
const c_users = require('./routes/api/company/c_users');
const c_profile = require('./routes/api/company/c_profile');
const posts = require('./routes/api/company/posts');
// Solvers

// EXPRESS INIT
const app = express();

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
app.use('/api/company/c_users', c_users);
app.use('/api/company/c_profile', c_profile);
app.use('/api/company/posts', posts);


// Using process.env.PORT for heroko compatibility. Depends on deployment target
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));