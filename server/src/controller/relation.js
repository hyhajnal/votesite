import relationModel from '../models/relation';
import userModel from '../models/user';
import commentModel from '../models/comment';
import voteModel from '../models/vote';

class relationController {
  /**
   * 获取关注的用户
   * @param {*} ctx 
   * @param {*} next 
   */
  static async following(ctx, next){
    const userId = '58fc03c2b78b45f01353b057';
    const list = await relationModel.find({userId: userId},{type:'user'});
    list.map(async (relation) => {
      relation.otherId = await userModel.findById(relation.otherId);
    });
    ctx.success(list);
  }

  static async follower(ctx, next){
    const otherId = '58fc03c2b78b45f01353b057';
    const list = await relationModel.find({otherId: otherId},{type:'user'});
    list.map(async (relation) => {
      relation.userId = await userModel.findById(relation.userId);
    });
    ctx.success(list);
  }

  static async tofollow(ctx, next){
    let relation = new relationModel(ctx.request.body);
    relation.save((err) => {
      if(err) ctx.error("关注失败！");
    });
    ctx.success(null, "关注成功！");
  }

  static async unfollow(ctx, next){
    relationModel.remove(ctx.request.body, (err) => {
      if(err) ctx.error('取关失败！');
    });
    ctx.success(null, "取关成功！");
  }
}

export default relationController;