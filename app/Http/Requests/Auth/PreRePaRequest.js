const { body } = require('express-validator');

class PreRePaRequest
{
    static roles () {
        return [
            // email roles
            body('email')
            .isEmail()
            .withMessage('must be an email'),
        ]
    }
}

module.exports = PreRePaRequest.roles()