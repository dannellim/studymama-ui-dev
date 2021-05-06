import type { Reducer, Effect } from 'umi';
import { searchPostsByKeywords, searchPostsByCategory, getPost, updatePost, getCategories} from '@/services/post';
import { message } from 'antd';

export type Post = {
  id?: number;
  title?: string;
  description?: string;
  website?: string;
  location?: GeoPoint;
  status?: string;
  post_dt?: string;
  edited_dt?: string;
  price?: string;
  category?: string;
  picture?: Picture;
  accountId?: string;
  rating?: number;
}

export type GeoPoint = {
  lat: number;
  lon: number;
}

export type Picture = {
  link1: string;
  link2: string;
}

export type PostStateType = {
  status?: 'ok' | 'error';
  post?: Post | Post[];
  category?: string | string[];
};

export type PostModelType = {
  namespace: string;
  state: PostStateType;
  effects: {
    searchByKeywords: Effect;
    searchByCategory: Effect;
    get: Effect;
    update: Effect;
    category: Effect;
  };
  reducers: {
    searchPosts: Reducer<PostStateType>;
    getPost: Reducer<PostStateType>;
    putPost: Reducer<PostStateType>;
    getCategories: Reducer<PostStateType>;
  };
};

const PostModel: PostModelType = {
  namespace: 'post',

  state: {
    status: undefined,
    post: [],
    category: [],
  },

  effects: {
    *searchByKeywords({ payload }, { call, put }) {
      const { data, response } = yield call(searchPostsByKeywords, payload);
      if (response && response.ok) {
        yield put({
          type: 'searchPosts',
          payload: data,
        });
      } else {
        message.error('No matching search results.');
      }
    },
    *searchByCategory({ payload }, { call, put }) {
      const { data, response } = yield call(searchPostsByCategory, payload);
      if (response && response.ok) {
        yield put({
          type: 'searchPosts',
          payload: data,
        });
      } else {
        message.error('No matching search results.');
      }
    },
    *get({ payload }, { call, put }) {
      const { data, response } = yield call(getPost, payload);
      if (response && response.ok) {
        yield put({
          type: 'getPost',
          payload: data,
        });
      } else {
        message.error('Unable to fetch post details.');
      }
    },
    *update({ payload }, { call, put }) {
      const { data, response } = yield call(updatePost, payload);
      if (response && response.ok) {
        yield put({
          type: 'putPost',
          payload: data,
        });
      } else {
        message.error('Failed to update post.');
      }
    },
    *category({ payload }, { call, put }) {
      const { data, response } = yield call(getCategories);
      if (response && response.ok && data) {
        yield put({
          type: 'getCategories',
          payload: data,
        });
      } else {
        message.error('Failed to fetch categories.');
      }
    },
  },

  reducers: {
    searchPosts(state, { payload }) {
      return {
        ...state,
        status: payload.results !== undefined ? 'ok' : 'error',
        post: payload.results,
      };
    },
    getPost(state, { payload }) {
      return {
        ...state,
        status: payload.results !== undefined ? 'ok' : 'error',
        post: payload.results,
      };
    },
    putPost(state, { payload }) {
      return {
        ...state,
        status: payload.results !== undefined ? 'ok' : 'error',
        post: payload.results,
      };
    },
    getCategories(state, { payload }) {
      return {
        ...state,
        status: payload.results !== undefined ? 'ok' : 'error',
        category: payload.results,
      };
    },
  },
};

export default PostModel;
