const { body } = require('express-validator');

class ConfirmPinRequest
{
    static roles () {
        return [
            // pincode roles
            body('pincode')
            .notEmpty()
            .withMessage('must be not empty')
        ]
    }
}

module.exports = ConfirmPinRequest.roles()