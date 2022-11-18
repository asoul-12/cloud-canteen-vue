import axios from './http';
import { StringResponse } from '@/types/common/responseData';
import { CategoryInfo } from '@/types/domain/dish';

export const dish = {
  pageByQuery(
    currentPage: number,
    pageSize: number,
    name: string
  ): StringResponse {
    return axios.get(`/dish/${currentPage}/${pageSize}/${name}`);
  },
  page(currentPage: number, pageSize: number): StringResponse {
    return axios.get(`/dish/${currentPage}/${pageSize}`);
  },
  save(categoryInfo: CategoryInfo): StringResponse {
    return axios.post('/dish', categoryInfo);
  },
  batchDelete(idArray: Array<number>): StringResponse {
    return axios.put('/dish/batchDelete/', idArray);
  },
  update(categoryInfo: CategoryInfo): StringResponse {
    return axios.put('/dish', categoryInfo);
  },
};

export const category = {
  pageByQuery(
    currentPage: number,
    pageSize: number,
    name: string
  ): StringResponse {
    return axios.get(`/category/${currentPage}/${pageSize}/${name}`);
  },
  page(currentPage: number, pageSize: number): StringResponse {
    return axios.get(`/category/${currentPage}/${pageSize}`);
  },

  categoryList(canteenId: string): StringResponse {
    return axios.get(`/category/list/${canteenId}`);
  },

  save(categoryInfo: CategoryInfo): StringResponse {
    return axios.post('/category', categoryInfo);
  },
  batchDelete(idArray: Array<number>): StringResponse {
    return axios.put('/category/batchDelete/', idArray);
  },
  update(categoryInfo: CategoryInfo): StringResponse {
    return axios.put('/category', categoryInfo);
  },
};
