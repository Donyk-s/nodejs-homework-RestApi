
const nodemailer = require('nodemailer');
require('dotenv').config();


function sendEmail(message) {
    const transport = nodemailer.createTransport({
         host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASSWORD 
    }
    })

    message["from"] = "donyksergey@meta.ua"
    return transport.sendMail(message)
}
module.exports = sendEmail

