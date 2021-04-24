import request from '@/utils/request';
import extend from 'umi-request';

export type LoginParamsType = {
  userName: string;
  password: string;
  mobile: string;
  captcha: string;
};

export async function fakeAccountLogin(params: LoginParamsType) {
  // return request('/api/login/account', {
  //   method: 'POST',
  //   data: params,
  // });
  return accountLogin(params)
}


export async function accountLogin(params: LoginParamsType) {
  return extend('http://localhost:8080/authenticate', {
    method: "POST",
    data: params,
    headers: {
          "Content-Type": "application/json",
    },
  });

  // return request('http://localhost:8080/authenticate', {
  //   method: "POST",
  //   requestType: "json",
  //   data: params,
  //   mode: "no-cors",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
