const { API_URL } = process.env;
console.log(API_URL);

const BASE_URL = 'http://localhost:8080';
export const REFRESH_TOKEN = `${BASE_URL}/refreshtoken`;
export const AUTHENTICATE = `${BASE_URL}/authenticate`;
export const REGISTER = `${BASE_URL}/register`;
export const SEARCH_POST_BY_KEYWORD = `${BASE_URL}/postService/searchPostByKeywordInTitleDescCategory`;
export const SEARCH_POST_BY_CATEGORY = `${BASE_URL}/postService/searchPostByCategory`;
export const SEARCH_POST_BY_SIMILAR_CAT = `${BASE_URL}/postService/searchPostBySimilarCategory`;
export const GET_POST = `${BASE_URL}/postService/post`;
export const PUT_POST = `${BASE_URL}/postService/post`;
export const GET_CATEGORIES = `${BASE_URL}/categorylist`;
