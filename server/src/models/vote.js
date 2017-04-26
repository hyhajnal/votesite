import mongoose from 'mongoose';
const Schema = mongoose.Schema; 
const ObjectId = Schema.ObjectId;

const voteSchema = new Schema({
  title: String,
  desc: String,
  create_time: Date,
  active_time: Date,
  tag: String,   
  view: Number, 
  msg: Number,
  follow: Number,
  is_voted: Number,
  user: {type: ObjectId, ref: 'User'}, //发起人
  complex: Boolean, //两种布局：带图片／纯文字
  votelist: Array,
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
