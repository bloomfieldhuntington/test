// c_profile.js
// description: company profile routes
// StuckCoder Development Team

// MARK:- IMPORTS
const express = require('express');
const auth = require('../../../middleware/c_auth');
const { check, validationResult } = require('express-validator');
// User Models
const C_profile = require('../../../models/company/C_profile');
const C_user = require('../../../models/company/C_user');

// MARK:- ROUTER
const router = express.Router();

// MARK:- ROUTES

// ROUTE: api/c_profile/all
// DESCRIPTION: Get all company profiles
// ACCESS: PRIVATE
// TYPE: GET
router.get('/all', auth, async (req, res) => {
    try{
        let allProfiles = await C_profile.find().populate('user', ['name']);

        if(!allProfiles) {
            return res.status(400).json({msg: 'No profiles found'});
        }
        res.json(allProfiles);

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

// ROUTE: api/c_profile/profile
// DESCRIPTION: Get "my" one specific profile
// ACCESS: PRIVATE
// TYPE: GET
router.get('/profile', auth, async (req, res) => {
    try{
        const profile = await C_profile.findOne({ user: req.user.id }).populate('user', ['company']);

        // Check for not profile
        if(!profile){
            return res.status(400).json({msg: 'No Profile found'});
        }
        
        res.json(profile);

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

// ROUTE: api/c_profile/profile
// DESCRIPTION: Create OR Update company profile
// ACCESS: PRIVATE
// TYPE: POST
router.post('/profile', [auth, [
    check('company', 'Company/Enterprice is required').not().isEmpty(),
    check('phone', 'A phone-number is required').not().isEmpty(),
    check('country', 'You are required to enter a country').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    
    // Get fields
    const {company, phone, country, website} = req.body;
    // Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    // Check if field exist before sending
    if(company){
        profileFields.company = company.replace(/\s/g, '_');
    }
    // if(company) profileFields.company = company;
    if(phone) profileFields.phone = phone;
    if(country) profileFields.country = country;
    if(website) profileFields.country = website;

    try{
        let profile = await C_profile.findOne({user: req.user.id});

        // If profile then update, else create
        if(profile){
            // Update
            profile = await C_profile.findOneAndUpdate(
                { user: req.user.id},
                { $set: profileFields},
                { new: true}
            );
            return res.json(profile);
        }

        // Create
        profile = new C_profile(profileFields);

        await profile.save();
        res.send(profile);

    } catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }

})

// ROUTE: api/c_profile/:company
// DESCRIPTION: Get profile by company-name
// ACCESS: PRIVATE
// TYPE: GET
router.get('/:company', auth, async (req, res) => {
    try {
        let profile = await C_profile.findOne({ company: req.params.company });
        if(!profile){
            return res.status(400).json({ msg: 'No profile found (:company)' });
        }
        res.json(profile);
        
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
})

// ROUTE: api/c_profile/profile/:user.id
// DESCRIPTION: Get profile by user_id
// ACCESS: PRIVATE
// TYPE: GET
router.get('/profile/:user_id', auth, async (req, res) => {
    try {
        let profile = await C_profile.findOne({ user: req.params.user_id });
        if(!profile){
            return res.status(400).json({msg: 'No profile found'});
        }
        res.json(profile);
    } catch (err) {
        console.log(err.message);
        if(err.kind == 'ObjectId'){
            return res.status(400).json({msg: 'No profile found'});
        }
        res.status(500).send('Server Error');
    }
})

// ROUTE: api/c_profile/
// DESCRIPTION: Delete User & Profile
// ACCESS: PRIVATE
// TYPE: !! DELETE !!
router.delete('/', auth, async (req, res) => {
    try {
        await C_profile.findOneAndRemove({user: req.user.id});
        await C_user.findOneAndRemove({_id: req.user.id})

        res.json({msg: 'Profile and User removed'})
        
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
})

module.exports = router;