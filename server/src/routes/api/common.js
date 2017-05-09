import Router from 'koa-router';
const router = new Router();
import commonController from '../../controller/common';

router 
  .get('/search/:key', commonController.search);

export default router;