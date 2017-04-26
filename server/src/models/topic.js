
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const topicSchema = new Schema({
  name: String ,
  pic: String,
  vote_count: Number, //相关投票数
});

topicSchema.methods.list = async () => {
  let topiclist = await this.list();
  return topiclist;
}

export default mongoose.model('Topic', topicSchema);