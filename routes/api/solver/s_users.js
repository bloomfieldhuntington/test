// s_users.js
// description: solver user routes
// StuckCoder Development Team

// MARK:- IMPORTS
const express = require('express');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
// User models
const S_user = require('../../../models/solver/S_user');
const C_user = require('../../../models/company/C_user');
// MARK:- ROUTER
const router = express.Router();

// MARK:- ROUTES

// ROUTE: api/s_users
// DESCRIPTION: Create s_user
// ACCESS: PUBLIC
// TYPE: POST
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({min:6})
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    
    const { name, email, password } = req.body;
    try{
        // Check if user exists as company
        let userCheck = await C_user.findOne({ email });
        if(userCheck) {
            return res.status(400).json({errors: [{ msg: 'User already exists as a company'}]})
        }
        // Check for user
        let user = await S_user.findOne({ email });
        if(user) {
            return res.status(400).json({errors: [{ msg: 'User already exists'}]});
        }

        // Create user instance
        user = new S_user({
            name,
            email,
            password
        });
        // Encrypt password
        const salt = await bcrypt.genSalt(10);
        // hash password
        user.password = await bcrypt.hash(password, salt);
        // save user to database
        await user.save();
        // return jsonwebtoken
        const payload = {
            user: {
                id: user.id,
                role: user.accesscontrol
            }
        }
        // Sign payload
        jwt.sign(payload, config.get('jwtSolverSecret'), {expiresIn:360000}, (err, token) => {
            if(err) throw err;
            res.json({ token });
        });


    } catch(err) {
        console.error(err.message);
        res.status(500).send('server error');
    }

});

module.exports = router;