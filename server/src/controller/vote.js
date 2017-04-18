
class VoteController {
  
  /**
   * 获取votelist
   * @param {String} topic 文学
   * @param {String} sortKey time/view
   */
  static async list( ctx, next ){
    const key = ctx.params.topic ? 
                  { topic: ctx.params.topic } : {};
    let sort = {};
    if(ctx.params.topic) sort[ctx.params.sortkey] = 1;
    const list = await ctx.model('vote').find(key, {sort: sort});
    ctx.success(list);
  }

  /**
   * 投票
   * @param {String} userId
   * @param {Strting} voteId
   * @param {Number} itemIdx voteitem的idx
   */
  static async tovote( ctx, next ){
    const userId = ctx.params.userId,
          voteId = ctx.params.voteId,
          itemIdx = ctx.params.itemIdx;

    //voteitem.num++
    let vote = await ctx.model('vote').findById(voteId);
    let voteitems = vote.voteitems;
    voteitems[itemIdx].num ++;
    vote.voteitems = voteitems;
    vote.save((err,relation) => {
      if(err) ctx.error(err,'投票失败！');
    });

    //user.vote_join_count++
    ctx.model('user').findByIdAndUpdate(userId, {$inc: {vote_join_count: 1}});

    //save relation 建立投票关系，不可重复投票
    const relationModel = ctx.model('relation');
    let relation = ctx.query;
    relation.type = 'vote_join';
    const relation = new relationModel(relation);
    relation.save((err,relation) => {
      if(err) ctx.error(err,'投票失败！');
    });

    ctx.success(null,'投票成功！');
  }

 /**
  * 修改vote
  * @param {Object} vote
  */
  static async edit( ctx, next ){
    let vote = ctx.model('vote').findById(ctx.body.vote._id);
    vote = ctx.body.vote;
    vote.save((err,relation) => {
      if(err) ctx.error(err,'投票修改失败！');
    });
    ctx.success(null,'投票修改成功');
  }

  /**
   * 创建投票
   * @param {Object} vote
   * @param {String} userId
   */
  static async create( ctx, next ){
    //save vote
    const voteModel = ctx.model('vote');
    let vote = new voteModel(ctx.body.vote);
    vote = ctx.body.vote;
    vote.userId = ctx.body.userId;
    vote.save((err,vote) => {
      if(err) ctx.error(err,'投票创建失败！');
    });

    //save relation
    const relationModel = ctx.model('relation');
    const relation_new = {
      userId: userId,
      voteId: voteId,
      type: 'vote_launch'
    };
    const relation = new relationModel(relation_new);
    relation.save((err,relation) => {
      if(err) ctx.error(err,'投票创建失败！');
    });

    //user.vote_count++
    ctx.model('user').findByIdAndUpdate(userId, {$inc: {vote_join_count: 1}});

    ctx.success(null, '投票创建成功！');
  }

  /**
   * 查看投票详情
   * @param {String} voteId
   * @param {String} userId
   */
  static async detail( ctx, next ){
    //标志是否已投票过
    let is_voted = await ctx.model('relation')
                              .findOne({voteId: ctx.params.voteId},
                                {userId: ctx.params.userId});
    is_voted = is_voted ? is_voted.itemIdx : -1;
    //detail
    let votedetail = await ctx.model('vote').findById(voteId);
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
    const voteId = ctx.params.voteId;
    //删除投票
    ctx.model('vote').remove({_id: voteId},(err) => {
      if(err) ctx.error(err,'投票删除失败！')
    });

    //user.vote_count --
    ctx.model('user').findByIdAndUpdate(userId, 
      {$inc: {vote_count: -1}},
      (err) => {
          if(err) ctx.error(err,'user.vote_count-- 失败！')
    });   
    //user.vote_join_count --
    const relation_list = await ctx.model('relation').find({voteId: voteId, type:'vote_join'});
    relation_list.map(userId => {
      ctx.model('user').findByIdAndUpdate(userId, 
        {$inc: {vote_join_count: -1}},
        (err) => {
          if(err) ctx.error(err,'user.vote_join_count-- 失败！')
        }); 
    });
    //关系解除
    ctx.model('relation').remove({voteId: voteId}, (err) => {
      if(err) ctx.error(err,'关系解除失败！')
    });

    ctx.success(null, '投票删除成功！');

  }


}

export default VoteController;