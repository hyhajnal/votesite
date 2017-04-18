
import mongoose from 'mongoose';
import url from 'url';
import path from 'path';
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const TopicSchema = new Schema({
  _id: ObjectId ,
  name: String ,
  pic: String,
  vote_count: Number, //相关投票数
});

TopicSchema.methods.list = async () => {
  let topiclist = await this.list();
  return topiclist;
}

export default TopicSchema;