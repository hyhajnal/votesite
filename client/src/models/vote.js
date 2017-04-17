
import * as voteService from '../services/vote';

export default {
  namespace: 'vote',
  state: {
    isVote: false,
    posts: [],
    vote: {},
    comment: {},
  },
  reducers: {
    save(state, { payload: { data: posts} }){
      return { ...state, posts };
    },
    save_vote(state, { payload: { vote, comment}}){
      return { ...state, vote, comment};
    },
    to_vote(state, action){
      return { ...state, isVote: true };
    }
  },
  effects: {
    *fetch({}, { call, put }) {
      const { data } = yield call (voteService.fetch);
      yield put({
        type: 'save',
        payload: {
          data
        },
      });
    },
    *fetch_vote({}, { call, put }) {
      const [{ data: vote, } , { data: comment, } ] = yield [
        call (voteService.fetchVote, 1),
        call (voteService.fetchComment, 1)
      ];
      yield put({
        type: 'save_vote',
        payload: {
          vote,
          comment
        },
      });
    },
    *to_vote({ },{call, put}) {
      //yield call(voteService.toVote, topicId, itemId, voteId);
      yield put({
        type: 'to_vote'
      });
      // yield put({
      //   type: 'save_vote'
      // });
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if(pathname === '/') {
          dispatch({ type: 'fetch' });
        }
        if(pathname === '/vote') {
          dispatch({ type: 'fetch_vote' });
        }
      });
    },
  },
};
