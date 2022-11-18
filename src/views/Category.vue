<template>
  <ToolsTable
    :columns="columns"
    :entity="'category'"
    :domain="categoryInfo"
    :reset="reset"
    :echo="echo"
  >
    <template #form>
      <t-form ref="form" :data="categoryInfo" :rules="rules">
        <t-form-item label="类名" name="name">
          <t-input placeholder="请输入内容" v-model="categoryInfo.name" />
        </t-form-item>
        <t-form-item label="索引" name="sort">
          <t-input-number v-model="categoryInfo.sort" />
        </t-form-item>
      </t-form>
    </template>
  </ToolsTable>
</template>

<script setup lang="ts">
import { reactive } from '@vue/runtime-core';
import { CategoryInfo } from '@/types/domain/dish';

const categoryInfo = reactive<CategoryInfo>({
  id: '',
  name: '',
  sort: -1,
  updateTime: '',
  canteenId: localStorage.getItem('canteenId') as any,
});

const columns = [
  {
    colKey: 'row-select',
    type: 'multiple',
    // checkProps: ({ rowIndex }) => ({ disabled: rowIndex % 2 !== 0 }),
    width: 50,
  },
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
    colKey: 'name',
    title: '分类',
  },
  {
    colKey: 'sort',
    title: '索引',
  },
  {
    colKey: 'updateTime',
    title: '更新时间',
  },
  {
    colKey: 'operate',
    title: '操作',
  },
];

const rules = {
  name: [{ required: true }, { min: 1 }, { max: 10 }],
  sort: [
    { required: true },
    { number: true, message: '请输入数字', type: 'warning' },
  ],
};

const reset = () => {
  categoryInfo.id = '';
  categoryInfo.name = '';
  categoryInfo.sort = -1;
};

const echo = (row: any) => {
  const { id, name, sort } = row;
  categoryInfo.id = id;
  categoryInfo.name = name;
  categoryInfo.sort = sort;
};
</script>
