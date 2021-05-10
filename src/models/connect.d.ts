import type { MenuDataItem, Settings as ProSettings } from '@ant-design/pro-layout';
import { GlobalModelState } from './global';
import { UserModelState } from './user';
import type { StateType } from './login';
import {PostParamsType} from "@/services/post";

export { GlobalModelState, UserModelState };

export type Loading = {
  global: boolean;
  effects: Record<string, boolean | undefined>;
  models: {
    global?: boolean;
    menu?: boolean;
    setting?: boolean;
    user?: boolean;
    login?: boolean;
  };
};

export type ConnectState = {
  global: GlobalModelState;
  user: UserModelState;
  loading: Loading;
  settings: ProSettings;
  login: StateType;
  postParam: PostParamsType;
};

export type Route = {
  routes?: Route[];
} & MenuDataItem;
