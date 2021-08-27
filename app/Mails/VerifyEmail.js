require('dotenv').config();

const ejs = require('ejs');
const path = require("path");
const MailServiceProvider = require("../Providers/MailServiceProvider");

class VerifyEmail
{
    constructor (user) 
    {
        this.user = user
    }

    async send () 
    {
        const view = path.join('resources','mails','VerifyEmail.ejs');

        MailServiceProvider.build({
            to: this.user.email, 
            subject: "Verify Email ✔", 
            html: await ejs.renderFile(view, { 
                user:this.user,
                emailVerify_url : `${process.env.APP_URL}/api/v1/auth/emailVerification/${this.user.verify_code}`
            }), 
        })
    }
}

module.exports = VerifyEmail