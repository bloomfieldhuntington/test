// c_users.js
// desciption: c_user = company user type
// developer: Benjamin Opsal
// owner: Stuckcoder AS

// MARK: IMPORTS
const express = require('express');

// MARK: ROUTER
const router = express.Router();

// MARK: ROUTES

// ROUTE: api/company/c_users/test
// DESCRIPTION: Test route
// ACCESS: PUBLIC
// TYPE: GET
router.get('/test', (req, res) => res.json({message: "c_users OK"}));

module.exports = router;