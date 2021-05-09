import request from '@/utils/request';
import {getApiBaseUrl} from "@/utils/utils";

const BASE_URL = getApiBaseUrl();
export async function query(): Promise<any> {
  return request(`${BASE_URL}/api/users`);
}

export async function queryCurrent(): Promise<any> {
  return request(`${BASE_URL}/getProfile`);
}

export async function queryNotices(): Promise<any> {
  return request(`${BASE_URL}/api/notices`);
}
