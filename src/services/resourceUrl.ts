const { API_URL } = process.env;
console.log(API_URL);

const BASE_URL = 'http://localhost:8080';
export const REFRESH_TOKEN = `${BASE_URL}/refreshtoken`;
export const AUTHENTICATE = `${BASE_URL}/authenticate`;
export const REGISTER = `${BASE_URL}/register`;
