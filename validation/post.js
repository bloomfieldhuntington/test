// post.js
// Developer:   Benjamin Opsal
// Owner:       
// Desciption:  Rules for validation, See 'validate git' for ref.

const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePostInput(data) {
    let errors = {};

    // Checking data type. Must be string for Validator
    data.description = !isEmpty(data.description) ? data.description : '';
    data.budget = !isEmpty(data.budget) ? data.budget : '';
    data.title = !isEmpty(data.title) ? data.title : '';
    data.deadline = !isEmpty(data.deadline) ? data.deadline : '';

    if(!Validator.isLength(data.description, { min: 10, max: 1000 })) {
        errors.description = 'Post must be between 10 and 500 characters';
    }

    if(Validator.isEmpty(data.description)) {
        errors.description = 'Description field is required';
    }
    if(Validator.isEmpty(data.budget)) {
        errors.budget = 'Budget field is required';
    }
    if(Validator.isEmpty(data.title)) {
        errors.title = 'Title field is required';
    }
    if(Validator.isEmpty(data.deadline)) {
        errors.deadline = 'Deadline field is required: yyyy-mm-dd';
    }

    
    return {
        errors,
        isValid: isEmpty(errors)
    }
}
