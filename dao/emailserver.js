const nodermailer = require('nodemailer')
const credentials = require('../config/credentials')

var transporter = nodermailer.createTransport({
	service: '163',
	auth: {
		user: credentials.wangyi.user,
		pass: credentials.wangyi.pass,
	},
})

exports.emailSignUp = (email, res) => {
	let options = {
		from: 'zx_zhao_seven@163.com',
		to: email,
		subject: '感谢您在yike注册',
		html: '<span>yike 欢迎您的加入！</span><a href="http://localhist:8080/">点击<a/>',
	}
	//发送邮件
	transporter.sendMail(options, function (err, msg) {
		if (err) {
			res.send(err)
			console.log('err', err)
		} else {
			res.send(`${email} 邮件发送成功!`)
			console.log(`${email} 邮件发送成功!`)
		}
	})
}
