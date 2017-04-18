
import mongoose from 'mongoose';
import url from 'url';
import path from 'path';
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
  _id: ObjectId ,
  name: String ,
  psd: String ,
  avator: String,
  following_count: Number, //关注用户数
  follower_count: Number, //粉丝数
  topic_count: Number, //关注的话题
  vote_count: Number, //发起的投票数量
  vote_join_count: Number, //参与的投票数量
  reply_count: Number, //回复
  follower_count_new: Number, //新增粉丝数
  reply_count_new: Number //新增回复（包括在发起／参与的投票）
});

// UserSchema.methods.find = async () => {
//   let userlist = await this.findOne();
//   return userlist;
// }

//export default mongoose.model('User', UserSchema);
export default UserSchema;