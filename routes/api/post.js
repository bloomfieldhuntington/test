// post.js
// description: Post routes for new projects. Should be refactored
// StuckCoder Development Team

// MARK:- IMPORTS
const express = require('express');
const c_auth = require('../../middleware/c_auth');
const s_auth = require('../../middleware/s_auth');
const { check, validationResult } = require('express-validator');
// User models
const A_post = require('../../models/A_post');

// MARK:- ROUTER
const router = express.Router();

// MARK:- ROUTES



// ROUTE: api/a_post
// DESCRIPTION: Create a post
// ACCESS: PRIVATE
// TYPE: POST
router.post('/', [c_auth, [
    check('title', 'Please enter a project title').not().isEmpty(),
    check('description', 'Please enter a discription for you project').not().isEmpty(),
    check('budget', 'Please enter a budget (NOK)').isCurrency(['NOK'])
]], async (req, res) => {
    // Check to errors
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array() });
    }

    // Get fields from request and save to const
    const {
        title, category, description, skills, deadline, budget,
        fastestsolution, bestsolution
    } = req.body;

    // Create post filds object
    const postFields = {};
    postFields.user = req.user.id;

    // Check which fields exist before sending
    if(title) postFields.title = title;
    if(category) postFields.category = category;
    if(description) postFields.description = description;
    if(skills) postFields.skills = skills;
    if(deadline) postFields.deadline = deadline;
    if(budget) postFields.budget = budget;
    if(fastestsolution) postFields.fastestsolution = fastestsolution;
    if(bestsolution) postFields.bestsolution = bestsolution;

    try {
        let post = new A_post(postFields);

        await post.save();
        res.send(post);
        
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
})

// ROUTE: api/a_post/active
// DESCRIPTION: Get my posts (Active posts)
// ACCESS: PRIVATE
// TYPE: GET
router.get('/active', c_auth, async (req, res) => {
    try {
        const posts = await A_post.find({ user: req.user.id });
        
        // Check if there are posts
        if(!posts){
            return res.status(400).json({msg: 'No Posts Found'});
        }
        res.json(posts);
        
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
})

// ROUTE: api/a_post/all
// DESCRIPTION: Get all posts
// ACCESS: PRIVATE (s_users only)
// TYPE: GET
router.get('/all', s_auth, async (req, res) => {
    try {
        const allPosts = await A_post.find();

        if(!allPosts){
            return res.status(400).json({msg: 'No Posts Found'});
        }
        res.json(allPosts);
        
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
})

// ROUTE: api/a_post/:id
// DESCRIPTION: Get post by id
// ACCESS: PRIVATE s_users only
// TYPE: GET
router.get('/:id', s_auth, async (req, res) => {
    try {
        const post = await A_post.findOne({_id: req.params.id});
        if(!post){
            return res.status(400).json({msg: 'No post found'});
        }
        res.json(post)
        
    } catch (err) {
        console.log(err.message);
        if(err.kind == 'ObjectId'){
            return res.status(400).json({msg: 'No post found'});
        }
        res.status(500).send('Server Error');
    }
})

// ROUTE: api/a_post/:id
// DESCRIPTION: Get post by id
// ACCESS: PRIVATE c_users Only
// TYPE: DELETE
router.delete('/:id', c_auth, async (req, res) => {
    try {
        const post = await A_post.findOne({_id: req.params.id});

        if(post.user != req.user.id){
            return res.status(400).json({msg: 'No match found'});
        }
        await A_post.findOneAndRemove({_id: req.params.id});
        res.json({msg: 'Post removed'})



    } catch (err) {
        console.log(err.message);
        res.status(500).send({msg: 'Server Error'});
    }
})



module.exports = router;