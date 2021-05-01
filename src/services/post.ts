import { Request, Response } from 'express';
import { parse } from 'url';
import {Post, PostListParams} from '@/pages/TableList/data';
import {allPost, searchPostByCategory, searchPostByKeywordInTitleDescCategory} from "@/pages/TableList/service";
import {now} from "moment";


const postList = (current: number, pageSize: number) => {
  const tableListDataSource: Post[] = [];
  allPost({current: current, pageSize: pageSize}).then(
    (response) => tableListDataSource.push(response.data)
  );
  tableListDataSource.reverse();
  return tableListDataSource;
}

// @ts-ignore
const postListByCategory = (category: string) => {
  const tableListDataSource: Post[] = [];
  searchPostByCategory({category: category}).then((response) => tableListDataSource.push(response.data));
  tableListDataSource.reverse();
  return tableListDataSource;
}

// @ts-ignore
const postListByKeywords = (keyword: string) => {
  const tableListDataSource: Post[] = [];
  searchPostByKeywordInTitleDescCategory({keyword: keyword}).then((response) => tableListDataSource.push(response.data));
  tableListDataSource.reverse();
  return tableListDataSource;
}

let postListDS = postList(1, 100);

function getPost(req: Request, res: Response, u: string) {
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }
  const { current = 1, pageSize = 10 } = req.query;
  const params = (parse(realUrl, true).query as unknown) as PostListParams;

  let dataSource = [...postListDS].slice(
    ((current as number) - 1) * (pageSize as number),
    (current as number) * (pageSize as number),
  );
  const sorter = JSON.parse(params.sorter as any);
  if (sorter) {
    dataSource = dataSource.sort((prev, next) => {
      let sortNumber = 0;
      Object.keys(sorter).forEach((key) => {
        if (sorter[key] === 'descend') {
          if (prev[key] - next[key] > 0) {
            sortNumber += -1;
          } else {
            sortNumber += 1;
          }
          return;
        }
        if (prev[key] - next[key] > 0) {
          sortNumber += 1;
        } else {
          sortNumber += -1;
        }
      });
      return sortNumber;
    });
  }
  if (params.filter) {
    const filter = JSON.parse(params.filter as any) as {
      [key: string]: string[];
    };
    if (Object.keys(filter).length > 0) {
      dataSource = dataSource.filter((item) => {
        return Object.keys(filter).some((key) => {
          if (!filter[key]) {
            return true;
          }
          if (filter[key].includes(`${item[key]}`)) {
            return true;
          }
          return false;
        });
      });
    }
  }

  if (params.category) {
    dataSource = dataSource.filter((data) => data.category?.includes(params.category || ''));
  }
  const result = {
    data: dataSource,
    total: postListDS.length,
    success: true,
    pageSize,
    current: parseInt(`${params.current}`, 10) || 1,
  };

  return res.json(result);
}

function postPost(req: Request, res: Response, u: string, b: Request) {
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }

  const body = (b && b.body) || req.body;
  const { method, name, desc, id } = body;

  switch (method) {
    case 'delete':
      postListDS = postListDS.filter((item) => id.indexOf(item.id) === -1);
      break;
    case 'post':
      (() => {
        const i = Math.ceil(Math.random() * 10000);
        const newPost = {
            id: i,
            title: 'New Post about enrichment centers',
            description: 'This is new a post',
            website: 'www.rivervale.com',
            location: {lon: 23.0, lat:28.2},
            status: 'New',
            post_dt: now().toString(),
            edited_dt: now().toString(),
            price: '$100 for 8 classes',
            category: 'Enrichment',
            picture: { link1: 'https://www.rivervalemall.com.sg/ori/wp-content/uploads/2020/01/12020_00b3e4f215c332840bc585d8564f1c05.png', link2: 'https://funwithabacus.com/'},
            accountId: 1,
            rating: 1,
        };
        /*postListDS.unshift(newPost);*/
        return res.json(newPost);
      })();
      return;

    case 'update':
      (() => {
        let newPost = {};
        postListDS = postListDS.map((item) => {
          if (item.id === id) {
            newPost = { ...item, desc, name };
            return { ...item, desc, name };
          }
          return item;
        });
        return res.json(newPost);
      })();
      return;
    default:
      break;
  }

  const result = {
    list: postListDS,
    pagination: {
      total: postListDS.length,
    },
  };

  res.json(result);
}

export default {
  'GET /post': getPost,
  'POST /post': postPost,
};
