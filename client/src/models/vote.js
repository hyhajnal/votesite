
import * as voteService from '../services/vote';

export default {
  namespace: 'vote',
  state: {
    posts: [],
    vote: {},
  },
  reducers: {
    save(state, { payload: { data: posts } }) {
      return { ...state, posts };
    },
    save_vote(state, { payload: { data: vote } }) {
      return { ...state, vote };
    },
  },
  effects: {
    *fetch_list({ call, put }) {
      let { data } = yield call(voteService.fetch);
      data = data.data;
      yield put({
        type: 'save',
        payload: {
          data,
        },
      });
    },
    *fetch_vote({ payload: _id }, { call, put }) {
      let { data } = yield call(voteService.fetchVote, _id);
      data = data.data;
      yield put({
        type: 'save_vote',
        payload: {
          data,
        },
      });
    },
    *to_vote({ payload: { voteId, idx } }, { call, put }) {
      yield call(voteService.toVote, { voteId, idx });
      yield put({ type: 'fetch_vote', payload: voteId });
    },
    *to_comment({ payload: { comment, pid, voteId } }, { call, put }) {
      yield call(voteService, { comment, pid });
      yield put({ type: 'fetch_vote', payload: voteId });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/') {
          dispatch({ type: 'fetch_list' });
        }
        if (pathname === '/vote') {
          dispatch({
            type: 'fetch_vote',
            payload: query._id,
          });
        }
      });
    },
  },
};
