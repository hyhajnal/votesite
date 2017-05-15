import Router from 'koa-router';
const router = new Router();
import voteController from '../../controller/vote';
import { isLogin } from '../../middleware/auth';

router
  .get('/list/:page/:limit', voteController.list) //获取投票列表——最热／标签／最新/userid
  .get('/tovote/:voteId/:itemIdx', isLogin, voteController.tovote) //投票
  .post('/edit/:id', isLogin, voteController.edit) //修改投票的内容
  .post('/create', isLogin, voteController.create) //发起一个投票
  .get('/topics', voteController.topics) //获取热门topic
  .get('/detail/:voteId', voteController.detail) //获取投票详情
  .delete('/delete/:userId/:voteId', isLogin, voteController.delete) //删除投票
  export default router;