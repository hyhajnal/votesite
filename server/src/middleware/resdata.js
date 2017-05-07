
export default async ( ctx, next ) => {
  ctx.error = (err, msg, status, data) => {
    //ctx.throw([msg], [status], [properties])
    ctx.status = status || 400;
    ctx.body = { success: 0, data, msg };
    if(err) throw new Error(err);
  }

  ctx.success = (data, msg) => {
    ctx.status = 200;
    ctx.body = { success: 1, data, msg };
  }

  await next();
}
