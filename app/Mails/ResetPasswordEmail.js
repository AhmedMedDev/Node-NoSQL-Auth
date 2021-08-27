const ejs = require('ejs');
const path = require("path");
const MailServiceProvider = require("../Providers/MailServiceProvider");


class ResetPasswordEmail
{
    constructor (data) 
    {
        this.user = data.user

        this.pincode = data.pincode
    }

    async send () 
    {
        const view = path.join('resources','mails','ResetPasswordEmail.ejs');

        const data = {user:this.user, pincode : this.pincode}

        MailServiceProvider.build({
            to: this.user.email, 
            subject: "Reset Password ✔", 
            html: await ejs.renderFile(view, data), 
        })

    }
}

module.exports = ResetPasswordEmail