import Router from 'koa-router';
const router = new Router();
import userController from '../../controller/user';

router 
  .get('/info', userController.info) //查询个人信息
  .put('/edit', userController.edit) //修改个人信息
  .get('/reply', userController.reply) //查询收到的回复
  .get('/vote', userController.vote) //查询发起的投票
  .post('/login', userController.login)
  .post('/reg', userController.register);

  export default router;