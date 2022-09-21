const dbserver = require('../dao/dbserver')

const emailServer = require('../dao/emailserver')
const { searchGroup, searchUser, isGroupMember, isFriend } = require('../server/search')
const { signIn } = require('../server/signin')
const { signUp, judgeVaild } = require('../server/signup')
module.exports = app => {
	app.get('/test', (req, res) => {
		// dbserver.findUser(res)
		res.send('test! test!')
	})
	app.post('/mail', (req, res) => {
		let email = req.body.email
		console.log(email)
		emailServer.emailSignUp(email, res)
	})

	app.post('/signup/adduser', (req, res) => {
		// console.log('/signup/adduser', req)
		signUp(req, res)
	})

	// 用户或邮箱是否被占用
	app.post('/signup/judge', (req, res) => {
		judgeVaild(req, res)
	})

	// 登录页面
	// 用户登录
	app.post('/signin', (req, res) => {
		signIn(req, res)
	})

	//搜索页面

	// 搜索用户
	app.post('/search/user', (req, res) => {
		searchUser(req, res)
	})
	// 搜索群组
	app.post('/search/group', (req, res) => {
		searchGroup(req, res)
	})
	// 是否为群成员
	app.post('/search/ingroup', (req, res) => {
		isGroupMember(req, res)
	})
	// 是否为好友
	app.post('/search/isfriend', (req, res) => {
		isFriend(req, res)
	})
}
