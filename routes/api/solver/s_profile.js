// s_profile.js
// desciption: solver profile
// developer: StuckCoder DevTeam
// owner: Stuckcoder AS

// MARK: IMPORTS
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const validateProfileInput = require('../../../validation/profile');
const validateExperienceInput = require('../../../validation/experience');
const validateEducationInput = require('../../../validation/education');

// MARK: ROUTER
const router = express.Router();

// MARK: MODELS
// Solver Profile
const S_profile = require('../../../models/solver/S_profile');
// Solver User
const S_user = require('../../../models/solver/S_user');

// MARK: ROUTES

// ROUTE: api/solver/s_profile/test
// DESCRIPTION: Test route
// ACCESS: PUBLIC
// TYPE: GET
router.get('/test', (req, res) => res.json({message: "s_profile OK"}));

// ROUTE: api/solver/s_profile/all
// DESCRIPTION: Get all solver routes
// ACCESS: !! PRIVATE !!
// TYPE: GET
router.get('/all', passport.authenticate('jwt', {session: false}), (req, res) => {
    const errors = {};
    const unauthorizedUser = req.user.iscompany;

    if(unauthorizedUser == true) {
        errors.unauthorized = 'Unauthorized';
        return res.status(401).json(errors);
    } else {
        S_profile.find()
        .populate('user', ['name', 'avatar'])
        .then(profiles => {
            if(!profiles) {
                errors.noprofiles = 'There are no Solver-profiles';
                return res.status(404).json(errors);
            }
            res.json(profiles);
        })
        .catch(err => res.status(404).json({profiles: 'There are no profiles'}))
    }
})

// ROUTE: api/solver/s_profile
// DESCRIPTION: gets solver profile
// ACCESS: !! PRIVATE !!
// TYPE: GET
router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    const errors = {};
    const unauthorizedUser = req.user.iscompany;

    if(unauthorizedUser == true) {
        errors.unauthorized = "Unauthorized";
        return res.status(401).json(errors)
    } else {
        console.log('Access Granted')
        S_profile.findOne({user: req.user.id})
    .then(profile => {
        if(!profile) {
            errors.noprofile = 'There is no profile for this user';
            return res.status(404).json(errors)
        }
        res.json(profile);
    })
    .catch(err => res.status(404).json(err));
    }
})

// ROUTE: api/solver/s_profile
// DESCRIPTION: create OR Update solver profile
// ACCESS: !! PRIVATE !!
// TYPE: POST
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    
    const errors ={};
    const unauthorizedUser = req.user.iscompany;

    if(unauthorizedUser == true) {
        errors.unauthorized = 'Unauthorized';
        return res.status(401).json(errors)
    } else {

        // Validation
        const {errors, isValid} = validateProfileInput(req.body);
        if(!isValid) {
        // Return errors
        return res.status(400).json(errors);
    }

        const profileFields ={};
        profileFields.user = req.user.id;
        if(req.body.handle) profileFields.handle = req.body.handle;
        if(req.body.company) profileFields.company = req.body.company;
        if(req.body.website) profileFields.website = req.body.website;
        if(req.body.country) profileFields.country = req.body.country;
        // Skills - Split into array
        if(typeof req.body.skills !== 'undefined') {
            profileFields.skills = req.body.skills.split(',');
        }
        if(req.body.bio) profileFields.bio = req.body.bio;
        if(req.body.gihubusername) profileFields.githubusername = req.body.githubusername;
        
        S_profile.findOne({user: req.user.id })
        .then(profile => {
            if (profile) {
                // Update
                S_profile.findOneAndUpdate(
                    {user: req.user.id},
                    {$set: profileFields},
                    {new: true}
                )
                .then(profile => res.json(profile));
            } else {
                // Create

                // Check if handle exists
                S_profile.findOne({handle: profileFields.handle})
                .then(profile => {
                    if(profile) {
                        errors.handle = 'Handle already in use';
                        res.status(400).json(errors);
                    }
                    // Save new profile
                    new S_profile(profileFields).save().then(profile => res.json(profile));
                })
            }
        })
    }
})

// ROUTE: api/solver/s_profile/handle/:handle
// DESCRIPTION: Get profile by handle
// ACCESS: !! PRIVATE !!
// TYPE: GET
router.get('/handle/:handle', passport.authenticate('jwt', {session: false}), (req, res) => {

    const errors = {};
    const unauthorizedUser = req.user.iscompany;

    if(unauthorizedUser == true) {
        errors.unauthorized = 'Unauthorized';
        return res.status(401).json(errors)
    } else {
        S_profile.findOne({handle: req.params.handle})
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if(!profile) {
                errors.noprofile = 'There is no profile for this user';
                res.status(404).json(errors);
            }
            res.json(profile);
        })
        .catch(err => res.status(404).json(err));

    }
})

