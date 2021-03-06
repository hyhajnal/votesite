/*  
* 静态方法static，不需要new，减少内存
*/

import utility from 'utility';
import cryptoHelp from 'crypto'; 
import userModel from '../models/user';
import voteModel from '../models/vote';
import commentModel from '../models/comment';

class UserController {
  
  /**
   * 查询个人信息
   * @param {String} userId
   */
  static async info( ctx, next ){
    const userId = ctx.session.userId;
    const user = await userModel.findById(userId);
    ctx.success(user);
  }

  /**
   * 查询个人信息
   * @param {String} userId
   */
  static async hotuser( ctx, next ){
    const userlist = await userModel.find({});
    ctx.success(userlist);
  }
  
  /**
   * 修改个人信息
   * @param {Object} user
   */
  static async edit( ctx, next ){
    let user = await userModel.findById(ctx.session.userId);
    const { name, desc, oldpsd, newpsd, avator } = ctx.request.body;
    user.name = name;
    user.desc = desc;
    user.avator = avator;
    if(oldpsd && user.psd !== oldpsd){
      return ctx.error(null, '原密码不正确');
    }
    if(newpsd) user.psd = newpsd;
    user.save((err) => {
      if(err) return ctx.error(err,'修改失败');
    })
    ctx.success(user);
  }

  /**
   * 查询发起的所有投票
   * @param {String} userId
   */
  static async vote(ctx){
    const userId = ctx.session.userId;
    const votelist = await voteModel.find({user: userId});
    ctx.success(votelist);
  }

  /**
   * 查询收到的回复
   * @param {String} userId
   */
  static async reply(ctx){
    const userId = ctx.session.userId;
    const commentlist = await commentModel.find({to: userId});
    ctx.success(commentlist);
  }

  static async login(ctx){
    const c_user = ctx.request.body;
    //const c_psd = await cryptoHelp.decipher('aes-256-cbc', key, c_user.psd);
    const user = await userModel.findOne({accountId: c_user.accountId});
    if(!user){
      ctx.error(null, '查无此人！', 200);
    }else if( user.psd === c_user.psd){
      ctx.session.userId = user._id;
      console.log('登录',ctx.session.userId);
      ctx.success(user, '登录成功！');
    }else{
      ctx.error(null, '密码错误！', 200);
    }

  }

  static async logout(ctx){
    ctx.session.userId = null;
    // cookie 设置过期
    // ctx.cookies.set('test', '', {
    //   expires: new Date('2016-02-15'),  // cookie失效时间
    // });
    ctx.success(null, 'logout');
  }

  /**
   * 注册
   * @param {Object} user
   */
  static async register(ctx){
    //new_user.psd = await cryptoHelp.cipher('aes-256-cbc', key, new_user.psd);
    let user = new userModel(ctx.request.body);
    try {
      user = await user.save();
    } catch(err){
      ctx.error(err, "注册失败！");
    }
    ctx.success(user, '注册成功！');
  }

}

function getExpTime(day) {
  var exp = new Date();
  exp.setTime(exp.getTime() + (day * 1000 * 60 * 60 * 24));
  return exp.toGMTString();
}

export default UserController;