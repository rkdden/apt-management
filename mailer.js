const mailer = require('nodemailer');

const mailSender = {
	sendGmail: function(param) {
		const transporter = mailer.createTransport({
			service: "Gmail",
			auth: {
				user: "sadang.nodejs@gmail.com",
				pass: "nodejs1234!"
			}
		});

		const mailOptions = {
			from: "sadang.nodejs@gmail.com",
			to: param.toEmail,
			subject: param.subject,
			text: param.text,
			attachments: [
				{
					filename: param.name + "_temp.png",
					path: __dirname + '/data/' + param.month + "/" + param.name + "_temp.png"
				},
				{
					filename: param.name + "_humi.png",
					path: __dirname + '/data/' + param.month + "/" + param.name + "_humi.png"
				},
				{
					filename: param.name + "_watt.png",
					path: __dirname + '/data/' + param.month + "/" + param.name + "_watt.png"
				},
			]
		};

		transporter.sendMail(mailOptions, function(error, info) {
			if (error) {
				console.log(error);
			} else {
				console.log("Email sent: " + info.response);
			}
		});
	},

	setFileName: function(param) {
		console.log(param);
	},
};

module.exports = mailSender;

