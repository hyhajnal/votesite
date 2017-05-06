import relationModel from '../models/relation';
import userModel from '../models/user';
import commentModel from '../models/comment';
import voteModel from '../models/vote';
import topicModel from '../models/topic';

class relationController {

  static async all(ctx, next){
    const userId = '58fc03c2b78b45f01353b057';
    console.log(ctx.query.otherId);
    const queryId = ctx.query.otherId ? ctx.query.otherId : userId;
    // 查询 info
    const info = await userModel.findById(queryId);
    if( ctx.query.otherId){
      const relation = await relationModel.find({userId: queryId, otherId: info._id, type: 'user'});
      info._doc.isfollow = relation !== null ? true : false;
    }
    // 查询 vote
    const votes = await voteModel.find({ user: queryId }).populate('user');

    // 查询 关注用户
    const following_r = await relationModel.find({userId: queryId, type:'user'});
    const followings = [];
    const getFollowings = async ()=>{
      for(let i=0,len=following_r.length;i<len;i++){
        let following = await userModel.findById(following_r[i].otherId);
        if( ctx.query.otherId){
          const relation = await relationModel.find({userId: queryId, otherId: following._id, type: 'user'});
          following._doc.isfollow = !relation ? false : true;
        }
        followings.push(following._doc);
      }
    };
    // 查询 粉丝
    const follower_r = await relationModel.find({otherId: queryId, type:'user'});
    const followers = [];
    const getFollowers = async ()=>{
      for(let i=0,len=follower_r.length;i<len;i++){
        let follower = await userModel.findById(follower_r[i].userId);
        if( ctx.query.otherId){
          const relation = await relationModel.find({userId: queryId, otherId: follower._id, type: 'user'});
          follower._doc.isfollow = relation !== null ? true : false;
        }
        followers.push(follower._doc);
      }
    };
    
    // 查询 关注的话题
    const topic_r = await relationModel.find({userId: queryId, type: 'topic'});
    const topics = [];
    const getTopics = async ()=>{
      for(let i=0,len=topic_r.length;i<len;i++){
        const topic = await topicModel.findById(topic_r[i].otherId);
        topics.push(topic);
      }
    };

    // 查询 参与的投票
    const votejoin_r = await relationModel.find({userId: queryId, type: 'vote_join'});
    const vote_joins = [];
    const getVotejoins = async ()=>{
      for(let i=0,len=votejoin_r.length;i<len;i++){
        const vote_join = await voteModel.findById(votejoin_r[i].otherId);
        vote_joins.push(vote_join);
      }
    };

    // 查询评论
    const comments = await commentModel.find({from: queryId}).populate(['from','to','voteId']);

    // 查询未读消息

    await getFollowers();
    await getFollowings();
    await getTopics();
    await getVotejoins();

    const result = {
      info, followings, followers, topics, votes, vote_joins, comments
    }

    ctx.success(result);
  }

  /**
   * 获取关注的用户
   * @param {*} ctx 
   * @param {*} next 
   */
  static async following(ctx, next){
    const userId = '58fc03c2b78b45f01353b057';
    const list = await relationModel.find({userId: userId, type:'user'});
    list.map(async (relation) => {
      relation.otherId = await userModel.findById(relation.otherId);
    });
    ctx.success(list);
  }

  static async follower(ctx, next){
    const otherId = '58fc03c2b78b45f01353b057';
    const list = await relationModel.find({otherId: otherId, type:'user'});
    list.map(async (relation) => {
      relation.userId = await userModel.findById(relation.userId);
    });
    ctx.success(list);
  }

  // 关注用户／关注话题 /点赞投票 ／点赞评论
  static async tofollow(ctx, next){
    console.log(ctx.request.body);
    let relation = new relationModel(ctx.request.body);
    await relation.save((err) => {
      if(err) ctx.error(err, "操作失败！");
    });
    
    if (relation.type === 'user'){
      await userModel.findByIdAndUpdate(relation.userId, {$inc: {following_count: 1}});
      await userModel.findByIdAndUpdate(relation.otherId, {$inc: {follower_count: 1}});
    }
    if (relation.type === 'like'){
      await voteModel.findByIdAndUpdate(relation.otherId, {$inc: {follow: 1}});
    }
    if (relation.type === 'comment'){
      await commentModel.findByIdAndUpdate(relation.otherId, {$inc: {star: 1}});
    }

    ctx.success(null, "操作成功！");
  }

  static async unfollow(ctx, next){
    const relation = ctx.request.body;
    await relationModel.remove(relation, (err) => {
      if(err) ctx.error(err, '取消操作失败！');
    });
    if (relation.type === 'user'){
      await userModel.findByIdAndUpdate(relation.userId, {$inc: {following_count: -1}});
      await userModel.findByIdAndUpdate(relation.otherId, {$inc: {follower_count: -1}});
    }
    if (relation.type === 'like'){
      await voteModel.findByIdAndUpdate(relation.otherId, {$inc: {follow: -1}});
    }
    if (relation.type === 'comment'){
      await commentModel.findByIdAndUpdate(relation.otherId, {$inc: {star: -1}});
    }
    ctx.success(null, "取消操作成功！");
  }
}

export default relationController;