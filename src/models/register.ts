import type { Reducer, Effect } from 'umi';
import { registerAccount } from '@/services/register';
import {resetCurrent, setAuthority} from '@/utils/authority';
import { message } from 'antd';

export type RegisterStateType = {
  status?: 'ok' | 'error';
  type?: string;
  currentAuthority?: 'user' | 'guest' | 'admin';
};

export type RegisterModelType = {
  namespace: string;
  state: RegisterStateType;
  effects: {
    register: Effect;
  };
  reducers: {
    registerUser: Reducer<RegisterStateType>;
  };
};

const RegisterModel: RegisterModelType = {
  namespace: 'register',

  state: {
    status: undefined,
  },

  effects: {
    *register({ payload }, { call, put }) {
      resetCurrent();
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
    registerUser(state, { payload }) {
      if (payload.role === 'ROLE_USER') {
        setAuthority('user');
      } else {
        setAuthority('guest');
      }
      return {
        ...state,
        status: payload.token !== undefined ? 'ok' : 'error',
        type: 'login',
        token: payload.token,
      };
    },
  },
};

export default RegisterModel;
