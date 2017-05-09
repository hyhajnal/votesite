import React from 'react';
import { Router, Route } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Users from './routes/Users';
import Vote from './routes/Vote';
import Login from './routes/Login.js';
import VoteEdit from './routes/VoteEdit.js';
import About from './routes/About';
import Me from './routes/Me';
import Other from './routes/Other';
import Register from './routes/Register.js';
import Redirect from './routes/Redirect.js';
import Search from './routes/Search.js';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={IndexPage} />
      <Route path="/users" component={Users} />
      <Route path="/vote" component={Vote} />
      <Route path="/login" component={Login} />
      <Route path="/voteEdit" component={VoteEdit} />
      <Route path="/about" component={About} />
      <Route path="/me/:id" component={Me} />
      <Route path="/other" component={Other} />
      <Route path="/register" component={Register} />
      <Route path="/redirect/:id" component={Redirect} />
      <Route path="/search" component={Search} />
    </Router>
  );
}

export default RouterConfig;
