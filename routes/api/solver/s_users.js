// s_users.js
// desciption: s_user = solver user type
// developer: Benjamin Opsal
// owner: Stuckcoder AS

// MARK: IMPORTS
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../../config/keys');
const passport = require('passport');

// MARK: ROUTER
const router = express.Router();

// MARK: User model
const S_user = require('../../../models/solver/S_user');
const C_user = require('../../../models/company/C_user');

// MARK: VALIDATION
const validateRegistrationInput = require('../../../validation/register');
const validateLoginInput = require('../../../validation/login');

// MARK: ROUTES

// ROUTE: api/company/c_users/test
// DESCRIPTION: Test route
// ACCESS: PUBLIC
// TYPE: GET
router.get('/test', (req, res) => res.json({message: "s_users OK"}));

// ROUTE: api/solver/s_users/register
// DESCRIPTION: Register user
// ACCESS: PUBLIC
// TYPE: POST
router.post('/register', (req, res) => {
    // From validation & Checking validation with 'if
    const {errors, isValid} = validateRegistrationInput(req.body);
    if(!isValid) {
        return res.status(400).json(errors);
    }
    C_user.findOne({email: req.body.email})
    // user or c_user?
    .then(user => {
        if(user) {
            errors.email = 'Email already exist C_user';
            return res.status(400).json(errors);
        } else {
            S_user.findOne({email: req.body.email})
            // user or c_user?
            .then(user => {
            if(user) {
            errors.email = 'Email already exist S_user';
            return res.status(400).json(errors);
            } else {
            const newUser = new S_user ({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;
                    newUser.password = hash;
                    newUser
                    .save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err));
                        })
                    })
                }
            })
        }
    })
})

// ROUTE: api/solver/s_users/login
// DESCRIPTION: Login s_user / Returning JWT (Json Web Token)
// ACCESS: PUBLIC
// TYPE: POST
router.post('/login', (req, res) => {
    // From validation & Checking validation with 'if
    const {errors, isValid} = validateLoginInput(req.body);
    if(!isValid) {
        return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;

    // Find user by email
    S_user.findOne({email})
    .then(user => {
        // Check for s_user
        if(!user) {
            return res.status(404).json({message: 'User not found'});
        }
        // Check Password
        bcrypt.compare(password, user.password)
        .then(isMatch => {
            if(isMatch) {
                // User Matched
                // JWT payload with isCompany
                const payload = {
                    id: user.id,
                    name: user.name,
                    iscompany: user.iscompany
                }

                // Sign Token
                jwt.sign(
                    payload, 
                    keys.secretOrKey, 
                    { expiresIn: 3600 }, 
                    (err, token) => {
                        res.json({
                            success: true,
                            token: 'Bearer ' + token
                        });
                });
            } else {
                return res.status(400).json({password: 'Password incorrect'});
            }
        })
    })
})

// ROUTE: api/solver/s_users/current
// DESCRIPTION: Return the current user
// ACCESS: !! PRIVATE !!
// TYPE: POST
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    const errors = {};
    const unauthorizedUser = req.user.iscompany;

    if(unauthorizedUser == true) {
        errors.unauthorized = 'Unauthorized';
        return res.status(401).json(errors)
    } else {
        return res.status(200).json({
            id: req.user.id,
            name: req.user.name,
            email: req.user.email,
            iscompany: req.user.iscompany})
    }
})

module.exports = router;