// c_auth.js
// description: company user routes
// StuckCoder Development Team

// MARK:- IMPORTS
const express = require('express');
const auth = require('../../../middleware/c_auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');
const { check, validationResult } = require('express-validator');

const C_user = require('../../../models/company/C_user');

// MARK:- ROUTER
const router = express.Router();

// MARK:- ROUTES

// ROUTE: api/c_auth
// DESCRIPTION:
// ACCESS: PUBLIC
// TYPE: GET
router.get('/', auth, async (req, res) => {
    try {
        const user = await C_user.findById(req.user.id).select('-password');
        res.json(user);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// ROUTE: api/c_auth
// DESCRIPTION: Authenticate user & get token
// ACCESS: PUBLIC
// TYPE: POST
router.post('/', [
    check('email', 'Please enter a valid email or password').isEmail(),
    check('password', 'Please enter a valid email or password').exists()
],  async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try{
        // Check for user
        let user = await C_user.findOne({ email });
        if(!user) {
            return res.status(400).json({errors: [{ msg: 'Invalid username or password' }]});
        }
        // Compare input password with db password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({errors: [{ msg: 'Invalid username or password'}]})
        }
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