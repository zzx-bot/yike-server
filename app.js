const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const token = require('./dao/jwt')

// var debug = require('debug')('my-application') // debug模块
const app = express()
const port = 3030
require('./router/index.js')(app)
app.use(cors())
app.use(bodyParser.json())

app.use((req, res, next) => {
	console.log('test')
	next()
})

app.use(function (req, res, next) {
	const URL = req.url
	console.log('URL', URL)
	if (URL === '/signin') {
		// 登录接口无需校验
		return next()
	}

	// 获取token值
	const authorization = req.headers['authorization']
	console.log('authorization', authorization)
	if (authorization === 'undefined') {
		return res.status(401).send('Unauthorized')
	} else {
		// 验证token
		token
			.verToken(authorization)
			.then(data => {
				req.data = data
				return next()
			})
			.catch(error => {
				return res.status(401).send('Unauthorized')
			})
	}
})

app.use((req, res, next) => {
	let err = new Error('Not Found')
	err.status = 404
	next(err)
})
app.use((err, req, res, next) => {
	res.status(err.status || 500)
	res.send(err.message)
	next()
})
app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})

// app.use('/signin', (req, res) => {
// 	token.setToken(req.body.username, req.body.email).then(token => {
// 		res.status(200).send({
// 			token: token,
// 		})
// 	})
// })
app.use(function (err, req, res, next) {
	console.error(err.stack)
	res.send(500, 'Something broke!')
	next()
})
