'use strict';

import Koa from 'koa';
import routes from './routes';
import bodyParser from 'koa-bodyparser';
import convert from 'koa-convert';
import json from 'koa-json';
import mongoose from 'koa-mongoose';
import config from './config';

const app = new Koa();


//用koa-convert对(generator函数)＊function语法糖进行转换
app.use(convert(bodyParser()));
//app.use(convert(json()));


// 数据库
mongoose.Promise = global.Promise
app.use(convert(mongoose(Object.assign({
  server: {
    poolSize: 5
  },
  schemas: __dirname + '/models'
}, config.mongodb))));

routes(app);

app.on('error', (err, ctx) => {
  console.error(err);
});

export default app;
