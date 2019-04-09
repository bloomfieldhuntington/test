// login.js
// Developer:   Benjamin Opsal
// Owner:       
// Desciption:  Rules for validation, See 'validate git' for ref.

const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};

    // Checking data type. Must be string for Validator
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    if(!Validator.isEmail(data.email)) {
        errors.email = 'Invalid email';
    }
    if(Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    }
    if(Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}

