import axios from './http';
import { OrderPagination } from '../types/domain/order';
import { StringResponse } from '@/types/common/responseData';

export const order = {
  page(oderPagination: OrderPagination): StringResponse {
    return axios.post(`/order/page`, oderPagination);
  },
};
