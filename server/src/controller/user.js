/*  
* 静态方法static，不需要new，减少内存
*/

import utility from 'utility';
import crypto from 'crypto';

class UserController {
  
  /**
   * 查询个人信息
   * @param {String} userId
   */
  static async info( ctx, next ){
    const userId = ctx.params.userId;
    const user = await ctx.model('user').findBtId(userId);
    ctx.success(user);
  }
  
  /**
   * 修改个人信息
   * @param {Object} user
   */
  static async edit( ctx, next ){
    let user = await ctx.model('user').findBtId(userId);
    user = ctx.body.user;
    user.save((err) => {
      if(err) ctx.error(err,'修改失败');
    })
    ctx.success(user);
  }

  /**
   * 查询发起的所有投票
   * @param {String} userId
   */
  static async vote(ctx){
    const userId = ctx.params.userId;
    const votelist = await ctx.model('vote').find({user: userId});
    ctx.success(votelist);
  }

  /**
   * 查询收到的回复
   * @param {String} userId
   */
  static async reply(ctx){

  }

  static async login(ctx){

  }

  /**
   * 注册
   * @param {Object} user
   */
  static async register(ctx){
    const userModel = ctx.model('user');
    let new_user = ctx.body.user;
    new_user.psd = 
    const user = new userModel(new_user);
    ctx.success(user);
  }

}

export default UserController;