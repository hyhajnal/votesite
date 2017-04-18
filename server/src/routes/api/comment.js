import Router from 'koa-router';
const router = new Router();
import commentController from '../../controller/comment';

router
  .get('/list', commentController.list) //查看我发布的所有评论——userid
  .put('/edit', commentController.edit) //修改评论
  .delete('/delete', commentController.delete) //删除评论
  .post('/create', commentController.create) //发布评论

  export default router;