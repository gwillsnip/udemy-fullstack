const Validator = require('validator');
const isEmpty = require('./is-empty');


module.exports = function validatePostInput(data) {

    let errors = {};

    //check the state of data
    data.text = !isEmpty(data.text) ? data.text : '';

    //validate the text to be sure
    if (!Validator.isLength(data.text, { min: 10, max: 300 })) {
        errors.text = 'Post must be between 10 and 300 character';
    }
    if (Validator.isEmail(data.text)) {
        errors.text = 'Text Field is invalid';
    }

    return {
        errors,
        isValid: isEmpty(errors, 'Errors found in validatePostInput')
    }

};