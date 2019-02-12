// c_profile.js
// desciption: company profile
// developer: Benjamin Opsal
// owner: Stuckcoder AS

// MARK: IMPORTS
const express = require('express');

// MARK: ROUTER
const router = express.Router();

// MARK: ROUTES

// ROUTE: api/company/c_profile/test
// DESCRIPTION: Test route
// ACCESS: PUBLIC
// TYPE: GET
router.get('/test', (req, res) => res.json({message: "c_profile OK"}));

module.exports = router;