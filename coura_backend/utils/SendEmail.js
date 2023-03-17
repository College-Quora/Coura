const nodemailer = require("nodemailer");

module.exports = async (email, subject, text) => {
	try {
		const transporter = nodemailer.createTransport({
			host: 'smtp.gmail.com',
			service: "Gmail",
			port: 465,
			secure: true,
			auth: {
				user: 'ayushigupta931@gmail.com',
				pass: 'lujvrzocbwhtcxtl',
			},
		});

		await transporter.sendMail({
			from: 'ayushigupta931@gmail.com',
			to: email,
			subject: subject,
			text: text,
		});
		console.log("Email sent successfully!");
	} catch (error) {
		console.log("Email not sent!");
		console.log(error);
		return error;
	}
};