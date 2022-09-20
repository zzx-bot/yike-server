const mongoose = require('mongoose')

const db = mongoose.createConnection('mongodb://localhost:27017/yike')

db.on('error', console.error.bind(console, 'connection error:'))

db.once('open', () => {
	console.info('数据库yike 打开成功！')
})
module.exports = db
