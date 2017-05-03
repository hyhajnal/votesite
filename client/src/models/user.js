import * as userService from '../services/user';

export default {
  namespace: 'user',
  state: {
    user: {},
    following: [],
    folllower: [],
    vote_launch: [],
    vote_join: [],
    all: {},
  },
  reducers: {
    save(state, { payload: { type, data } }) {
      return { ...state, [type]: data };
    },
  },
  effects: {
    *fetch({ payload: { type } }, { call, put }) {
      const { data } = yield call(userService[type]);
      yield put({ type: 'save', payload: { type, data: data.data } });
    },
    *fetch_all({ payload }, { call, put }) {
      const { data } = yield call(userService.fetchAll, payload);
      yield put({ type: 'save', payload: { type: 'all', data: data.data } });
    },
    *tofollow({ payload: { relation } }, { call }) {
      yield call(userService.tofolow, { relation });
    },
    *unfollow({ payload: { relation } }, { call }) {
      yield call(userService.unfollow, { relation });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      dispatch({ type: 'fetch', payload: { type: 'user' } });
      history.listen(({ pathname }) => {
        if (pathname === '/other') {
          dispatch({ type: 'fetch_all', payload: '58fc03c2b78b45f01353b057' });
        }
        if (pathname === '/following') {
          dispatch({ type: 'fetch', payload: { type: 'following' } });
        }
        if (pathname === '/follower') {
          dispatch({ type: 'fetch', payload: { type: 'follower' } });
        }
        if (pathname === '/vote_launch') {
          dispatch({ type: 'fetch', payload: { type: 'vote_launch' } });
        }
        if (pathname === '/vote_join') {
          dispatch({ type: 'fetch', payload: { type: 'vote_join' } });
        }
      });
    },
  },
};
