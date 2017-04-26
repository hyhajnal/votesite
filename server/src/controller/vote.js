import mongoose from 'mongoose';
import voteModel from '../models/vote';
import relationModel from '../models/relation';
import userModel from '../models/user';
import topicModel from '../models/topic';
import commentModel from '../models/comment';

class VoteController {
  
  /**
   * 获取votelist
   * @param {String} tag 文学
   * @param {String} sortkey create_time/view
   * @param {Boolean} aesc 降序默认
   */
  static async list( ctx, next ){
    let findkey = ctx.query.tag ? 
                  { tag: ctx.query.tag } : {};
    let sortkey = {};
    let list;
    if(ctx.query.sortkey){
      sortkey[ctx.query.sortkey] = ctx.query.aesc ? 1: -1;
      list = await voteModel.find(findkey).sort(sortkey).populate('user');
    }else{
      list = await voteModel.find(findkey).populate('user');
    }
    ctx.success(list);
  }

  /**
   * 投票
   * @param {String} userId
   * @param {Strting} voteId
   * @param {Number} itemIdx voteitem的idx
   */
  static async tovote( ctx, next ){
    const { voteId, itemIdx } = ctx.params;
    const userId = '58fc03c2b78b45f01353b04f';
    //voteitem.num++
    let vote = await voteModel.findById(voteId);
    // let v = vote.toJSON();  
    vote.votelist[parseInt(itemIdx)].num ++;
    try {
      await vote.save()
    } catch(e) {
      ctx.error(err,'投票失败！');
    }

    //user.vote_join_count++
    await userModel.findByIdAndUpdate(userId, {$inc: {vote_join_count: 1}});

    //save relation 建立投票关系，不可重复投票
    let relation_q = {
      userId: userId,
      otherId: voteId,
      extra: parseInt(itemIdx),
      type: 'vote_join'
    }
    let relation = new relationModel(relation_q);
    try {
      await relation.save();
    } catch(err) {
      ctx.error(err,'投票失败！');
    }
    ctx.success(vote,'投票成功！');
  }

 /**
  * 修改vote
  * @param {Object} vote
  */
  static async edit( ctx, next ){
    let vote = voteModel.findById(ctx.body.vote._id);
    vote = ctx.body.vote;
    try {
      await vote.save();
    } catch(err) {
      ctx.error(err,'投票修改失败！');
    }
    ctx.success(null,'投票修改成功');
  }

  /**
   * 创建投票
   * @param {Object} vote
   * @param {String} userId
   */
  static async create( ctx, next ){
    const { userId } = ctx.request.body;
    //save vote
    let vote = new voteModel(ctx.request.body);
    vote.user = userId;
    try { await vote.save();
    } catch(err) {
      ctx.error(err,'投票创建失败！');
    }

    //save relation
    const relation_new = {
      userId: userId,
      otherId: vote._id,
      type: 'vote_launch'
    };
    console.log(relation_new);
    let relation = new relationModel(relation_new);
    console.log(relation);
    try { await relation.save();
    } catch(err) {
      ctx.error(err,'投票创建失败！');
    }

    //user.vote_count++
    userModel.findByIdAndUpdate(userId, {$inc: {vote_join_count: 1}});

    ctx.success(null, '投票创建成功！');
  }

  /**
   * 查看投票详情
   * @param {String} voteId
   * @param {String} userId
   */
  static async detail( ctx, next ){
    //标志是否已投票过
    const { voteId } = ctx.params;
    const userId = '58fc03c2b78b45f01353b04f';
    let is_voted = await relationModel
                          .findOne({otherId: voteId, userId: userId});
    is_voted = !is_voted ? -1 : is_voted.extra;
    //detail
    let votedetail = await voteModel.detail(voteId);
    //vote.view++               
    votedetail.view ++;                                        
    votedetail.save((err,vote) => {
      if(err) ctx.error(err,'vote浏览数增加失败！');
    });
    votedetail.is_voted = is_voted; 
    ctx.success(votedetail);
  }

  /**
   * 删除投票
   * @param {String} voteId
   * @param {String} userId
   */
  static async delete( ctx, next ){
    const { userId, voteId } = ctx.params;
    //删除投票
    voteModel.remove({_id: voteId},(err) => {
      if(err) ctx.error(err,'投票删除失败！')
    });

    //user.vote_count --
    userModel.findByIdAndUpdate(userId, 
      {$inc: {vote_count: -1}},
      (err) => {
          if(err) ctx.error(err,'user.vote_count-- 失败！')
    });   
    //user.vote_join_count --
    const relation_list = await relationModel.find({voteId: voteId, type:'vote_join'});
    relation_list.map(userId => {
      userModel.findByIdAndUpdate(userId, 
        {$inc: {vote_join_count: -1}},
        (err) => {
          if(err) ctx.error(err,'user.vote_join_count-- 失败！')
        }); 
    });
    //关系解除
    relationModel.remove({otherId: voteId}, (err) => {
      if(err) ctx.error(err,'关系解除失败！')
    });

    ctx.success(null, '投票删除成功！');

  }

  /**
   * 获取所有topics
   */
  static async topics ( ctx, next ){
    const topics = await topicModel.find();
    ctx.success(topics);
  }


}

export default VoteController;