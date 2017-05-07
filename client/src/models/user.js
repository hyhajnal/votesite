import { routerRedux } from 'dva/router';
import * as userService from '../services/user';

export default {
  namespace: 'user',
  state: {
    user: {},
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
    *tofollow({ payload: { relation, id } }, { call, put }) {
      yield call(userService.tofollow, relation);
      yield put({ type: 'fetch_all', payload: id });
    },
    *unfollow({ payload: { relation, id } }, { call, put }) {
      yield call(userService.unfollow, relation);
      yield put({ type: 'fetch_all', payload: id });
    },
    *reg({ payload: { user } }, { call, put }) {
      const { data } = yield call(userService.reg, user);
      if (data.success) {
        yield put(routerRedux.push(`/redirect/${data.data.accountId}`));
      } else {
        throw data;
      }
    },
    *login({ payload: { user } }, { call, put }) {
      const { data } = yield call(userService.login, user);
      if (data.success) {
        yield put({ type: 'save', payload: { type: 'user', data: data.data } });
        yield put(routerRedux.push('/'));
      } else {
        throw data;
      }
    },
    *logout(action, { put }) {
      yield put({ type: 'save', payload: { type: 'user', data: {} } });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      let markMe = 0;
      // dispatch({ type: 'fetch', payload: { type: 'user' } });
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
