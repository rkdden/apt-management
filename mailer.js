var mailer = require('nodemailer');

var mailSender = {
    sendGmail: function(param) {
        var transporter = mailer.createTransport({
            service: "Gmail",
            auth: {
                user: "sadang.nodejs@gmail.com",
                pass: process.env.EMAIL_PASSWORD
            }
        });

        var mailOptions = {
            from: "sadang.nodejs@gmail.com",
            to: param.toEmail,
            subject: param.subject,
            text: param.text
        };

        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Email sent: " + info.response);
            }
        });
    }
};

module.exports = mailSender;

