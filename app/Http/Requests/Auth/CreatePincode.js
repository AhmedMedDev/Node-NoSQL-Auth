const { body } = require('express-validator');

class CreatePincode
{
    static roles () {
        return [
            // email roles
            body('email')
            .isEmail()
            .withMessage('Must be an email'),
        ]
    }
}

module.exports = CreatePincode.roles()