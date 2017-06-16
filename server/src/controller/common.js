import relationModel from '../models/relation';
import userModel from '../models/user';
import commentModel from '../models/comment';
import voteModel from '../models/vote';
import topicModel from '../models/topic';
import fs from 'fs';

class commonController {

  static async search(ctx, next){
    const key = ctx.params;
    const likekey = new RegExp(`[${key.key}]`.replace(/\s/,'|'));
    // 查询 vote
    const votes = await voteModel.find({
      "$or": [
        { title: likekey }, 
        { desc: likekey }
      ]}).populate('user');
    // 查询 关注用户
    const users = await userModel.find({
      "$or":[{name: {$regex:likekey}},{desc: {$regex:likekey}}]
      });
    // 查询 关注的话题
    const topics = await topicModel.find({
      "$or":[{name: {$regex:likekey}}]
      });
    // 查询评论
    const comments = await commentModel.find({
      "$or":[{content: {$regex:likekey}}]
      }).populate(['from','to','voteId']);

    ctx.success({ votes, comments, users, topics });
  }

  static async upload(ctx, next){
    //console.log(ctx.req.file);
    const file = ctx.req.file;
    const type =  file.mimetype.split('/')[1];
    await fs.renameSync(`src/static/upload/${file.filename}`, `src/static/upload/${ctx.req.body.savename}.${type}`);
    // let user = await userModel.findById(ctx.session.userId);
    // user.avator = `http://localhost:3000/static/upload/${ctx.session.userId}.${type}`;
    // await user.save();
    ctx.success(`static/upload/${ctx.req.body.savename}.${type}`, '保存成功！');
  }

}

export default commonController;