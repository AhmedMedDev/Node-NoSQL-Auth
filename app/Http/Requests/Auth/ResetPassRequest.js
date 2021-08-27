const { body } = require('express-validator');

class ResetPassRequest
{
    static roles () {
        return [
            // pincode roles
            body('pincode')
            .notEmpty()
            .withMessage('must be not empty'),
            // new Password roles
            body('newPassword')
            .isLength({ min: 5 })
            .withMessage('must be at least 5 chars long'),
            // password_confirmation roles
            body('password_confirmation')
            .custom ((value , {req}) => value == req.body.newPassword )
        ]
    }
}

module.exports = ResetPassRequest.roles()