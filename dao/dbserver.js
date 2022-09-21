const bcrypt = require('../dao/bcrypt')

const dbmodel = require('../model/dbmodel')
const { verToken, setToken } = require('./jwt')
const User = dbmodel.model('User')
const Friend = dbmodel.model('Friend')
const Group = dbmodel.model('Group')
const GroupMember = dbmodel.model('GroupMember')
// 新建用户
exports.newUser = (name, email, pwd, res) => {
	let password = bcrypt.enbcrypt(pwd)
	let data = {
		name,
		email,
		password,
		registerTime: new Date(),
	}
	let user = new User(data)

	user.save(function (err) {
		if (err) {
			res.send({ status: 500 })
		} else {
			res.send({ status: 200 })
		}
	})
}

exports.countUserValue = (data, type, res) => {
	let wherestr = {}
	wherestr[type] = data
	User.countDocuments(wherestr, (err, result) => {
		if (err) {
			res.send({ status: 500 })
		} else {
			res.send({ status: 200, result })
		}
	})
}
// 用户登录匹配
exports.userMatch = (account, password, res) => {
	let wherestr = {
		$or: [{ name: account }, { email: account }],
	}
	const out = { _id: 1, name: 1, gender: 1, avatarUrl: 1, password: 1 }
	try {
		User.find(wherestr, out, (err, result) => {
			if (err) {
				res.send({ status: 500 })
			} else {
				if (result.length === 0) {
					res.status(400).send()
				}

				result.map(item => {
					// 解密 并验证
					const passwordMatch = bcrypt.verification(password, item.password)
					console.log('bcrypt.verification', passwordMatch)

					if (passwordMatch) {
						setToken(item).then(token => {
							const back = {
								id: item._id,
								name: item.name,
								avatarUrl: item.avatarUrl,
								gender: item.gender,
								token: token,
							}
							console.log('passwordMatch', passwordMatch)

							res.status(200).send(back)
						})
					} else {
						console.log('error')
						res.status(401).send()
					}
				})
			}
		})
	} catch (error) {
		console.log(error)
	}
}

// 搜索用户
exports.searchUser = function (friendInfo, res) {
	let wherestr = {
		$or: [{ name: { $regex: friendInfo } }, { email: { $regex: friendInfo } }],
	}
	let Out = { name: 1, email: 1, avatarUrl: 1 }
	User.find(wherestr, Out, (err, result) => {
		if (err) {
			res.send({ status: 500 })
		} else {
			res.send({ status: 200, result })
		}
	})
}

// 判断是否为好友
exports.isFriend = function (uid, fid, res) {
	Friend.findOne({ userId: uid, friendId: fid, status: 0 }, (err, result) => {
		console.log(err, result)
		if (err) {
			res.send({ status: 500 })
		} else {
			res.send({ status: 200 })
		}
	})
}

// 搜索群信息
exports.searchGroup = function (groupName, res) {
	let wherestr = {
		groupName: { $regex: groupName },
	}
	let Out = { groupName: 1, groupAvatar: 1 }
	Group.find(wherestr, Out, (err, result) => {
		if (err) {
			res.send({ status: 500 })
		} else {
			res.send({ status: 200, result })
		}
	})
}

// 判断是否是群成员
exports.isGroupMember = function (uid, gid, res) {
	GroupMember.findOne({ userId: uid, groupId: gid }, (err, result) => {
		if (err) {
			res.status(500)
		} else {
			res.status(200)
		}
	})
}

// 获取用户信息
exports.UserDetail = function (uid, res) {
	let out = { password: 0 }
	GroupMember.findOne({ userId: uid }, out, (err, result) => {
		if (err) {
			res.send({ status: 500 })
		} else {
			res.send({ status: 200, result })
		}
	})
}
