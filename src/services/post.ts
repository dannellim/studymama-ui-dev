import request from "@/utils/request";
import {allPost, searchPostByCategory, searchPostByKeywordInTitleDescCategory} from "@/pages/TableList/service";
import {GET_CATEGORIES, SEARCH_POST_BY_CATEGORY, SEARCH_POST_BY_KEYWORD} from "@/services/resourceUrl";
import {GET_POST} from "@/services/resourceUrl";
import {PUT_POST} from "@/services/resourceUrl";
import {Post} from "@/models/post";

export type PostParamsType = {
  categoryList?: string[],
  category?: string,
  key?: string,
  keyword?: string,
  currentPage?: number,
  pageSize?: number,
  post?: Post,
};

export async function searchPostsByKeywords(params: PostParamsType) {
  return request(`${SEARCH_POST_BY_KEYWORD}?keyword=${params.keyword}&currentPage=${params.currentPage || 1}&pageSize=${params.pageSize || 1}` ,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    }).then((response) => {
      return response;
  }).catch((error) => {
    return error;
  });
}

export async function searchPostsByCategory(params: PostParamsType) {
  return request(SEARCH_POST_BY_CATEGORY,
    {
      method: 'GET',
      data: {},
      params: {
        category: params.category,
        currentPage: params.currentPage,
        pageSize: params.pageSize,
      },
      headers: {
        'Content-Type': 'application/json',
      }
    }).then((response) => {
      return response;
  }).catch((error) => {
    return error;
  });
}

export async function getPost(params: PostParamsType) {
  const paramString = JSON.stringify(params);
  return request(GET_POST,
    {
      method: 'GET',
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

export async function updatePostSvc(params: PostParamsType) {
  const paramString = JSON.stringify(params);
  return request(PUT_POST,
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

export function getCategoryListSvc() {
  var categoryList: string[] = CATEGORY_LIST.slice();
  getCategories()
    .then((response) => categoryList.push(response.data))
    .catch((error) => categoryList = CATEGORY_LIST.slice());
  return categoryList;
}

export async function getCategories() {
  return request(GET_CATEGORIES ,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    }).then((response) => {
    return response;
  }).catch((error) => {
    return error;
  });
}

// @ts-ignore
const postList = (current: number, pageSize: number) => {
  const tableListDataSource: Post[] = [];
  allPost({current: current, pageSize: pageSize}).then(
    (response) => tableListDataSource.push(response.data)
  );
  tableListDataSource.reverse();
  return tableListDataSource;
}

// @ts-ignore
const getPostsByCategory = (category: string) => {
  const tableListDataSource: Post[] = [];
  searchPostByCategory({category: category}).then((response) => tableListDataSource.push(response.data));
  tableListDataSource.reverse();
  return tableListDataSource;
}

// @ts-ignore
const getPostsByKeywords = (keyword: string) => {
  const tableListDataSource: Post[] = [];
  searchPostByKeywordInTitleDescCategory({keyword: keyword}).then((response) => tableListDataSource.push(response.data));
  tableListDataSource.reverse();
  return tableListDataSource;
}

//let postListDS = postList(1, 100);

// function getPost1(req: Request, res: Response, u: string) {
//   let realUrl = u;
//   if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
//     realUrl = req.url;
//   }
//   const { current = 1, pageSize = 10 } = req.query;
//   const params = (parse(realUrl, true).query as unknown) as PostListParams;
//
//   let dataSource = [...postListDS].slice(
//     ((current as number) - 1) * (pageSize as number),
//     (current as number) * (pageSize as number),
//   );
//   const sorter = JSON.parse(params.sorter as any);
//   if (sorter) {
//     dataSource = dataSource.sort((prev, next) => {
//       let sortNumber = 0;
//       Object.keys(sorter).forEach((key) => {
//         if (sorter[key] === 'descend') {
//           if (prev[key] - next[key] > 0) {
//             sortNumber += -1;
//           } else {
//             sortNumber += 1;
//           }
//           return;
//         }
//         if (prev[key] - next[key] > 0) {
//           sortNumber += 1;
//         } else {
//           sortNumber += -1;
//         }
//       });
//       return sortNumber;
//     });
//   }
//   if (params.filter) {
//     const filter = JSON.parse(params.filter as any) as {
//       [key: string]: string[];
//     };
//     if (Object.keys(filter).length > 0) {
//       dataSource = dataSource.filter((item) => {
//         return Object.keys(filter).some((key) => {
//           if (!filter[key]) {
//             return true;
//           }
//           if (filter[key].includes(`${item[key]}`)) {
//             return true;
//           }
//           return false;
//         });
//       });
//     }
//   }
//
//   if (params.category) {
//     dataSource = dataSource.filter((data) => data.category?.includes(params.category || ''));
//   }
//   const result = {
//     data: dataSource,
//     total: postListDS.length,
//     success: true,
//     pageSize,
//     current: parseInt(`${params.current}`, 10) || 1,
//   };
//
//   return res.json(result);
// }

// function postPost(req: Request, res: Response, u: string, b: Request) {
//   let realUrl = u;
//   if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
//     realUrl = req.url;
//   }
//
//   const body = (b && b.body) || req.body;
//   const { method, name, desc, id } = body;
//
//   switch (method) {
//     case 'delete':
//       postListDS = postListDS.filter((item) => id.indexOf(item.id) === -1);
//       break;
//     case 'post':
//       (() => {
//         const i = Math.ceil(Math.random() * 10000);
//         const newPost = {
//             id: i,
//             title: 'New Post about enrichment centers',
//             description: 'This is new a post',
//             website: 'www.rivervale.com',
//             location: {lon: 23.0, lat:28.2},
//             status: 'New',
//             post_dt: now().toString(),
//             edited_dt: now().toString(),
//             price: '$100 for 8 classes',
//             category: 'Enrichment',
//             picture: { link1: 'https://www.rivervalemall.com.sg/ori/wp-content/uploads/2020/01/12020_00b3e4f215c332840bc585d8564f1c05.png', link2: 'https://funwithabacus.com/'},
//             accountId: 1,
//             rating: 1,
//         };
//         /*postListDS.unshift(newPost);*/
//         return res.json(newPost);
//       })();
//       return;
//
//     case 'update':
//       (() => {
//         let newPost = {};
//         postListDS = postListDS.map((item) => {
//           if (item.id === id) {
//             newPost = { ...item, desc, name };
//             return { ...item, desc, name };
//           }
//           return item;
//         });
//         return res.json(newPost);
//       })();
//       return;
//     default:
//       break;
//   }
//
//   const result = {
//     list: postListDS,
//     pagination: {
//       total: postListDS.length,
//     },
//   };
//
//   res.json(result);
// }

export default {
  'GET /post': getPost,
  //'POST /post': postPost,
};

const CATEGORY_LIST: string[] = [
  "Groceries",
  "Restuarant",
  "Takeout",
  "Hotels",
  "Banks",
  "Gas Station",
  "Parking Lots",
  "Pharmacies",
  "Post Offices",
  "Medical"
  ];
