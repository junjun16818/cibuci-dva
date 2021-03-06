import pathToRegexp from 'path-to-regexp';
import { routerRedux } from 'dva/router';
import {
  fetchArticles,
  fetchArticle,
  fetchArticleByTitle,
  addArticle,
  updateArticle,
} from '../../services/cibuci';

export default {

  namespace: 'article',

  state: {
    current: null,
    list: [],
    total: 0,
    page: 1,
    about: null,
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },

    about({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        const match = pathToRegexp('/about').exec(pathname);
        if (match) {
          dispatch({ type: 'fetchAbout' });
        }
      });
    },

    list({ dispatch, history }) {
      let page = null;

      function fetchList(_page = 1) {
        page = _page;
        dispatch({ type: 'fetchList', payload: { page } });
      }

      return history.listen(({ pathname }) => {
        const match = pathToRegexp('/article').exec(pathname);
        if (match) {
          fetchList();
        }
      });
    },

    item({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        const match = pathToRegexp('/article/:itemId').exec(pathname);
        if (match) {
          const id = match[1];
          if (id !== 'add') {
            dispatch({ type: 'fetchItem', payload: { id } });
          }
        }
      });
    },
  },

  effects: {
    * fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },

    * fetchList({ payload }, { put, call }) {
      const { page } = payload;
      const list = yield call(fetchArticles, page);
      yield put({ type: 'saveList', payload: { ...list, page } });
    },

    * appendList({ payload }, { put, call }) {
      const { page } = payload;
      const list = yield call(fetchArticles, page);
      yield put({ type: 'append', payload: { ...list, page } });
    },

    * fetchItem({ payload }, { put, call }) {
      const { id } = payload;
      const item = yield call(fetchArticle, id);
      yield put({ type: 'saveItem', payload: item.data });
    },

    * fetchAbout({ payload }, { put, call }) {  // eslint-disable-line
      const about = {};
      const us = yield call(fetchArticleByTitle, '关于我们');
      const cibuci = yield call(fetchArticleByTitle, '关于辞不辞');
      about.us = us.data;
      about.cibuci = cibuci.data;
      yield put({ type: 'save', payload: { about } });
    },

    * addItem({ payload }, { put, call }) {  // eslint-disable-line
      yield call(addArticle, payload);
      yield put(routerRedux.push('/article'));
    },

    * editItem({ payload }, { put, call }) {  // eslint-disable-line
      yield call(updateArticle, payload);
      yield put(routerRedux.push(`/article/${payload.id}`));
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },

    saveList(state, { payload }) {
      const { data, total, page } = payload;
      return { ...state, list: data, total, page };
    },

    append(state, { payload }) {
      const { data, total, page } = payload;
      const list = state.list.concat(data);
      return { ...state, list, total, page };
    },

    saveItem(state, { payload: item }) {
      return { ...state, current: item };
    },
  },

};
