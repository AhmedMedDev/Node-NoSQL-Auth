const ResetPasswordEmail = require("../Mails/ResetPasswordEmail");
const ResetPassword = require("../Models/ResetPassword");


class ResetPassObserver
{
    preResetPassword (data) 
    {
        let resetPasswordEmail =  new ResetPasswordEmail({user:data.user[0], pincode: data.pincode})

        resetPasswordEmail.send();
    }

    async resetPassword (data) 
    {
       await ResetPassword.deleteMany({email: data.email})
    }
}

module.exports = new ResetPassObserver