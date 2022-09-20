const dbsever = require('../dao/dbserver')

// 用户注册
exports.signUp = (req, res) => {
	const { name, email, password } = req.body.data
	dbsever.newUser(name, email, password, res)
}

// 用户或邮箱是否被占用
exports.judgeVaild = (req, res) => {
	// console.log(req.body)
	// res.send(req.body)

	const { data, type } = req.body.data
	// res.send({ data, judgeVaild: 111 })
	dbsever.countUserValue(data, type, res)
}
