import mongoose from 'mongoose';
import userModel from '../models/user';
import commentModel from '../models/comment';
import voteModel from '../models/vote';
import Mock from 'mockjs';
const Random = Mock.Random;

// 数据库
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/votesite');
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('db connect!');
});

const random_num = (min, max) => {
  return parseInt(Math.random()*(max-min+1)+min,10)
}

const random_objectId = (array) => {
  return array[random_num(0, array.length-1)];
}

const commentfn = async () => {
  let commentlist = await commentModel.find();
  const userlist = await userModel.find({},{_id: 1});
  const votelist = await voteModel.find({},{_id: 1});
  const childlist = await commentModel.find({},{_id: 1});
  commentlist.map((comment) => {
    comment.voteId = random_objectId(votelist);
    comment.from = random_objectId(userlist);
    comment.to = random_objectId(userlist);
    const childId = random_objectId(childlist);
    comment.childs.push(childId);
    comment.save((err) => {
      if(err) console.log(err);
    });
    commentModel.findByIdAndUpdate(childId,
      { $set: { pid: comment._id }}, (err) => {
      if(err) console.log(err);
    });
  });
}

const votefn = async () => {
  const userlist = await userModel.find({},{_id: 1});
  const commentlist = await commentModel.find({},{_id: 1});
  let votelist = await voteModel.find();
  votelist.map((vote) => {
    vote.user = random_objectId(userlist);
    vote.comments = [];
    for(let i=0; i<random_num(5,15); i++){ vote.comments.push(random_objectId(commentlist))}
    vote.create_time = new Date(Random.datetime());
    vote.active_time = new Date(Mock.mock('@datetime'));
    vote.save((err) => {
      if(err) console.log(err);
    })
  })
}

votefn();
commentfn();
