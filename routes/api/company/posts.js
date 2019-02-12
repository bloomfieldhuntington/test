// posts.js
// desciption: Jobs/posts created by companies
// developer: Benjamin Opsal
// owner: Stuckcoder AS

// MARK: IMPORTS
const express = require('express');

// MARK: ROUTER
const router = express.Router();

// MARK: ROUTES

// ROUTE: api/company/posts/test
// DESCRIPTION: Test route
// ACCESS: PUBLIC
// TYPE: GET
router.get('/test', (req, res) => res.json({message: "c_post OK"}));

module.exports = router;