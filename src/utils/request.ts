import {extend} from 'umi-request';
import { notification } from 'antd';
import {getToken} from "@/utils/authority";
import {getStudyMamaUi} from "@/utils/utils";

const codeMessage: { [status: number]: string } = {
  200: 'The server successfully returned the requested data.',
  201: 'New or modified data is successful.',
  202: 'A request has entered the background queue (asynchronous task).',
  204: 'The data was deleted successfully.',
  400: 'There was an error in the request sent, and the server did not create or modify data.',
  401: 'The user does not have permission (the token, username, password is wrong).',
  403: 'The user is authorized, but access is forbidden.',
  404: 'The request sent was for a record that did not exist, and the server did not operate.',
  406: 'The requested format is not available.',
  410: 'The requested resource is permanently deleted and will no longer be available.',
  415: 'Unsupported content type.',
  422: 'When creating an object, a validation error occurred.',
  500: 'An error occurred in the server, please check the server.',
  502: 'Gateway error.',
  503: 'The service is unavailable, and the server is temporarily overloaded or maintained.',
  504: 'The gateway timed out.',
};

const errorHandler = (error: { response: Response }): Response => {
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;

    notification.error({
      message: `Request error ${status}: ${url}`,
      description: errorText,
    });
  } else if (!response) {
    notification.error({
      description: 'Your network is abnormal and cannot connect to the server',
      message: 'Network anomaly',
    });
  }
  return response;
};

function createRequestWithoutAuthorization() {
  const myRequest = extend({
    errorHandler, // default error handling
    getResponse: true,
    headers: {
      'Access-Control-Allow-Origin': JSON.stringify(getStudyMamaUi()),
      'Content-Type': 'application/json',
    },
  });
  return myRequest;
}
function createRequest() {
  const myRequest = extend({
    errorHandler, // default error handling
    getResponse: true,
    headers: {
      'Access-Control-Allow-Origin': JSON.stringify(getStudyMamaUi()),
      Authorization: `Bearer ${getToken()}`,
      'Content-Type': 'application/json',
    },
  });
  return myRequest;
}

const request =  createRequest();
export const requestWithoutAuthorization = createRequestWithoutAuthorization();
export default request;
