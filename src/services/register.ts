import {requestWithoutAuthorization} from "@/utils/request";
import {REGISTER} from "@/services/resourceUrl";

export type RegisterParamsType = {
  username: string;
  password: string;
  role: string;
};

export async function registerAccount(params: RegisterParamsType) {
  const paramString = JSON.stringify(params);
  return requestWithoutAuthorization(REGISTER,
    {
      method: 'POST',
      data: paramString,
      headers: {
        'Content-Type': 'application/json',
      }
    }).then((response) => {
      return response;
  }).catch((error) => {
    return error;
  });
}
