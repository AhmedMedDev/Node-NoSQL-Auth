const ResetPasswordEmail = require("../Mails/ResetPasswordEmail");
const ResetPassword = require("../Models/ResetPassword");


class ResetPassObserver
{
    createPincode ({user, pincode}) 
    {
        let resetPasswordEmail =  new ResetPasswordEmail({user, pincode})

        resetPasswordEmail.send();
    }

    async resetPassword (data) 
    {
       await ResetPassword.deleteMany({email: data.email})
    }
}

module.exports = new ResetPassObserver