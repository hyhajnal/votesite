import mongoose from 'mongoose';
const Schema = mongoose.Schema; 
const ObjectId = Schema.ObjectId;

const voteSchema = new Schema({
  title: String,
  desc: String,
  create_time: Date, // 投票创建日期
  end_time: Date,   // 投票截止日期
  active_time: Date,
  tag: String,   
  view: Number, 
  msg: Number,
  follow: Number,
  is_voted: Number,
  user: {type: ObjectId, ref: 'User'}, //发起人
  complex: Boolean, //两种布局：带图片／纯文字
  round: {type: Number, default: 1}, // 当前进行至第几轮投票了
  multi: Number, //多轮投票（此轮投票需要选出前几名）－1单轮投票（不排名仅做展示）
  votelist: Array, // 多轮投票，票数加一个字段
  comments: [{type: ObjectId, ref: 'Comment'}]
});

//查询vote详情
voteSchema.statics.detail = async function(voteId){
  const vote = await this
    .findById(voteId)
    .populate('user')
    .populate({
      path: 'comments',
      populate: { 
        path: 'childs',
        populate: [{
          path: 'from',
          model: 'User'
        },{
          path: 'to',
          model: 'User'
        }]
      }
    })
    .populate({
      path: 'comments',
      populate: [{ path: 'from' },{ path: 'to' }]
    })
  return vote;
}

export default mongoose.model('Vote', voteSchema);
