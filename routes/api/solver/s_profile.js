// s_profile.js
// description: solver profile routes
// StuckCoder Development Team

// MARK:- IMPORTS
const express = require('express');
const auth = require('../../../middleware/s_auth');
const { check, validationResult } = require('express-validator');
// User Models
const S_profile = require('../../../models/solver/S_profile');
const S_user = require('../../../models/solver/S_user');

// MARK:- ROUTER
const router = express.Router();


// MARK:- ROUTES

// ROUTE: api/s_profile/all
// DESCRIPTION: Get all solver profiles
// ACCESS: PRIVATE
// TYPE: GET
router.get('/all', auth, async (req, res) => {
    try{
        let allProfiles = await S_profile.find().populate('user', ['name']);
        
        if(!allProfiles) {
            return res.status(400).json({msg: 'No profiles found'});
        }
        res.json(allProfiles);

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

})


// ROUTE: api/s_profile/profile
// DESCRIPTION: Get "my" solver profile
// ACCESS: PRIVATE
// TYPE: GET
router.get('/profile', auth, async (req, res) => {
    try{
        const profile = await S_profile.findOne({ user: req.user.id }).populate('user', ['name']);

        // Check for not profile
        if(!profile){
            return res.status(400).json({msg: 'No Solver Profile Found'});
        }

        res.json(profile)

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }

})

// ROUTE: api/s_profile/profile
// DESCRIPTION: Create OR Update solver profile
// ACCESS: PRIVATE
// TYPE: POST
router.post('/profile', [auth, [
    check('website', 'Please enter a valid url').isURL()
]], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    // Get fields
    const { company, website, country, bio } = req.body;
    // Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    // Check if field exist before sending
    if(company) profileFields.company = company;
    if(website) profileFields.website = website;
    if(country) profileFields.country = country;
    if(bio) profileFields.bio = bio;

    try{
        let profile = await S_profile.findOne({user: req.user.id });

        // If profile then update, else create
        if(profile){
            // Update
            profile = await S_profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields },
                { new: true }
            );
            return res.json(profile);
        }
        // Create
        profile = new S_profile(profileFields);

        await profile.save();
        res.send(profile);

    } catch(err){
        console.error(err.message);
        res.status(500).send('Server Error: s_profile.js')
    }

})

// ROUTE: api/s_profile/profile/:user_id
// DESCRIPTION: Get profile by user_id
// ACCESS: PRIVATE
// TYPE: GET
router.get('/profile/:user_id', auth, async (req, res) => {
    try {
        let profile = await S_profile.findOne({ user: req.params.user_id });
        if(!profile){
            return res.status(400).json({msg: 'No profile found'});
        }
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        if(err.kind == 'ObjectId'){
            return res.status(400).json({msg: 'No profile found'});
        }
        res.status(500).send('Server Error');
    }
})

// ROUTE: api/s_profile/
// DESCRIPTION: Delete Profile & User
// ACCESS: PRIVATE
// TYPE: !! DELETE !!
router.delete('/', auth, async (req, res) => {
    try {
        await S_profile.findOneAndRemove({user: req.user.id});
        await S_user.findOneAndRemove({_id: req.user.id});

        res.json({msg: 'Profile and user removed'});
        
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
        
    }
})


module.exports = router;