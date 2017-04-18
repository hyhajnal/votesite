
export default async ( ctx, next ) => {
  ctx.error = ({ err, msg, status, data }) => {
    console.log(err);
    ctx.status = status || 400;
    ctx.body = { success: 0, data, msg };
  }

  ctx.success = ({ data, msg }) => {
    ctx.status = 200;
    ctx.body = { success: 1, data, msg };
  }

  await next();
}
