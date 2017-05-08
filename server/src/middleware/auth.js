
export const isLogin = async (ctx, next) => {
  console.log('session', ctx.session.userId);
  if(!ctx.session.userId) {
    return ctx.error(null, "您还未登录，请登录后重试！", 403);
  } 
  await next();
}