// ROUTE: api/solver/s_profile/user/:user_id
// DESCRIPTION: Get profile by user_id
// ACCESS: !! PRIVATE !!
// TYPE: GET
router.get('/user/:user_id', passport.authenticate('jwt', {session: false}), (req, res) => {

    const errors = {};
    const unauthorizedUser = req.user.iscompany;

    if(unauthorizedUser == true) {
        errors.unauthorized = 'Unauthorized';
        return res.status(401).json(errors)
    } else {
        S_profile.findOne({user: req.params.user_id})
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if(!profile) {
                errors.noprofile = 'There is no profile for this user';
                res.status(404).json(errors);
            }
            res.json(profile);
        })
        .catch(err => res.status(404).json(err))
    }
})

// ROUTE: api/solver/s_profile/experience
// DESCRIPTION: Add experience to profile
// ACCESS: !! PRIVATE !!
// TYPE: POST
router.post('/experience', passport.authenticate('jwt', {session: false}), (req, res) => {
    const errors = {};
    const unauthorizedUser = req.user.iscompany;
    if(unauthorizedUser == true) {
        errors.unauthorized = 'Unauthorized';
        return res.status(401).json(errors);
    } else {
        const {errors, isValid} = validateExperienceInput(req.body);
        // Check Validation
        if(!isValid) {
            // Return any errors with 400 status
            return res.status(400).json(errors);
        }
        S_profile.findOne({user: req.user.id})
        .then(profile => {
            const newExperience = {
                title: req.body.title,
                company: req.body.company,
                location: req.body.location,
                from: req.body.from,
                to: req.body.to,
                current: req.body.current,
                description: req.body.description
            }
            // Add to experience array
            profile.experience.unshift(newExperience);
            profile.save().then(profile => res.json(profile));
        })
    }
})

// ROUTE: api/solver/s_profile/education
// DESCRIPTION: Add education to profile
// ACCESS: !! PRIVATE !!
// TYPE: POST
router.post('/education', passport.authenticate('jwt', {session: false}), (req, res) => {
    const errors = {};
    const unauthorizedUser = req.user.iscompany;
    if(unauthorizedUser == true) {
        errors.unauthorized = 'Unauthorized';
        return res.status(401).json(errors);
    } else {
        const {errors, isValid} = validateEducationInput(req.body);
        // Check Validation
        if(!isValid) {
            // Return any errors with 400 status
            return res.status(400).json(errors);
        }
        S_profile.findOne({user: req.user.id})
        .then(profile => {
            const newEducation = {
                school: req.body.school,
                degree: req.body.degree,
                fieldofstudy: req.body.fieldofstudy,
                from: req.body.from,
                to: req.body.to,
                current: req.body.current,
                description: req.body.description
            }
            // Add to education array
            profile.education.unshift(newEducation);
            profile.save().then(profile => res.json(profile));
        })
        .catch(err => res.status(404).json(err));
    }
})

// ROUTE: api/solver/s_profile/experience/:experience_id
// DESCRIPTION: Delete experience from array
// ACCESS: !! PRIVATE !!
// TYPE: DELETE
router.delete('/experience/:experience_id', passport.authenticate('jwt', {session: false}), (req, res) => {

    const errors = {};
    const unauthorizedUser = req.user.iscompany;

    if(unauthorizedUser == true) {
        errors.unauthorized = 'Unauthorized';
        return res.status(401).json(errors);
    } else {

        S_profile.findOne({user: req.user.id})
        .then(profile => {
            // Splice out of array
            profile.experience.remove({_id: req.params.experience_id})
            // Save
            profile.save()
            .then(profile => res.json(profile))
            .catch(err => res.status(404).json({error: 'Invalid experience_id'}));
        })
        .catch(err => res.status(404).json({error: 'Ops! error 290'}))
    }
})

// ROUTE: api/solver/s_profile/education/:education_id
// DESCRIPTION: Delete education from array
// ACCESS: !! PRIVATE !!
// TYPE: DELETE
router.delete('/education/:education_id', passport.authenticate('jwt', {session: false}), (req, res) => {

    const errors = {};
    const unauthorizedUser = req.user.iscompany;

    if(unauthorizedUser == true) {
        errors.unauthorized = 'Unauthorized';
        return res.status(401).json(errors);
    } else {
        S_profile.findOne({user: req.user.id})
        .then(profile => {
            
            // Splice out of array
            profile.education.remove({_id: req.params.education_id})
            // Save
            profile.save()
            .then(profile => res.json(profile))
            .catch(err => res.status(404).json({error: 'Invalid education_id'}));
        })
        .catch(err => res.status(404).json({error: 'Ops! error 315'}))
    }
})

// ROUTE: api/solver/s_profile
// DESCRIPTION: Delete user & profile
// ACCESS: !! PRIVATE !!
// TYPE: DELETE
router.delete('/', passport.authenticate('jwt', {session: false}), (req, res) => {

    const errors = {};
    const unauthorizedUser = req.user.iscompany;

    if(unauthorizedUser == true) {
        errors.unauthorized = 'Unauthorized';
        return res.status(401).json(errors);
    } else {
        S_profile.findOneAndRemove({user: req.user.id})
        .then(() => {
            S_user.findOneAndRemove({_id: req.user.id})
            .then(() => res.json({success: true}))
        })
    }
})

module.exports = router;