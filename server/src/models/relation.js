const mongoose = require('mongoose');
const Schema = mongoose.Schema; 
const ObjectId = Schema.ObjectId;

/**
 * 1. user-user 关注 user
 * 2. user-vote-item 投票 vote_join
 * 3. user-vote 发起的投票 vote_lanuch
 * 4. user-topic  关注话题 topic
 */
const relationSchema = new Schema({
  type: { type: String,required: true }, 
  userId: { type: ObjectId, required: true },
  otherId: { type: ObjectId, required: true },
  extra: Number, //暂时为vote_item_idx
  isread: { type: Boolean, default:false } //标记是否已读
});

export default mongoose.model('Relation', relationSchema);