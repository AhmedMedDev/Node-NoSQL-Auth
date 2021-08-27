const { body } = require('express-validator');

class LoginRequest
{
    static roles () {
        return [
            // email roles
            body('email')
            .isEmail()
            .withMessage('must be an email'),
            // password roles
            body('password')
            .notEmpty()
            .withMessage('must be not empty')
        ]
    }
}

module.exports = LoginRequest.roles()