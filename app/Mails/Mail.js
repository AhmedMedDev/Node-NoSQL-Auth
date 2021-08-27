require('dotenv').config();

const nodemailer = require("nodemailer");

class Mailer 
{
    static async build (data) {

        let transporter = nodemailer.createTransport({
            service: process.env.MAIL_SERVICE,
            auth: {
              user: process.env.MAIL_USERNAME, 
              pass: process.env.MAIL_PASSWORD, 
            },
        });

        data['from'] = `"Fred Foo 👻" <${process.env.MAIL_FROM_ADDRESS}>`;

        let info = await transporter.sendMail(data);
        
        console.log(info);
    }
}

module.exports = Mailer
