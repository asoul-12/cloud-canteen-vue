import axios from './http';
import { StringResponse } from '@/types/common/responseData';
import { AdministratorInfo } from '@/types/domain/user';

export const user = {
  register(name: string, account: string, password: string): StringResponse {
    return axios.post('/admin/register', { name, account, password });
  },

  login(account: string, password: string): StringResponse {
    return axios.post('/admin/login', { account, password });
  },

  logout(): StringResponse {
    return axios.post('/admin/logout');
  },
  getUserInfo(): StringResponse {
    return axios.post('/admin/info');
  },
  editUserInfo(administratorInfo: AdministratorInfo): StringResponse {
    return axios.put('/admin/info', administratorInfo);
  },
};
