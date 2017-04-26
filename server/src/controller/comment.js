import commentModel from '../models/comment';
import voteModel from '../models/vote';

class commentController{

  static async list(ctx, next){
    const userId = '58fc03c2b78b45f01353b04f';
    const list = await commentModel.find({ userId: userId });
    ctx.success(list);
  }

  static async edit(ctx, next){
    const new_comment = ctx.body.comment;
    let comment = await commentModel.findById(new_comment._id);
    comment = new_comment;
    try{ await comment.save();
    }catch(err){
      ctx.error(err, '评论修改失败！');
    }
    ctx.success(null, '评论修改成功！');
  }

  static async delete(ctx, next){
    const { id, pid } = ctx.params;
    commentModel.removeById(id, (err) => {
      if(err) ctx.error(err,'投票删除失败！')
    });
    // 如果是子投票需要从父级那边删除
    if(pid != '-1'){
      commentModel.update({_id: pid},{
        $pull:{ childs: id}
      });
    }
    ctx.success(null, '投票删除成功！');
  }

  static async create(ctx, next){
    let comment = new commentModel(ctx.body.comment);
    //如果是子评论，父级增加child
    if(comment.pid != '-1'){
      commentModel.update({_id: comment._pid},{
        $push: { childs: comment._id }
      });
    }
    ctx.success(null, '评论成功！');
  }

  static async star(ctx, next){
    　commentModel.findByIdAndUpdate(ctx.params.id, {
        $inc: {star: 1}});
      ctx.success(null, '点赞成功！');
  }

  static async unstar(ctx, next){
    　commentModel.findByIdAndUpdate(ctx.params.id, {
        $inc: {star: -1}});
      ctx.success(null, '取消点赞成功！');
  }

}