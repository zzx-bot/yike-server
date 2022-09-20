const jwt = require('jsonwebtoken')
const signKey = 'YIKE_APP'
const expiresIn = 60 * 60 * 24 * 7
// 生成token
exports.setToken = (username, email) => {
	return new Promise((resolve, reject) => {
		const token = jwt.sign({ username, email }, signKey, { expiresIn: expiresIn })

		resolve(token)
	})
}

// 解析token
exports.verToken = token => {
	return new Promise((resolve, reject) => {
		jwt.verify(token, signKey, (err, result) => {
			if (err) {
				console.log(err)
				reject(err)
			} else {
				resolve(result)
			}
		})
	})
}
