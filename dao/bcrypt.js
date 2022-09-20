const bcrypt = require('bcryptjs')
// 生成hash密码
exports.enbcrypt = function (plaintext) {
	// 生成随机数
	const salt = bcrypt.genSaltSync(10)
	// 生成hash密码
	const hash = bcrypt.hashSync(plaintext, salt)

	return hash
}
// 解密
exports.verification = function (plaintext, password) {
	try {
		return bcrypt.compareSync(plaintext, password)
	} catch (error) {
		console.log(error)
	}
}
