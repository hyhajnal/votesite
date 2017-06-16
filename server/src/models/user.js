
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
  accountId: String,
  name: String ,
  desc: String,
  psd: String ,
  isfollow: Boolean,
  avator: {type:String, default: 'static/avator.jpg' },
  following_count: {type: Number, default: 0}, //关注用户数
  follower_count: {type: Number, default: 0}, //粉丝数
  topic_count: {type: Number, default: 0}, //关注的话题
  vote_count: {type: Number, default: 0}, //发起的投票数量
  vote_join_count: {type: Number, default: 0}, //参与的投票数量
  reply_count: {type: Number, default: 0}, //回复
  follower_count_new: {type: Number, default: 0}, //新增粉丝数
  reply_count_new: {type: Number, default: 0} //新增回复（包括在发起／参与的投票）
});

// userSchema.methods.find = async () => {
//   let userlist = await this.findOne();
//   return userlist;
// }

export default mongoose.model('User', userSchema);