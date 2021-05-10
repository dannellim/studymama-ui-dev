import type { Effect, Reducer } from 'umi';

import {queryCurrent, query as queryUsers, updateProfile} from '@/services/user';
import {getUserId, getUserProfile, setUserProfile} from "@/utils/authority";
import {message} from "antd";

export type UserProfile = {
  createdBy?: string;
  createdDate?:string;
  lastModifiedBy?: string;
  lastModifiedDate?: string;
  id?: number,
  username?:string;
  firstname?:string;
  lastname?: string;
  contact?: string;
  address?: string;
  unreadCount?: number;
};

export type UserStateType = {
  status?: 'ok' | 'error';
  userProfile?: UserProfile;
};

export type UserModelState = {
  currentUser?: UserProfile;
};

export type UserModelType = {
  namespace: 'user';
  state: UserModelState;
  effects: {
    fetch: Effect;
    fetchCurrent: Effect;
    saveProfileData: Effect;
  };
  reducers: {
    saveCurrentUser: Reducer<UserModelState>;
    changeCurrentUser: Reducer<UserModelState>;
    changeNotifyCount: Reducer<UserModelState>;
  };
};

const UserModel: UserModelType = {
  namespace: 'user',

  state: {
    currentUser: {},
  },

  effects: {
    *saveProfileData({payload}, { call, put }) {
      const response = yield call(updateProfile, payload);
      if (response === undefined || !response.ok) {
        message.error('Unable to update profile.');
      } else {
        message.success('Profile updated successfully!')
        yield put({
          type: 'changeCurrentUser',
          payload: response,
        });
        window.location.href = '/welcome';
      }
    },
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrent(_, { call, put }) {
      if (getUserProfile() === null) {
        const response = yield call(queryCurrent, getUserId());
        yield put({
          type: 'changeCurrentUser',
          payload: response,
        });
      } else {
        yield put({
          type: 'saveCurrentUser',
          payload: JSON.parse(getUserProfile() || '{}'),
        });
      }
    },
  },

  reducers: {
    changeCurrentUser(state, action) {
      setUserProfile(JSON.stringify(action.payload || {}));
      return {
        ...state,
        currentUser: action.payload,
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};

export default UserModel;
