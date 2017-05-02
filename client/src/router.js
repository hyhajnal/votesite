import React from 'react';
import { Router, Route } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Users from './routes/Users';
import Vote from './routes/Vote';
import Login from './routes/Login.js';
import VoteEdit from './routes/VoteEdit.js';
import About from './routes/About';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={IndexPage} />
      <Route path="/users" component={Users} />
      <Route path="/vote" component={Vote} />
      <Route path="/login" component={Login} />
      <Route path="/voteEdit" component={VoteEdit} />
      <Route path="/about" component={About} />
    </Router>
  );
}

export default RouterConfig;
