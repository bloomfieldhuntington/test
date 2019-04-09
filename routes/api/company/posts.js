// posts.js
// desciption: Jobs/posts created by companies
// developer: Benjamin Opsal
// owner: Stuckcoder AS

// MARK: IMPORTS
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const C_post = require('../../../models/company/C_post');
const C_Profile = require('../../../models/company/C_profile');

// Validation
const validatePostInput = require('../../../validation/post');

// MARK: ROUTER
const router = express.Router();

// MARK: ROUTES

// ROUTE: api/company/posts/test
// DESCRIPTION: Test route
// ACCESS: PUBLIC
// TYPE: GET
router.get('/test', (req, res) => res.json({message: "c_post OK"}));

// ROUTE: api/company/posts/
// DESCRIPTION: Create post
// ACCESS: !! PRIVATE !!
// TYPE: POST
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {

    const errors = {};
    const unauthorizedUser = req.user.iscompany;

    if(unauthorizedUser == false) {
        errors.unauthorized = 'Unauthorized';
        return res.status(401).json(errors);
    } else {

        const {errors, isValid} = validatePostInput(req.body);
        if(!isValid) {
            return res.status(400).json(errors);
        }
        const newPost = new C_post({
            user: req.user.id,
            budget: req.body.budget,
            title: req.body.title,
            start: req.body.start,
            deadline: req.body.deadline,
            description: req.body.description,
        })
        newPost.save().then(post => res.json(post))
    }
})

// ROUTE: api/company/posts/
// DESCRIPTION: Get all posts
// ACCESS: !! PRIVATE !!
// TYPE: GET
router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {

    // CAN BE ACCESSED BY C_USER AND S_USER
    C_post.find()
    .sort({date: -1})
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({nopostsfound: 'No posts found'}))
})

// ROUTE: api/company/posts/:id
// DESCRIPTION: Get post by id
// ACCESS: !! PRIVATE !!
// TYPE: GET
router.get('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {

    // CAN BE ACCESSED BY C_USER AND S_USER
    C_post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.status(404).json({nopostfound: 'No post found with that ID'}));
})

// ROUTE: api/company/posts/:id
// DESCRIPTION: Delete post by id
// ACCESS: !! PRIVATE !!
// TYPE: DELETE
router.delete('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {

    const errors = {};
    const unauthorizedUser = req.user.iscompany;

    if(unauthorizedUser == false) {
        errors.unauthorized = 'Unauthorized';
        return res.status(401).json(errors);
    } else {
        C_Profile.findOne({user: req.user.id})
        .then(profile => {
            C_post.findById(req.params.id)
            .then(post => {
                // Check for post owner
                if(post.user.toString() != req.user.id) {
                    errors.notyourpost = 'This is not your post'
                    return res.status(401).json(errors)
                }
                // Delete
                post.remove().then(() => res.json({success: 'Post removed'}));
            })
            .catch(err => res.status(404).json({postnotfound: 'Post not found'}))
        })
    }
})

// ROUTE: api/company/posts/enroll/:id
// DESCRIPTION: Add solver to post
// ACCESS: !! PRIVATE !!
// TYPE: POST
router.post('/enroll/:id', passport.authenticate('jwt', {session: false}), (req, res) => {

    const errors = {};
    const unauthorizedUser = req.user.iscompany;

    if(unauthorizedUser == true) {
        errors.unauthorized = 'Only solvers can enroll';
        return res.status(401).json(errors);
    } else {

        // NEW LOGIC: Check for max 5 solvers in array: 
        C_post.findById(req.params.id)
        .then(post => {
            const index = post.solvers.findIndex(solver => solver.solver == req.user.id);
            if(post.solvers[4] != undefined && index === -1) {
                return res.status(400).json({maxsolversenrolled: 'There can only be 5 solvers'})
            } else if(index === -1) {
                post.solvers.push({solver: req.user.id});
                post.save().then(post => res.json(post));
            } else {
                return res.status(400).json({alreadyenrolled: 'Already enrolled'})
            }
        })
        .catch(err => res.status(404).json({error: 'No post found'}))
    }
})

// ROUTE: api/company/posts/withdraw/:id
// DESCRIPTION: Withdraw solver from post
// ACCESS: !! PRIVATE !!
// TYPE: POST
router.post('/withdraw/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    
    // !! WARNING !! BOTH S_USERS & C_USERS CAN REMOVE SOLVER FROM POSTS
    
    C_post.findById(req.params.id)
        .then(post => {
            const index = post.solvers.findIndex(solver => solver.solver == req.user.id);
            if(index > -1) {
                post.solvers.splice(index, 1)
                post.save().then(post => res.json(post))
            } else {
                console.log(index)
                console.log(post.solvers.lenght)
                return res.status(400).json({alreadyenrolled: 'You have not enrolled yet'})
            }
        })
        .catch(err => res.status(404).json({error: 'No post found'}))
})

module.exports = router;