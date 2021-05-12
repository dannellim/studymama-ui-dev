import {getApiBaseUrl} from "@/utils/utils";

const BASE_URL = getApiBaseUrl();
export const REFRESH_TOKEN = `${BASE_URL}/refreshtoken`;
export const AUTHENTICATE = `${BASE_URL}/authenticate`;
export const REGISTER = `${BASE_URL}/register`;
export const SEARCH_POST_BY_KEYWORD = `${BASE_URL}/postService/searchPostByKeywordInTitleDescCategory`;
export const SEARCH_POST_BY_CATEGORY = `${BASE_URL}/postService/searchPostByCategory`;
export const SEARCH_POST_BY_SIMILAR_CAT = `${BASE_URL}/postService/searchPostBySimilarCategory`;
export const GET_POST = `${BASE_URL}/postService/post`;
export const PUT_POST = `${BASE_URL}/postService/post`;
export const PUT_POST_form_submit = `${BASE_URL}/postFormSubmit`;
export const GET_CATEGORIES = `${BASE_URL}/categoryList`;
export const GET_PROFILE = `${BASE_URL}/getProfile`;
export const PUT_PROFILE = `${BASE_URL}/updateProfile`;
export const GET_PROFILE_PICTURE = `${BASE_URL}/profilePicture`;
export const GET_ALL_POST = `${BASE_URL}/postService/allPost`;

//"http://studymama-load-balancer-795957589.ap-southeast-1.elb.amazonaws.com:8080/postService/allPost?currentPage=0&pageSize=100"
