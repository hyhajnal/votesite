import mongoose from 'mongoose';
const Schema = mongoose.Schema; 
const ObjectId = Schema.ObjectId;

const commentSchema = new Schema({
  content: String,
  time: Date,
  star: Number,
  msg: Number,
  pid: String,
  voteId: {type: ObjectId, ref: 'Vote'},
  from: {type: ObjectId, ref: 'User'},
  to: {type: ObjectId, ref: 'User'},
  childs: [ {type: ObjectId, ref: 'Comment'} ],
});

export default mongoose.model('Comment', commentSchema);