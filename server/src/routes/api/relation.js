import Router from 'koa-router';
const router = new Router();
import relationController from '../../controller/relation';
import { isLogin } from '../../middleware/auth';

router
  .get('/all', relationController.all) // 查询用户所有的资料
  .get('/following', relationController.following) //关注的用户
  .get('/follower', relationController.follower) //粉丝
  //.get('/topic', relationController.topic) //关注的话题
  .post('/tofollow', isLogin, relationController.tofollow) //关注
  .post('/unfollow', isLogin, relationController.unfollow) //取关

  export default router;