import Router from 'koa-router';
const router = new Router();

router

  //关注的用户
  .get('/following', async( ctx, next ) => {
  })
  //粉丝
  .get('/follower', async( ctx, next ) => {
  })
  //关注的话题
  .get('/topic', async( ctx, next ) => {
  })
  //关注
  .post('/follow', async( ctx, next ) => {

  })
  //取关
  .del('/unfollow', async( ctx, next ) =>  {

  })

  export default router;