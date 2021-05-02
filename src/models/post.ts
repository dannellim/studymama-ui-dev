import type { Reducer, Effect } from 'umi';
import { registerAccount } from '@/services/register';
import { setAuthority } from '@/utils/authority';
import { message } from 'antd';

export type PostStateType = {
  status?: 'ok' | 'error';
  type?: string;
  currentAuthority?: 'user' | 'guest' | 'admin';
};

export type PostModelType = {
  namespace: string;
  state: StateType;
  effects: {
    register: Effect;
  };
  reducers: {
    registerUser: Reducer<PostStateType>;
  };
};

const PostModel: PostModelType = {
  namespace: 'post',

  state: {
    status: undefined,
  },

  effects: {
    *search({ payload }, { call, put }) {
      const { data, response } = yield call(registerAccount, payload);
      if (response && response.ok) {
        message.success(
          `User ${data.username} registered successfully. User Id: ${data.user_profile_id}`,
        );
        yield put({
          type: 'registerUser',
          payload: data,
        });
      } else {
        message.error('User registration failed.');
      }
    },
  },

  reducers: {
    searchPost(state, { payload }) {
      if (payload.role === 'ROLE_USER') {
        setAuthority('user');
      } else {
        setAuthority('guest');
      }
      return {
        ...state,
        status: payload.token !== undefined ? 'ok' : 'error',
        type: payload.token,
        token: payload.token,
      };
    },
  },
};

export default PostModel;
