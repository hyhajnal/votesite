
import mongoose from 'mongoose';
import url from 'url';
import path from 'path';
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
  _id: ObjectId ,
  name: String ,
  psd: String ,
  pic: String 
});

UserSchema.methods.find = async () => {
  let userlist = await this.findOne();
  console.log(userlist);
  return userlist;
}

//export default mongoose.model('User', UserSchema);
export default UserSchema;