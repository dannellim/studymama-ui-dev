import type { Reducer, Effect } from 'umi';
import { registerAccount } from '@/services/register';
import { setAuthority } from '@/utils/authority';
import { message } from 'antd';

export type StateType = {
  status?: 'ok' | 'error';
  type?: string;
  currentAuthority?: 'user' | 'guest' | 'admin';
};

export type RegisterModelType = {
  namespace: string;
  state: StateType;
  effects: {
    register: Effect;
  };
  reducers: {
    registerUser: Reducer<StateType>;
  };
};

const Model: RegisterModelType = {
  namespace: 'register',

  state: {
    status: undefined,
  },

  effects: {
    *register({ payload }, { call, put }) {
      const {data, response} = yield call(registerAccount, payload);
      if (response && response.ok) {
          message.success(`User ${data.username} registered successfully. User Id: ${data.id}`)
          yield put({
            type: 'registerUser',
            payload: data,
          });
      } else {
        message.error("User registration failed.");
      }
    }
  },

  reducers: {
    registerUser(state, { payload }) {
      if (payload.role === 'ROLE_USER') {
        setAuthority('user');
      } else {
        setAuthority('guest');
      }
      return {
        ...state,
        status: ( payload.token !== undefined )?"ok":"error",
        type: payload.token,
        token: payload.token,
      };
    },
  },
};

export default Model;
