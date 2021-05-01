import request from '@/utils/request';
import {AUTHENTICATE, REFRESH_TOKEN} from "@/services/resourceUrl";

export type LoginParamsType = {
  username: string;
  password: string;
};

export async function accountLogin(params: LoginParamsType) {
  return request(AUTHENTICATE,
    {
      method: 'POST',
      data: JSON.stringify(params),
      headers: {
        'Content-Type': 'application/json',
      }
    }).then((response) => {
    return response;
  }).catch((error) => {
    return error;
  });
}

export async function refreshLogin(params: LoginParamsType) {
  return request(REFRESH_TOKEN,
    {
      method: 'POST',
      data: JSON.stringify(params),
      headers: {
        'Content-Type': 'application/json',
      }
    }).then((response) => {
    return response;
  }).catch((error) => {
    return error;
  });
}

