'use strict';

import Router from 'koa-router';
const router = new Router();
import vote from './api/vote';
import relation from './api/relation';
import comment from './api/comment';
import user from './api/user';

export default function routes(app) {
  router.use('/vote', vote.routes(), vote.allowedMethods());
  router.use('/relation', relation.routes(), relation.allowedMethods());
  router.use('/comment', comment.routes(), comment.allowedMethods());
  router.use('/user', user.routes(), user.allowedMethods());
  app.use(router.routes(), router.allowedMethods());
}
