import { stringify } from 'querystring';
import type { Reducer, Effect } from 'umi';
import { history } from 'umi';

import { accountLogin } from '@/services/login';
import { resetCurrent, setUserProfile, setToken, getUserId, setUserId } from '@/utils/authority';
import {getContentAppUrl, getPageQuery} from '@/utils/utils';
import { message } from 'antd';
import {queryCurrent} from "@/services/user";
import {UserProfile} from "@/models/user";

export type StateType = {
  status?: 'ok' | 'error';
  type?: string;
  token?: string;
  currentUser?: UserProfile;
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
    setUserProfile: Reducer<StateType>;
  };
};

const Model: LoginModelType = {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const redirectUrl = payload.gotoContentSite ? getContentAppUrl() : '/welcome';
      const {data, response} = yield call(accountLogin, payload);
      resetCurrent();
      if (response === undefined || !response.ok) {
        message.error('Login Failed! \n Please check username / password.');
      } else {
        yield put({
          type: 'changeLoginStatus',
          payload: data,
          username: payload.username,
        });
        message.success('Login Successful!');
        const userProfile = yield call(queryCurrent, getUserId());
        if (userProfile.response === undefined || !userProfile.response.ok) {
          message.error('Unable to load user profile...');
        } else {
          userProfile.data.username = getUserId();
          yield put({
            type: 'setUserProfile',
            userProfile: userProfile.data,
          });
        }
        window.location.href = redirectUrl;
      }
    },
    logout() {
      const { redirect } = getPageQuery();
      resetCurrent();
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
    changeLoginStatus(state, { payload, username }) {
      setToken(payload.token);
      setUserId(username);
      return {
        ...state,
        status: ( payload.token )?"ok":"error",
        type: 'user',
        token: payload.token,
      };
    },
    setUserProfile(state, { userProfile }) {
      setUserProfile(JSON.stringify(userProfile));
      return {
        ...state,
        currentUser: userProfile,
      };
    },
  },
};

export default Model;
