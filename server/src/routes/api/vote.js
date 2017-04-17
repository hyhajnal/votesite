import Router from 'koa-router';
const router = new Router();

router
  //获取投票列表——最热／标签／最新/userid
  .get('/list', async( ctx, next ) => {

  })

  //投票－
  .post('/tovote', async( ctx, next ) => {

  })

   //修改投票的内容
  .put('/edit', async( ctx, next ) => {

  })

  //发起一个投票
  .post('/post', async( ctx, next ) => {

  })

  //获取热门topic
  .get('/topics', async( ctx, next ) => {

  })


  export default router;