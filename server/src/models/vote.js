import mongoose from 'mongoose';
const Schema = mongoose.Schema; 
const ObjectId = Schema.ObjectId;

const VoteSchema = new Schema({
  _id: ObjectId,
  title: String,
  desc: String,
  create_time: Date,
  active_time: Date,
  tag: String,   
  view: Number, 
  msg: Number,
  follow: Number,
  user: {type: ObjectId, ref: 'user'}, //发起人
  complex: Boolean, //两种布局：带图片／纯文字
  votelist:[{
    num: Number,
    title: String,
    desc: String,
    pic: String
  }],
  comments: {type: ObjectId, ref: 'comment'}
});

//查询vote详情
VoteSchema.methods.detail = async (voteId) => {
  const vote = await this
                      .findById({ _id: voteId })
                      .populate('user')
                      .populate({
                        path: 'comment',
                        populate: { path: 'childs' }
                      });
  return vote;
}

//id = new mongoose.Schame.ObjectId()

export default VoteSchema;