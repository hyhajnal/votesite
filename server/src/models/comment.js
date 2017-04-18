import mongoose from 'mongoose';
const Schema = mongoose.Schema; 
const ObjectId = Schema.ObjectId;

const Comment = new Schema({
  _id: ObjectId,
  content: String,
  time: Dtae,
  star: Number,
  msg: Number,
  voteId: {type: ObjectId, ref: 'vote'},
  from: {type: ObjectId, ref: 'user'},
  to: {type: ObjectId, ref: 'user'},
  childs: [ {type: ObjectId, ref: 'comment'} ],
});

export default Comment;