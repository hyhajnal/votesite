'use strict';

import Koa from 'koa';
import routes from './routes';
import bodyParser from 'koa-bodyparser';
import convert from 'koa-convert';
import json from 'koa-json';
import session from 'koa-session';
import serve from "koa-static2";
import config from './config';
import response from './middleware/resdata';
import mongoose from 'mongoose';

const app = new Koa();
app.keys = ['votesite'];
const CONFIG = {
  key: 'siteuser', /** (string) cookie key (default is koa:sess) */
  maxAge: 86400000, /** (number) maxAge in ms (default is 1 days) */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: false, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
};

//用koa-convert对(generator函数)＊function语法糖进行转换
app.use(convert(bodyParser()));
app.use(convert(session(CONFIG, app)));
//统一response
app.use(response);
app.use(serve("static", __dirname + "/assets"));
//app.use(convert(json()));

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/votesite');
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', () => {
  console.log('db connect!');
});

app.use(async (ctx, next) => {
  // console.log('入口',ctx.session.userId);
  ctx.set('Access-Control-Allow-Credentials', 'true');
  await next();
})

routes(app);

app.on('error', (err, ctx) => {
  console.error(err);
});

export default app;
