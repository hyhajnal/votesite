import Router from 'koa-router';
const router = new Router();

router
  //获取评论列表——voteid
  .get('/list', async( ctx, next ) => {

  })

   //修改评论的内容
  .put('/edit', async( ctx, next ) => {

  })

   //删除评论的内容
  .delete('/delete', async( ctx, next ) => {

  })

  //发起评论
  .post('/post', async( ctx, next ) => {

  })



  export default router;