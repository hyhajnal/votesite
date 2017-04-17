import Router from 'koa-router';
const router = new Router();

router
  //查询个人信息
  .get('/info', async( ctx, next ) => {
    await next();
    const userlist = await ctx.model('user').find();
    ctx.response.body = userlist;
  })

  //修改个人信息
  .put('/edit', async( ctx, next ) =>  {
    // ...
  })

  //查询收到的回复
  .get('/reply', async( ctx, next ) => {

  })

  //查询发起的投票
  .get('/vote', async( ctx, next ) => {

  })

  .post('/login', async( ctx, next ) => {
    // ...
  })

  .post('/register', async( ctx, next ) => {
    // ...
  });


  export default router;