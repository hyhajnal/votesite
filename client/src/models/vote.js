import { routerRedux } from 'dva/router';
import { message } from 'antd';
import * as voteService from '../services/vote';
import * as userService from '../services/user';

export default {
  namespace: 'vote',
  state: {
    posts: [],
    vote: {},
    topics: [],
  },
  reducers: {
    save(state, { payload: { data: posts } }) {
      return { ...state, posts };
    },
    save_vote(state, { payload: { data: vote } }) {
      return { ...state, vote };
    },
    save_topics(state, { payload: topics }) {
      return { ...state, topics };
    },
  },
  effects: {
    *fetch_list({ payload }, { call, put }) {
      payload = !payload ? '' : payload;
      const { data } = yield call(voteService.fetchList, payload);
      yield put({
        type: 'save',
        payload: {
          data: data.data,
        },
      });
    },
    *fetch_vote({ payload: _id }, { call, put }) {
      const { data } = yield call(voteService.fetchVote, _id);
      yield put({
        type: 'save_vote',
        payload: {
          data: data.data,
        },
      });
    },
    *to_vote({ payload: { voteId, idx } }, { call, put }) {
      const { data } = yield call(voteService.toVote, { voteId, idx });
      if (data.success) {
        message.warn(data.msg);
      }
      yield put({ type: 'fetch_vote', payload: voteId });
    },
    *create_vote({ payload: { vote } }, { call, put }) {
      const { data } = yield call(voteService.createVote, { vote });
      if (data.success) {
        message.warn(data.msg);
      }
      yield put(routerRedux.push(`/vote?_id=${data.data}`));
    },
    *edit_vote({ payload: { vote, id } }, { call, put }) {
      const { data } = yield call(voteService.editVote, { vote, id });
      if (data.success) {
        message.warn(data.msg);
      }
      yield put(routerRedux.push(`/vote?_id=${data.data}`));
    },
    *to_comment({ payload: { comment } }, { call, put }) {
      const { data } = yield call(voteService.toComment, comment);
      if (data.success) {
        message.warn(data.msg);
      }
      yield put({ type: 'fetch_vote', payload: comment.voteId });
    },
    *delete_comment({ payload: { comment, voteId } }, { call, put }) {
      const { data } = yield call(voteService.delComment, comment._id, comment.pid);
      if (data.success) {
        message.warn(data.msg);
      }
      yield put({ type: 'fetch_vote', payload: voteId });
    },
    *fetch_topics(action, { call, put }) {
      const { data } = yield call(voteService.fetchTopics);
      yield put({ type: 'save_topics', payload: data.data });
    },
    *tofollow({ payload: { relation, voteId } }, { call, put }) {
      const { data } = yield call(userService.tofollow, relation);
      if (data.success) {
        message.warn(data.msg);
      }
      if (relation.type === 'comment') {
        yield put({ type: 'fetch_vote', payload: voteId });
      }
      if (relation.type === 'like' || relation.type === 'topic') {
        yield put({ type: 'fetch_list' });
      }
    },
    *unfollow({ payload: { relation, voteId } }, { call, put }) {
      const { data } = yield call(userService.unfollow, relation);
      if (data.success) {
        message.warn(data.msg);
      }
      if (relation.type === 'comment') {
        yield put({ type: 'fetch_vote', payload: voteId });
      }
      if (relation.type === 'like' || relation.type === 'topic') {
        yield put({ type: 'fetch_list' });
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/' || pathname === '/search') {
          dispatch({ type: 'fetch_list' });
          dispatch({ type: 'fetch_topics' });
        }
        if (pathname === '/vote') {
          dispatch({
            type: 'fetch_vote',
            payload: query._id,
          });
        }
        if (pathname === '/voteEdit') {
          dispatch({ type: 'fetch_topics' });
        }
      });
    },
  },
};
