// server.js
// StuckCoder Development Team 2019
// Created 17/07/2019

// MARK: - IMPORTS
const express = require('express');
const connectDB = require('./config/database');

// Initialize as express application
const app = express();

// Connect to Databse
connectDB();

// MARK:- MIDDLEWARE
app.use(express.json({extended: false}))


app.get('/', (req, res) => res.send('server.js says: Are you a StuckCoder?'));

// MARK:- ROUTES

// Company
app.use('/api/c_auth', require('./routes/api/company/c_auth'));
app.use('/api/c_profile', require('./routes/api/company/c_profile'));
app.use('/api/c_users', require('./routes/api/company/c_users'));
// Solver
app.use('/api/s_auth', require('./routes/api/solver/s_auth'));
app.use('/api/s_profile', require('./routes/api/solver/s_profile'));
app.use('/api/s_users', require('./routes/api/solver/s_users'));
// Post (Projects)
app.use('/api/a_post', require('./routes/api/post'));

// Port vaiable
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server live on port: ${PORT}`));