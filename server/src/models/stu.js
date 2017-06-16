
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const stuSchema = new Schema({
  name: String ,
  tel: String,
  address: String 
});

export default mongoose.model('Stu', stuSchema);