const nodemailer = require("nodemailer");

module.exports = async (email, subject, text) => {
	try {
		const transporter = nodemailer.createTransport({
			host: 'smtp.gmail.com',
			service: "Gmail",
			port: 465,
			secure: true,
			auth: {
				user: 'coura249@gmail.com',
				pass: 'zknvvfhlhltzbhav',
			},
		});

		await transporter.sendMail({
			from: 'coura249@gmail.com',
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