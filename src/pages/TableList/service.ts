import request from '@/utils/request';
import type {PostListParams} from './data.d';
import {GeoPoint, Picture, Post} from "@/models/post";
import {PostParamsType, updatePostSvc} from "@/services/post";
import {GET_ALL_POST, SEARCH_POST_BY_KEYWORD} from "@/services/resourceUrl";

export async function getAllCategories() {
  return request('http://localhost:8080/categoryList');
}

export async function updateRating(params: PostListParams) {
  return request('/api/rating', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}

export async function allPost(params?: PostListParams) {
  return request('/allPost', {
    params,
  });
}

export async function searchPostByCategory(params?: PostListParams) {
  return request('/searchPostByCategory', {
    params,
  });
}

export async function searchPostByKeywordInTitleDescCategory(params?: PostListParams) {
  return request(SEARCH_POST_BY_KEYWORD, {
    params,
  });
}

export async function deletePost(params: { id?: number }) {
  return request('/post', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addPost(params: Post) {
  // return request('/post', {
  //   method: 'POST',
  //   data: {
  //     ...params,
  //     method: 'post',
  //   },
  // });
  return updatePostSvc(params);
}

export async function updatePost(params: Post) {
  return request('/post', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}


export async function allPosts(params: PostParamsType) {
  return request(`${GET_ALL_POST}?currentPage=${params.currentPage}&pageSize=${params.pageSize}` ,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    }).then((response) => {
    if (response.response.ok) {
      return {
        data: response.data.content,
        success: true,
        total: response.data.totalElements,
      };
    } else {
      return {
        data: [],
        success: false,
        total: 0,
      };
    }
  }).catch((error) => {
    return error;
  });
}
