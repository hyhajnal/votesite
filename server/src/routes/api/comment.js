import Router from 'koa-router';
const router = new Router();
import commentController from '../../controller/comment';

router
  .get('/list', commentController.list) //查看我发布的所有评论——userid
  .put('/edit', commentController.edit) //修改评论
  .delete('/delete/:id/:pid', commentController.delete) //删除评论
  .post('/create', commentController.create) //发布评论
  .get('/star/:id', commentController.star) //点赞
  .get('/unstar/:id', commentController.unstar) // 取消点赞

  export default router;