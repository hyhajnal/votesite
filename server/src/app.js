'use strict';

import Koa from 'koa';
import routes from './routes';
import bodyParser from 'koa-bodyparser';
import convert from 'koa-convert';
import json from 'koa-json';
import config from './config';
import response from './middleware/resdata';
import mongoose from 'mongoose';

const app = new Koa();

//用koa-convert对(generator函数)＊function语法糖进行转换
app.use(convert(bodyParser()));
//统一response
app.use(response);
//app.use(convert(json()));

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/votesite');
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', () => {
  console.log('db connect!');
});

routes(app);

app.on('error', (err, ctx) => {
  console.error(err);
});

export default app;
