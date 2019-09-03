// c_users.js
// description: company user routes
// StuckCoder Development Team

// MARK:- IMPORTS
const express = require('express');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
// User models
const C_user = require('../../../models/company/C_user');
const S_user = require('../../../models/solver/S_user');
// MARK:- ROUTER
const router = express.Router();

// MARK:- ROUTES

// ROUTE: api/c_users
// DESCRIPTION: Create c_user
// ACCESS: PUBLIC
// TYPE: POST
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({min: 6})
],  async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, accesscontrol} = req.body;
    try{
        // Check if user exists as company
        let userCheck = await S_user.findOne({ email });
        if(userCheck) {
            return res.status(400).json({errors: [{ msg: 'User already exists as a solver'}]})
        }
        // Check for user
        let user = await C_user.findOne({ email });
        if(user) {
            return res.status(400).json({errors: [{ msg: 'User already exists' }]});
        }
        // Create instance of C-user
        user = new C_user({
            name,
            email,
            password
        });
        // Encrypt password
        const salt = await bcrypt.genSalt(10);
        // hash password
        user.password = await bcrypt.hash(password, salt);
        // Save user to database
        await user.save();
        // Return jsonwebtoken
        const payload = {
            user: {
                id: user.id,
                role: user.accesscontrol
            }
        }
        // Sign payload
        jwt.sign(payload, config.get('jwtCompanySecret'), {expiresIn:360000}, (err, token) => {
            if(err) throw err;
            res.json({ token });
        });

    } catch(err) {
        console.error(err.message);
        res.status(500).send('server error');

    }
    
});

module.exports = router;