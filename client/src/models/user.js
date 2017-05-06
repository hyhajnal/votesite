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
      yield call(userService.tofolow, relation);
    },
    *unfollow({ payload: { relation } }, { call }) {
      yield call(userService.unfollow, relation);
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      let markMe = 0;
      dispatch({ type: 'fetch', payload: { type: 'user' } });
      history.listen(({ pathname, query }) => {
        if (pathname === '/other' && markMe !== query.id) {
          dispatch({ type: 'fetch_all', payload: query.id });
          markMe = query.id;
        }
        const reg = new RegExp('/me/[1-8]');
        if (reg.test(pathname) && markMe !== 1) {
          dispatch({ type: 'fetch_all' });
          markMe = 1;
        }
      });
    },
  },
};
