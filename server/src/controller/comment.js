import commentModel from '../models/comment';
import voteModel from '../models/vote';
import mongoose from 'mongoose';

class commentController{

  static async list(ctx, next){
    const userId = new mongoose.mongo.ObjectId('58fc03c2b78b45f01353b057');
    const list = await commentModel.find({ from: userId });
    // 插入follow字段
    const commentlist = [];
    const getList = async ()=>{
      for(let i=0,len=list.length;i<len;i++){
        const relation = await relationModel.find({userId, otherId: list[i]._id, type: 'comment'});
        list[i]._doc.isfollow = relation !== null ? true : false;
        commentlist.push(list[i]._doc);
      }
    };
    await getList ();
    ctx.success(commentlist);
  }

  static async edit(ctx, next){
    const new_comment = ctx.request.body;
    let comment = await commentModel.findById(new_comment._id);
    comment.content = new_comment.content;
    try{ await comment.save();
    }catch(err){
      ctx.error(err, '评论修改失败！');
    }
    ctx.success(null, '评论修改成功！');
  }

  static async delete(ctx, next){
    const { id, pid } = ctx.params;
    commentModel.findByIdAndRemove(id, (err) => {
      if(err) ctx.error(err,'投票删除失败！')
    });
    // 如果是子投票需要从父级那边删除
    if(pid != '-1'){
      commentModel.update({_id: pid},{
        $pull:{ childs: id}
      }, (err) => {
      if(err) ctx.error(err,'投票删除失败！');
    });
    }
    ctx.success(null, '投票删除成功！');
  }

  static async create(ctx, next){
    let comment = new commentModel(ctx.request.body);
    comment.save((err) => {
      if(err) ctx.error(err,' 评论失败！');
    });
    //如果是子评论，父级增加child
    let vote = voteModel.findById(comment)
    if(comment.pid != '-1'){
      let p_comment = await commentModel.findById(comment.pid);
      p_comment.childs.unshift(comment._id);
      p_comment.save( (err) => {
        if(err) ctx.error(err,'评论失败！');
      });
      console.log(p_comment);
    }else{
      let vote = await voteModel.findById(comment.voteId);
      vote.comments.unshift(comment._id);
      vote.save( (err) => {
        if(err) ctx.error(err,'评论失败！');
      });
      console.log(vote);
    }
    ctx.success(null, '评论成功！');
  }

  static async star(ctx, next){
    　commentModel.findByIdAndUpdate(ctx.params.id, {
        $inc: {star: 1}},
        (err) => {
          if(err) ctx.error(err,'点赞失败！');
      });
      ctx.success(null, '点赞成功！');
  }

  static async unstar(ctx, next){
    　commentModel.findByIdAndUpdate(ctx.params.id, {
        $inc: {star: -1}},
         (err) => {
          if(err) ctx.error(err,'取消点赞失败！');
      });
      ctx.success(null, '取消点赞成功！');
  }

}

export default commentController;