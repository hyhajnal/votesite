const mongoose = require('mongoose');
const Schema = mongoose.Schema; 
const ObjectId = Schema.ObjectId;

/**
 * 1. user-user 关注 user
 * 2. user-vote-item 投票 vote_join
 * 3. user-vote 发起的投票 vote_lanuch
 * 4. user-topic  关注话题 topic
 */
const msgSchema = new Schema({
  content: { type: String,required: true }, 
  userId: { type: ObjectId, required: true, ref: 'User'},
  type: String,
  time: { type: Date, default: new Date()},
  linkId: Object,
  isread: { type: Boolean, default:false } //标记是否已读
});

export default mongoose.model('Msg', msgSchema);