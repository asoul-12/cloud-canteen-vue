import axios from './http';
import { StringResponse } from '@/types/common/responseData';
import { EmployeeInfo } from '@/types/domain/user';

export const staff = {
  page(currentPage: number, pageSize: number, name: string): StringResponse {
    return axios.get(`/staff/${currentPage}/${pageSize}/${name}`);
  },
  page2(currentPage: number, pageSize: number): StringResponse {
    return axios.get(`/staff/${currentPage}/${pageSize}`);
  },
  save(employee: EmployeeInfo): StringResponse {
    return axios.post('/staff', employee);
  },
  update(employee: EmployeeInfo): StringResponse {
    return axios.put('/staff', employee);
  },
  batchDelete(idArray: Array<number>): StringResponse {
    return axios.put('/staff/batchDelete/', idArray);
  },
};
