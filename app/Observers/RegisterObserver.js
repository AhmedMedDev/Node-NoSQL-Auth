const VerifyEmail = require("../Mails/VerifyEmail");


class RegisterObserver
{
    registered (userInfo) 
    {
        const verifyEmail =  new VerifyEmail(userInfo)

        verifyEmail.send();
    }
}

module.exports = new RegisterObserver