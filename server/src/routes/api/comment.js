import Router from 'koa-router';
const router = new Router();
import commentController from '../../controller/comment';
import { isLogin } from '../../middleware/auth';

router
  .get('/list', isLogin, commentController.list) //查看我发布的所有评论——userid
  .put('/edit', isLogin, commentController.edit) //修改评论
  .delete('/delete/:id/:pid', isLogin, commentController.delete) //删除评论
  .post('/create', isLogin, commentController.create) //发布评论
  .get('/star/:id', isLogin, commentController.star) //点赞
  .get('/unstar/:id', isLogin, commentController.unstar) // 取消点赞

  export default router;