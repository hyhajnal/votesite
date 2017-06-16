import Router from 'koa-router';
const router = new Router();
import stuController from '../../controller/stu';

router 
  .get('/list', stuController.list)
  .post('/add', stuController.add)
  .get('/delete/:id', stuController.delete)
  .post('/edit', stuController.edit)

  export default router;