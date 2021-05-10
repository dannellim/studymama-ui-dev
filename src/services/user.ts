import request from '@/utils/request';
import {GET_PROFILE, PUT_PROFILE} from "@/services/resourceUrl";
import {getUserId} from "@/utils/authority";
import {UserProfile} from "@/models/user";

export type UserParamType = {
  username?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  contact?: string;
  address?: string;
  role?: string;
};

export async function query(): Promise<any> {
  return queryCurrent(getUserId() || '');
}

export async function queryCurrent(username: string): Promise<any> {
  return request(GET_PROFILE,
    {
      method: 'POST',
      data: { username },
    }).then((response) => {
    return response;
  }).catch((error) => {
    return error;
  });
}

export async function updateProfile(params: UserProfile): Promise<any> {
  return request(PUT_PROFILE,
    {
      method: 'POST',
      data: {
        firstName: params.firstName,
        lastName: params.lastName,
        username: params.username,
        contact: params.contact,
        password: params.password,
        address: params.address,
      },
    }).then((response) => {
    return response;
  }).catch((error) => {
    return error;
  });
}

export async function queryNotices(): Promise<any> {
  return request(`/api/notices`);
}
