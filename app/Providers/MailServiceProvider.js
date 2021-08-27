require('dotenv').config();

const nodemailer = require("nodemailer");

class MailServiceProvider {
    static async build(data) {
            
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD,
            },
        });

        data['from'] = `"Fred Foo 👻" <${process.env.MAIL_FROM_ADDRESS}>`;

        let response = await transporter.sendMail(data);
        
    }

}

module.exports = MailServiceProvider