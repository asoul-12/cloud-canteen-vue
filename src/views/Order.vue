<template>
  <t-table
    row-key="index"
    :data="data"
    :columns="columns"
    :loading="isLoading"
    :stripe="true"
    :bordered="true"
    :hover="true"
    :show-header="true"
    :size="'large'"
    @page-change="onPageChange"
    :pagination="pagination"
    cell-empty-content="-"
    :table-layout="'auto'"
    @row-click="handleRowClick"
  />
</template>

<script setup lang="ts">
import { Ref, ref, onMounted, reactive } from '@vue/runtime-core';
import { order } from 'api/order';
import { MessagePlugin } from 'tdesign-vue-next';
import { OrderPagination } from '@/types/domain/order';

const data: Ref<Array<any>> = ref([]);
const isLoading = ref(true);

const pagination = {
  defaultCurrent: 1,
  defaultPageSize: 5,
  current: 1,
  pageSize: 5,
  total: 1,
};

const orderPagination = reactive<OrderPagination>({
  orderId: '',
  current: 1,
  pageSize: 5,
  beginTime: '-',
  endTime: '-',
});

onMounted(() => {
  onPageChange(orderPagination);
});

const onPageChange = (pageInfo: any) => {
  isLoading.value = true;
  // pageinfo : current , pageSize , previous
  pagination.current = pageInfo.current;
  pagination.pageSize = pageInfo.pageSize;

  orderPagination.current = pageInfo.current;
  orderPagination.pageSize = pageInfo.pageSize;

  order
    .page(orderPagination)
    .then((res: any) => {
      loadPageData(res);
    })
    .catch(res => {
      MessagePlugin.error(res.msg);
      data.value = [];
    })
    .finally(() => {
      isLoading.value = false;
    });
};

const loadPageData = (res: any) => {
  data.value = res.data.records;

  pagination.total = res.data.total;
};

const columns = [
  {
    // 序号列，设置 colKey = serial-number 即可
    colKey: 'serial-number',
    title: '序号',
    width: '100',
    // 对齐方式
    align: 'center',
    // 设置列类名
    className: 'custom-column-class-name',
    // 设置列属性
    attrs: {
      'data-id': 'first-column',
      style: {},
    },
  },
  {
    colKey: 'id',
    title: '订单号',
  },
  {
    colKey: 'userName',
    title: '下单用户',
  },

  {
    colKey: 'amount',
    title: '金额',
  },
  {
    colKey: 'remark',
    title: '备注',
  },

  {
    colKey: 'status',
    title: '订单状态',
    cell(data: any, { col, row }: any) {
      return row.status === 1 ? '已付款' : '未付款';
    },
  },
  {
    colKey: 'orderTime',
    title: '下单时间',
  },
  {
    colKey: 'checkoutTime',
    title: '付款时间',
  },
];

const handleRowClick = (e: any) => {
  console.log(e);
};
</script>
