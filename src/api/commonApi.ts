import axios from '@/api/http';
import { PageInfo } from '@/types/common/page';
import { StringResponse } from '@/types/common/responseData';

export const commonApi = {
  //
  pageByQuery(
    entity: string,
    canteenId: string,
    page: PageInfo
  ): StringResponse {
    return axios.get(
      `${entity}/${canteenId}/${page.current}/${page.pageSize}/${page.condition}`
    );
  },
  page(entity: string, page: PageInfo): StringResponse {
    return axios.get(
      `${entity}/${page.current}/${page.pageSize}/${page.condition}`
    );
  },
  batchDelete(entity: string, ids: Array<string>): StringResponse {
    return axios.put(`/${entity}/batch-delete`, ids);
  },
  save(entity: string, domain: any): StringResponse {
    return axios.post(`/${entity}`, domain);
  },
  update(entity: string, domain: any): StringResponse {
    return axios.put(`/${entity}`, domain);
  },

  upload(file: any): StringResponse {
    return axios.post('/common/upload', file);
  },
};
