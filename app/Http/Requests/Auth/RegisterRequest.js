const { body }                  = require('express-validator');
const { isExistEmail }          = require('../../../Helpers/Validation/authCustom');
const { optionalImage  }        = require('../../../Helpers/Validation/common');

class RegisterRequest
{
    static roles () {
        return [
            // Name roles
            body('name')
            .isLength({ min: 5 })
            .withMessage('must be at least 5 chars long'),
            // Email roles
            body('email')
            .isEmail()
            .withMessage('must be an email')
            .custom( email => isExistEmail (email) ),
            // Image roles
            body('img')
            .custom ((value , {req}) => optionalImage (req))
            .withMessage('must be an image with jpeg , png , gif'),
            // Password roles
            body('password')
            .notEmpty()
            .withMessage('must be not empty')
            .isLength({ min: 5 })
            .withMessage('must be at least 5 chars long'),
            // password_confirmation roles
            body('password_confirmation')
            .notEmpty()
            .withMessage('must be not empty')
            .custom ((value , {req}) => value == req.body.password )
        ]
    }
}

module.exports = RegisterRequest.roles()