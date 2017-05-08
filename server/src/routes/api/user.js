import Router from 'koa-router';
const router = new Router();
import userController from '../../controller/user';
import { isLogin } from '../../middleware/auth';

router 
  .get('/info', isLogin, userController.info) //查询个人信息
  .put('/edit', isLogin, userController.edit) //修改个人信息
  .get('/reply', isLogin, userController.reply) //查询收到的回复
  .get('/vote', isLogin, userController.vote) //查询发起的投票
  .post('/login', userController.login)
  .get('/logout', isLogin, userController.logout)
  .post('/reg', userController.register);

  export default router;