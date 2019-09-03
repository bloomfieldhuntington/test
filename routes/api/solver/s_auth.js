// s_auth.js
// description: company user routes
// StuckCoder Development Team

// MARK:- IMPORTS
const express = require('express');
const auth = require('../../../middleware/s_auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');
const { check, validationResult } = require('express-validator');

const S_user = require('../../../models/solver/S_user');

// MARK:- ROUTER
const router = express.Router();

// MARK:- ROUTES

// ROUTE: api/s_auth
// DESCRIPTION:
// ACCESS: PUBLIC
// TYPE: GET
router.get('/', auth, async (req, res) => {
    try {
        const user = await S_user.findById(req.user.id).select('-password');
        res.json(user);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// ROUTE: api/s_auth
// DESCRIPTION: Authenticate user & get token
// ACCESS: PUBLIC
// TYPE: POST
router.post('/', [
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Please enter a password').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try{
        // Look for user in db
        let user = await S_user.findOne({ email });
        if(!user) {
            return res.status(400).json({errors: [{msg: 'Invalid username or password'}]});
        }
        // Compare input password with db password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({errors: [{msg: 'Invalid username or password'}]})
        }
        // Return jsonwebtoken
        const payload = {
            user: {
                id: user.id,
                role: user.accesscontrol
            }
        }
        // Sign payload
        jwt.sign(payload, config.get('jwtSolverSecret'), {expiresIn:(360000)}, (err, token) => {
            if(err) throw err;
            res.json({token})
        })
    } catch(err) {
        console.error(err.message);
        res.status(500).send('server error')
    }
})


module.exports = router;