import Router from 'koa-router';
const router = new Router();
import relationController from '../../controller/relation';

router
  .get('/following', relationController.following) //关注的用户
  .get('/follower', relationController.follower) //粉丝
  .get('/topic', relationController.topic) //关注的话题
  .post('/tofollow', relationController.tofollow) //关注
  .del('/unfollow', relationController.unfollow) //取关

  export default router;