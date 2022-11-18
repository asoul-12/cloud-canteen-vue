export interface Order {}

export interface OrderPagination {
  orderId: string;
  current: number;
  pageSize: number;
  beginTime: string;
  endTime: string;
}
