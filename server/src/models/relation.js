import mongoose from 'mongoose';
const Schema = mongoose.Schema; 
const ObjectId = Schema.ObjectId;

//用于消息推送，以及查询
const Relation = new Schema({
  _id: ObjectId,
  type: String, //关联类型：用户(user)、参与的投票(vote_join)、话题(tag)
  firstId: {type: ObjectId, ref: 'user'}, //主动方
  secondId: ObjectId, //被动方
  isread: Boolean //标记是否已读
});

export default Relation;