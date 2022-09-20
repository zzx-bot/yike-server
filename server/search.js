const { searchUser, searchGroup, isGroupMember, isFriend } = require('../dao/dbserver')

// 搜索用户
exports.searchUser = function (req, res) {
	let { friendInfo } = req.body.data
	searchUser(friendInfo, res)
}
//搜索群组
exports.searchGroup = function (req, res) {
	let { groupName } = req.body.data
	searchGroup(groupName, res)
}

// 是否为好友
exports.isFriend = function (req, res) {
	let { uid, fid } = req.body.data
	isFriend(uid, fid, res)
}

// 是否为群成员
exports.isGroupMember = function (req, res) {
	let { uid, gid } = req.body.data
	isGroupMember(uid, gid, res)
}
