const mongoose = require('mongoose')
const db = require('../config/db')

const Schema = mongoose.Schema

// 用户表
const UserSchema = new Schema({
	name: { type: String },
	password: { type: String },
	email: { type: String },
	avatarUrl: { type: String, default: 'default.png' },
	gender: { type: String, default: 'unknown', enum: ['male', 'female', 'unknown'] },
	birthday: { type: String },
	phone: { type: Number },
	registerTime: { type: Date },
	sign: { type: String },
})

// 好友表
const FriendSchema = new Schema({
	userId: { type: Schema.Types.ObjectId, ref: 'User' },
	friendId: { type: Schema.Types.ObjectId, ref: 'User' },
	friendName: { type: String },
	createdTime: { type: Date },
	status: { type: String }, //好友状态为0：好友  1：user 本人申请中  2：被申请未同意
})
// 好友消息表
const MessageSchema = new Schema({
	userId: { type: Schema.Types.ObjectId, ref: 'User' },
	friendId: { type: Schema.Types.ObjectId, ref: 'User' },
	msg: { type: String },
	msgType: { type: String }, //type 0：文字， 1：图片， 2视频， 3其他
	sendTime: { type: Date },
	msgStatus: { type: Number },
})
// 群表
const GroupSchema = new Schema({
	userId: { type: Schema.Types.ObjectId, ref: 'User' },
	groupName: { type: String },
	groupAvatar: { type: String, default: 'group.png' },
	creatTime: { type: Date },
	notice: { type: String }, //公告
})

// 群成员表
const GroupMemberSchema = new Schema({
	groupId: { type: Schema.Types.ObjectId, ref: 'Group' },
	userId: { type: Schema.Types.ObjectId, ref: 'User' },
	nameInGroup: { type: String },
	tipNum: { type: String },
	joinTime: { type: Date },
	shield: { type: Number }, //是否屏蔽群消息
})

// 群消息表
const GroupMsgSchema = new Schema({
	groupId: { type: Schema.Types.ObjectId, ref: 'User' },
	userId: { type: Schema.Types.ObjectId, ref: 'User' },

	msg: { type: Date },
	msgType: { type: String },
	sendTime: { type: Date },
})

module.exports = db.model('User', UserSchema)
module.exports = db.model('Friend', FriendSchema)
module.exports = db.model('Message', MessageSchema)
module.exports = db.model('Group', GroupSchema)
module.exports = db.model('GroupMember', GroupMemberSchema)
module.exports = db.model('GroupMsgS', GroupMsgSchema)
