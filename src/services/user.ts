import request from '@/utils/request';
import {getApiBaseUrl, getStudyMamaUi} from "@/utils/utils";
import {GET_PROFILE} from "@/services/resourceUrl";
import {getToken} from "@/utils/authority";
import {UserProfile} from "@/models/user";

const BASE_URL = getApiBaseUrl();
export async function query(): Promise<any> {
  return request(`${BASE_URL}/getProfile`);
}

export async function queryCurrent(username: string): Promise<any> {
  return request(GET_PROFILE,
    {
      method: 'POST',
      data: {
        'username': username,
      },
      headers: {
        'Access-Control-Allow-Origin': JSON.stringify(getStudyMamaUi()),
        Authorization: 'Bearer ' + getToken(),
        'Content-Type': 'application/json',
      }
    }).then((response) => {
    return response;
  }).catch((error) => {
    return error;
  });
}

export async function updateProfile(params: UserProfile): Promise<any> {
  return request(GET_PROFILE,
    {
      method: 'POST',
      data: JSON.stringify(params),
      headers: {
        'Access-Control-Allow-Origin': JSON.stringify(getStudyMamaUi()),
        Authorization: 'Bearer ' + getToken(),
        'Content-Type': 'application/json',
      }
    }).then((response) => {
    return response;
  }).catch((error) => {
    return error;
  });
}

export async function queryNotices(): Promise<any> {
  return request(`${BASE_URL}/api/notices`);
}
