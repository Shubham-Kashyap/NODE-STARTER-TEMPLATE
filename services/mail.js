const nodemailer = require('nodemailer');
const dotenv = require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_USER, // generated ethereal user
        pass: process.env.MAIL_PASSWORD, // generated ethereal password
    },


});

// send mail with defined transport object


class Mail {

    /**
     * -------------------------------------------------
     * Send mail
     * -------------------------------------------------
     * send mail to user
     */
    sendMail = async ( data) => {
        const message = await transporter.sendMail({
            from: `${process.env.MAIL_FROM}`,
            to: `${data?.email}`,
            subject: "Registration verification mail",
            html: `<b>
            hi ${data?.name}
            here is your registration link
            <a href=${data?.link}>Click Here</a>
            </b>`, // html body
        });

        console.log("Message sent: %s", message.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));
    }
}

const mailService = new Mail();
exports.sendMail = mailService.sendMail;
