import request from '@/utils/request';
import type {PostListParams, Post} from './data.d';

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
  return request('/searchPostByKeywordInTitleDescCategory', {
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
  return request('/post', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
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
