import request from '@/utils/request';
import {getApiBaseUrl, getStudyMamaUi} from "@/utils/utils";
import {GET_PROFILE} from "@/services/resourceUrl";
import {LoginParamsType} from "@/services/login";
import {getToken} from "@/utils/authority";

const BASE_URL = getApiBaseUrl();
export async function query(): Promise<any> {
  return request(`${BASE_URL}/getProfile`);
}

export async function queryCurrent(params: LoginParamsType): Promise<any> {
  return request(GET_PROFILE,
    {
      method: 'POST',
      data: {
        'username': params.username,
        'password': '',
        'role': '',
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

export async function queryNotices(): Promise<any> {
  return request(`${BASE_URL}/api/notices`);
}
