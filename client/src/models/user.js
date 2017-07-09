import { routerRedux } from 'dva/router';
import { message } from 'antd';
import * as userService from '../services/user';
import * as stuService from '../services/users';

export default {
  namespace: 'user',
  state: {
    user: {},
    all: {},
    search: {},
    list: {},
    hotuser: {},
  },
  reducers: {
    save(state, { payload: { type, data } }) {
      return { ...state, [type]: data };
    },
  },
  effects: {
    *fetch({ payload: { type } }, { call, put, select }) {
      const user = yield select(state => state.user);
      if (user === null) return;
      const { data } = yield call(userService[type]);
      yield put({ type: 'save', payload: { type, data: data.data } });
    },
    *fetch_all({ payload }, { call, put }) {
      const { data } = yield call(userService.fetchAll, payload);
      yield put({ type: 'save', payload: { type: 'all', data: data.data } });
    },
    *fetch_hotuser({ payload }, { call, put }) {
      const { data } = yield call(userService.hotuser);
      yield put({ type: 'save', payload: { type: 'hotuser', data: data.data } });
    },
    *tofollow({ payload: { relation, id } }, { call, put }) {
      const { data } = yield call(userService.tofollow, relation);
      if (data.success) {
        message.success(data.msg);
      }
      yield put({ type: 'fetch_all', payload: id });
    },
    *unfollow({ payload: { relation, id } }, { call, put }) {
      const { data } = yield call(userService.unfollow, relation);
      if (data.success) {
        message.success(data.msg);
      }
      yield put({ type: 'fetch_all', payload: id });
    },
    *reg({ payload: { user } }, { call, put }) {
      const { data } = yield call(userService.reg, user);
      if (data.success) {
        message.success(data.msg);
        // yield put(routerRedux.push(`/redirect/${data.data.accountId}`));
        yield put(routerRedux.push(`/redirect?id=${data.data.accountId}`));
      } else {
        throw data;
      }
    },
    *login({ payload: { user } }, { call, put }) {
      const { data } = yield call(userService.login, user);
      if (data.success) {
        window.localStorage.setItem('login', 1);
        yield put({ type: 'save', payload: { type: 'user', data: data.data } });
        yield put(routerRedux.push('/'));
      } else {
        throw data;
      }
    },
    *logout(action, { call, put }) {
      const { data } = yield call(userService.logout);
      if (data.success) {
        window.localStorage.setItem('login', 0);
        message.success(data.msg);
      }
      yield put({ type: 'save', payload: { type: 'user', data: {} } });
    },
    *edit({ payload: { user } }, { call, put }) {
      const { data } = yield call(userService.edit, user);
      yield put({ type: 'save', payload: { type: 'user', data: data.data } });
      yield put({ type: 'fetch_all' });
    },
    *search({ payload: { key } }, { call, put }) {
      const { data } = yield call(userService.search, key);
      yield put({ type: 'save', payload: { type: 'search', data: data.data } });
      yield put(routerRedux.push('/search'));
    },

    // stu
    *stufetch(action, { call, put }) {
      const { data } = yield call(stuService.fetch);
      yield put({
        type: 'save',
        payload: { type: 'list', data: data.data },
      });
    },

    *sturemove({ payload: id }, { call, put }) {
      yield call(stuService.remove, id);
      yield put({ type: 'stureload' });
    },

    *stucreate({ payload: values }, { call, put }) {
      yield call(stuService.create, values);
      yield put({ type: 'stureload' });
    },

    *stuedit({ payload: values }, { call, put }) {
      yield call(stuService.edit, values);
      yield put({ type: 'stureload' });
    },

    *stureload(action, { put }) {
      yield put({ type: 'stufetch' });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      let markMe = 0;
      // !(/^(register)?(redirect\/\w+)?(login)?$/.test(pathname))
      return history.listen(({ pathname, query }) => {
        if (parseInt(window.localStorage.getItem('login'), 10)) {
          dispatch({ type: 'fetch', payload: { type: 'user' } });
        }
        if (pathname === '/') {
          dispatch({ type: 'fetch_hotuser' });
        }
        if (pathname === '/other' && markMe !== query.id) {
          dispatch({ type: 'fetch_all', payload: query.id });
          markMe = query.id;
        }
        // const reg = new RegExp('/me/[1-8]');
        // if (reg.test(pathname) && markMe !== 1) {
        if (pathname === '/me') {
          dispatch({ type: 'fetch_all' });
          markMe = 1;
        }
        if (pathname === '/users') {
          dispatch({ type: 'stufetch' });
        }
      });
    },
  },
};
