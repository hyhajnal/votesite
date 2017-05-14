import mongoose from 'mongoose';
import voteModel from '../models/vote';
import relationModel from '../models/relation';
import userModel from '../models/user';
import topicModel from '../models/topic';
import commentModel from '../models/comment';
import msgModel from '../models/msg';

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
    let data = null;
    if(ctx.query.sortkey){
      sortkey[ctx.query.sortkey] = ctx.query.aesc ? 1: -1;
      list = await voteModel.find(findkey).sort(sortkey).populate('user');
    }else{
      list = await voteModel.find(findkey).sort({create_time: -1}).populate('user');
    }
    data = list;
    if(ctx.session && ctx.session.userId){
      // 插入like字段
      const votelist = [];
      const getList = async ()=>{
        for(let i=0,len=list.length;i<len;i++){
          const relation = await relationModel.findOne({
            userId: ctx.session.userId, otherId: list[i]._id, type: 'like'});
          list[i]._doc.isfollow = !relation ? false : true;
          votelist.push(list[i]._doc);
        }
      };
      await getList ();
      data = votelist;
    }
    ctx.success(data);
  }

  /**
   * 投票
   * @param {String} userId
   * @param {Strting} voteId
   * @param {Number} itemIdx voteitem的idx
   */
  static async tovote( ctx, next ){
    const { voteId, itemIdx } = ctx.params;
    const userId = await ctx.session.userId;
    //voteitem.num++
    let vote = await voteModel.findById(voteId);
    // let v = vote.toJSON();  
    vote.votelist[parseInt(itemIdx)].num += 1;
    vote.markModified('votelist');
    try {
      await vote.save();
    } catch(e) {
      return ctx.error(err,'投票失败！');
    }
    await vote.save();

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
      return ctx.error(err,'投票失败！');
    }
    ctx.success(vote,'投票成功！');
  }

 /**
  * 修改vote
  * @param {Object} vote
  */
  static async edit( ctx, next ){
    const { title, desc, votelist, create_time, end_time, multi, tag } = ctx.request.body;
    let vote = await voteModel.findById(ctx.params.id);
    const topic = await topicModel.findOneAndUpdate({ name: tag }, {$inc: {vote_count: 1}});
    vote.title = title;
    vote.desc = desc;
    vote.multi = multi;
    vote.create_time = create_time;
    vote.end_time = end_time;
    vote.tag = tag;
    vote.votelist = votelist;
    try {
      await vote.save();
    } catch(err) {
      return ctx.error(err,'投票修改失败！');
    }
    ctx.success(vote._id,'投票修改成功');
  }

  /**
   * 创建投票
   * @param {Object} vote
   * @param {String} userId
   */
  static async create( ctx, next ){
    let vote = ctx.request.body;
    const userId = ctx.session.userId;
    const topic = await topicModel.findOneAndUpdate({ name: vote.tag }, {$inc: {vote_count: 1}});
    const topicId = topic._id;
    //save vote
    vote = new voteModel(vote);
    vote.user = userId;
    try { await vote.save();
    } catch(err) {
      return ctx.error(err,'投票创建失败！');
    }

    //save relation
    const relation_new = {
      userId: userId,
      otherId: vote._id,
      type: 'vote_launch'
    };
    let relation = new relationModel(relation_new);
    try { await relation.save();
    } catch(err) {
      return ctx.error(err,'投票创建失败！');
    }

    //相关topic＋1
    const relations = await relationModel.find({otherId: topicId, type: 'topic'});
    const sendMsgs = async ()=>{
        for(let i=0,len=relations.length;i<len;i++){
          const msg = new msgModel({ 
            content: ` 你关注的 “${vote.tag}” 话题新增了一个 “${vote.title}” 投票`, 
            userId: relations[i].userId, 
            type: 'topic',
            linkId: vote._id
          });
          msg.save();
        }
    };

    //user.vote_count++
    userModel.findByIdAndUpdate(userId, {$inc: {vote_join_count: 1}});

    await sendMsgs();

    ctx.success(vote._id, '投票创建成功！');
  }

  /**
   * 查看投票详情
   * @param {String} voteId
   * @param {String} userId
   */
  static async detail( ctx, next ){
    //标志是否已投票过
    const { voteId } = ctx.params;
    //detail
    let votedetail = await voteModel.detail(voteId);
    //vote.view++               
    votedetail.view ++;                                        
    votedetail.save((err,vote) => {
      if(err) return ctx.error(err,'vote浏览数增加失败！');
    });

    // 如果未登录，直接返回
    if(!ctx.session || !ctx.session.userId){
      votedetail.is_voted = -1;
      return ctx.success(votedetail);
    }
    const userId = ctx.session.userId;
    let is_voted = await relationModel
                          .findOne({otherId: voteId, userId: userId, type: 'vote_join'});
    is_voted = !is_voted ? -1 : is_voted.extra;
    votedetail.is_voted = is_voted; 
    // like
   const addFollow = async () => {
      for(let i=0,len=votedetail.comments.length;i<len;i++){
        const relation = await relationModel.findOne({
          userId: userId, otherId: votedetail.comments[i]._id, type: 'comment'
        });
        votedetail.comments[i].isfollow = !relation ? false : true;
      }
  }  
    await addFollow();
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
      if(err) return ctx.error(err,'投票删除失败！')
    });

    //user.vote_count --
    userModel.findByIdAndUpdate(userId, 
      {$inc: {vote_count: -1}},
      (err) => {
          if(err) return ctx.error(err,'user.vote_count-- 失败！')
    });   
    //user.vote_join_count --
    const relation_list = await relationModel.find({voteId: voteId, type:'vote_join'});
    relation_list.map(userId => {
      userModel.findByIdAndUpdate(userId, 
        {$inc: {vote_join_count: -1}},
        (err) => {
          if(err) return ctx.error(err,'user.vote_join_count-- 失败！')
        }); 
    });
    //关系解除
    relationModel.remove({otherId: voteId}, (err) => {
      if(err) return ctx.error(err,'关系解除失败！')
    });

    ctx.success(null, '投票删除成功！');

  }

  /**
   * 获取所有topics
   */
  static async topics ( ctx, next ){
    const topics = await topicModel.find();
    if(ctx.session && ctx.session.userId){
      const addFollow = async () => {
        for(let i=0,len=topics.length;i<len;i++){
          const relation = await relationModel.findOne({
            userId: ctx.session.userId, otherId: topics[i]._id, type: 'topic'
          });
          topics[i].isfollow = !relation ? false : true;
        }
      }  
      await addFollow();
    }
    ctx.success(topics);
  }


}

export default VoteController;