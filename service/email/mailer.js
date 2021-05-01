const mailer = require('nodemailer');
const logger = require('../../config/winston')('mailer');
const mailSender = {
	sendGmail: function(param) {
		const transporter = mailer.createTransport({
			service: "Gmail",
			auth: {
				user: "sadang.nodejs@gmail.com",
				pass: process.env.EMAIL_PASSWORD,
			}
		});

		const mailOptions = {
			from: "sadang.nodejs@gmail.com",
			to: param.toEmail,
			subject: param.subject,
			text: param.text,
			attachments: [
				{
					filename: `${param.name}.png`,
					path: `${__dirname}/../../data/${param.month}/temp/${param.name}temp.png`
				},
				{
					filename: `${param.name}.png`,
					path: `${__dirname}/../../data/${param.month}/humi/${param.name}humi.png`
				},
				{
					filename: `${param.name}.png`,
					path: `${__dirname}/../../data/${param.month}/watt/${param.name}watt.png`
				},
			]
		};

		transporter.sendMail(mailOptions, function(error, info) {
			if (error) {
				console.error(error);
				logger.error(error);
			} else {
				console.log("Email sent: " + info.response);
			}
		});
	},

};

module.exports = mailSender;

