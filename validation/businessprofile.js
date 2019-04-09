// businessprofile.js
// Developer:   StuckCoder dev team
// Owner:       
// Desciption:  Checks if anything is empty

const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
    let errors = {};

    // Checking data type. Must be string for Validator. Will be set to empty string if null or undefined.
    data.company = !isEmpty(data.company) ? data.company : '';
    data.phone = !isEmpty(data.phone) ? data.phone : '';
    data.country = !isEmpty(data.country) ? data.country : '';

    if(!Validator.isLength(data.company, { min: 2, max: 40})) {
        errors.company = 'Company needs to be between 2 and 4 characters';
    }
    if(Validator.isEmpty(data.company)) {
        errors.company = 'Profile company is required';
    }
    if(Validator.isEmpty(data.phone)) {
        errors.phone = 'Phone field is required';
    }
    if(Validator.isEmpty(data.country)) {
        errors.country = 'Country field is required';
    }

    // Checking for and making it URL
    if(!isEmpty(data.website)) {
        if(!Validator.isURL(data.website)) {
            errors.website = 'Not a valid URL';
        }
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}
