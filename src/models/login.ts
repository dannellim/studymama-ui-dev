import { stringify } from 'querystring';
import type { Reducer, Effect } from 'umi';
import { history } from 'umi';

import { accountLogin } from '@/services/login';
import { setToken} from '@/utils/authority';
import { getContentAppUrl, getPageQuery } from '@/utils/utils';
import { message } from 'antd';
import {queryCurrent} from "@/services/user";
import {CurrentUser, UserModelState} from "@/models/user";

export type StateType = {
  status?: 'ok' | 'error';
  type?: string;
  token?: string;
  currentUser?: CurrentUser;
  currentAuthority?: 'user' | 'guest' | 'admin';
};

export type LoginModelType = {
  namespace: string;
  state: StateType;
  effects: {
    login: Effect;
    logout: Effect;
  };
  reducers: {
    changeLoginStatus: Reducer<StateType>;
    updateUserProfile: Reducer<UserModelState>;
  };
};

const Model: LoginModelType = {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const {data, response} = yield call(accountLogin, payload);
      // Login successfully
      if (response === undefined || !response.ok) {
        message.error('Login Failed! \n Please check username / password.');
      } else {
        yield put({
          type: 'changeLoginStatus',
          payload: data,
        });
        message.success('Login Successful!');
        const userProfile = yield call(queryCurrent, payload);
        if (userProfile.response === undefined || !userProfile.response.ok) {
          message.error('Unable to load user profile...');
        } else {
          yield put({
            type: 'updateUserProfile',
            userProfile: userProfile.data,
          });
        }

        window.location.href = '/' + getContentAppUrl();
      }
    },
    logout() {
      const { redirect } = getPageQuery();
      if (window.location.pathname !== '/user/login' && !redirect) {
        history.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setToken(payload.token);
      return {
        ...state,
        status: ( payload.token )?"ok":"error",
        type: 'user',
        token: payload.token,
      };
    },
    updateUserProfile(state, { userProfile }) {
      return {
        ...state,
        currentUser: {
          name: userProfile.firstName + ' ' + userProfile.lastName,
          userid: userProfile.id,
          tags: [
            {'key': 'contact', 'label': userProfile.contact},
            {'key': 'address', 'label': userProfile.address},
            {'key': 'lastModifiedDate', 'label': userProfile.lastModifiedDate},
          ],
        },
      };
    },
  },
};

export default Model;
