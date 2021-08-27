const VerifyEmail = require("../Mails/VerifyEmail");


class RegisterObserver
{
    registered (userInfo) 
    {
        let verifyEmail =  new VerifyEmail(userInfo)

        verifyEmail.send();
    }
}

module.exports = new RegisterObserver