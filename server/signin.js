const { userMatch } = require('../dao/dbserver')

// 用户登录
exports.signIn = function (req, res) {
	let { account, password } = req.body
	userMatch(account, password, res)
}
