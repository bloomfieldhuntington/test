// c_profile.js
// desciption: company profile
// developer: StuckCoder Devteam
// owner: Stuckcoder AS

// MARK: IMPORTS
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const validateProfileInput = require('../../../validation/businessprofile');

// MARK: ROUTER
const router = express.Router();

// MARK: MODELS
// Company Profile
const C_profile = require('../../../models/company/C_profile');
// Company User
const C_user = require('../../../models/company/C_user');

// MARK: ROUTES

// ROUTE: api/company/c_profile/test
// DESCRIPTION: Test route
// ACCESS: PUBLIC
// TYPE: GET
router.get('/test', (req, res) => res.json({message: "c_profile OK"}));

// ROUTE: api/company/c_profile/all
// DESCRIPTION: Get all business profiles
// ACCESS: !! PRIVATE !!
// TYPE: GET
router.get('/all', passport.authenticate('jwt', {session: false}), (req, res) => {
    const errors = {};
    const unauthorizedUser = req.user.iscompany;

    if(unauthorizedUser == false) {
        errors.unauthorized = 'Unauthorized';
        return res.status(401).json(errors)
    } else {
        C_profile.find()
        .populate('user', ['name', 'avatar'])
        .then(profiles => {
            if(!profiles) {
                errors.noprofiles = 'There are no business profiles';
                return res.status(404).json(errors);
            }
            res.json(profiles);
        })
        .catch(err => res.status(404).json({profiles: 'There are no business-profiles'}))
    }
})

// ROUTE: api/company/c_profile
// DESCRIPTION: company profile route
// ACCESS: !! PRIVATE !!
// TYPE: GET
router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    const errors = {};
    const unauthorizedUser = req.user.iscompany;

    if(unauthorizedUser == false) {
        errors.unauthorized = 'Unauthorized';
        return res.status(401).json(errors)
    } else {
        console.log('Access Granted')
        C_profile.findOne({ user: req.user.id })
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

// ROUTE: api/company/c_profile
// DESCRIPTION: create OR update company profile
// ACCESS: !! PRIVATE !!
// TYPE: POST
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {

    const errors = {};
    const unauthorizedUser = req.user.iscompany;

    if(unauthorizedUser == false) {
        errors.unauthorized = "Unauthorized";
        return res.status(401).json(errors)
    } else {

        // Validation
        const {errors, isValid} = validateProfileInput(req.body);
        if(!isValid) {
            // Return errors
            return res.status(400).json(errors);
        }

        const profileFields = {};
        profileFields.user = req.user.id;
        if(req.body.company) profileFields.company = req.body.company;
        if(req.body.phone) profileFields.phone = req.body.phone;
        if(req.body.country) profileFields.country = req.body.country;
        if(req.body.website) profileFields.website = req.body.website;
        if(req.body.avatar) profileFields.avatar = req.body.avatar;

        C_profile.findOne({user: req.user.id})
        .then(profile => {
            if(profile) {
                // UPDATE
                C_profile.findOneAndUpdate(
                    {user: req.user.id},
                    {$set: profileFields},
                    {new: true}
                )
                .then(profile => res.json(profile));
            } else {
                // CREATE

                // Check if company name exist
                C_profile.findOne({company: profileFields.company})
                .then(profile => {
                    if(profile) {
                        errors.company = "Company name already in use! Contact us for help";
                        res.status(400).json(errors);
                    }
                    // Save new profile
                    new C_profile(profileFields).save().then(profile => res.json(profile));
                })
            }
        })
    }


})

// ROUTE: api/company/c_profile/company/:company
// DESCRIPTION: Get profile by company
// ACCESS: !! PRIVATE !!
// TYPE: GET
router.get('/company/:company', passport.authenticate('jwt', {session: false}), (req, res) => {

    const errors = {};
    const unauthorizedUser = req.user.iscompany;

    if(unauthorizedUser == false) {
        errors.unauthorized = 'Unauthorized';
        return res.status(401).json(errors)
    } else {
        C_profile.findOne({company: req.params.company})
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if(!profile) {
                errors.noprofile = 'There is no profile for this user';
                res.status(404).json(errors);
            }
            res.json(profile)
        })
        .catch(err => res.status(404).json(err));
    }
})

// ROUTE: api/company/c_profile/user/:user_id
// DESCRIPTION: Get profile by user_id
// ACCESS: !! PRIVATE !!
// TYPE: GET
router.get('/user/:user_id', passport.authenticate('jwt', {session: false}), (req, res) => {

    const errors = {};
    const unauthorizedUser = req.user.iscompany;

    if(unauthorizedUser == false) {
        errors.unauthorized = 'Unauthorized';
        return res.status(401).json(errors)
    } else {
        C_profile.findOne({user: req.params.user_id})
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if(!profile) {
                errors.noprofile = 'There is no profile for this user';
                res.status(404).json(errors);
            }
            res.json(profile)
        })
        .catch(err => res.status(404).json(err));
    }
})

// ROUTE: api/company/c_profile/
// DESCRIPTION: Delete user & profile
// ACCESS: !! PRIVATE !!
// TYPE: DELETE
router.delete('/', passport.authenticate('jwt', {session: false}), (req, res) => {

    const errors = {};
    const unauthorizedUser = req.user.iscompany;

    if(unauthorizedUser == false) {
        errors.unauthorized = 'Unauthorized';
        return res.status(401).json(errors);
    } else {
        C_profile.findOneAndRemove({user: req.user.id})
        .then(() => {
            C_user.findOneAndRemove({_id: req.user.id})
            .then(() => res.json({success: true}))
        })
    }
})


module.exports = router;