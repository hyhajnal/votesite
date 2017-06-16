
import * as usersService from '../services/users';

export default {
  namespace: 'users',
  state: {
    list: [],
  },
  reducers: {
    save(state, { payload: { data: list } }) {
      return { ...state, list };
    },
  },
  /* yield put异步处理 call触发action select从state里取数据 */
  effects: {
    *fetch(action, { call, put }) {
      const { data } = yield call(usersService.fetch);
      yield put({
        type: 'save',
        payload: {
          data,
        },
      });
    },

    *remove({ payload: id }, { call, put }) {
      yield call(usersService.remove, id);
      yield put({ type: 'reload' });
    },

    *create({ payload: values }, { call, put }) {
      yield call(usersService.create, values);
      yield put({ type: 'reload' });
    },

    *reload(action, { put }) {
      yield put({ type: 'fetch' });
    },
  },
  // subscriptions: {
  //   setup({ dispatch, history }) {
  //     return history.listen(({ pathname }) => {
  //       console.log(pathname);
  //       if (pathname === '/users') {
  //         dispatch({ type: 'fetch' });
  //       }
  //     });
  //   },
  // },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        console.log(pathname);
        if (pathname === '/users') {
          dispatch({ type: 'fetch' });
        }
      });
    },
  },
};
