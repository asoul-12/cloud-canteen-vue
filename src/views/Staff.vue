<template>
  <tools-table
    :entity="'staff'"
    :columns="columns"
    :domain="employeeInfo"
    :reset="initEmployee"
    :echo="echoEmployee"
  >
    <template #form>
      <t-form ref="form" :data="employeeInfo" :rules="rules" @Validate="test">
        <t-form-item label="姓名" name="name">
          <t-input placeholder="请输入内容" v-model="employeeInfo.name" />
        </t-form-item>
        <t-form-item label="性别" name="sex">
          <t-radio-group default-value="1" v-model="employeeInfo.sex">
            <t-radio value="M">男</t-radio>
            <t-radio value="F">女</t-radio>
          </t-radio-group>
        </t-form-item>
        <t-form-item label="手机号码" name="phone">
          <t-input placeholder="请输入内容" v-model="employeeInfo.phone" />
        </t-form-item>
        <t-form-item label="身份证号码" name="idNumber">
          <t-input placeholder="请输入内容" v-model="employeeInfo.idNumber" />
        </t-form-item>
      </t-form>
    </template>
  </tools-table>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from '@vue/runtime-core';
import { staff } from 'api/staff';
import { commonApi } from 'api/commonApi';
import ToolsTable from '../components/ToolsTable.vue';
import { EmployeeInfo } from '@/types/domain/user';
import {
  Input,
  Select,
  DatePicker,
  MessagePlugin,
  Button,
  FormValidateParams,
  ValidateResultContext,
} from 'tdesign-vue-next';

const visible = ref(false);

const employeeInfo = reactive<EmployeeInfo>({
  id: '',
  name: '',
  sex: 'M',
  phone: '',
  idNumber: '',
  canteenId: localStorage.getItem('canteenId') as any,
});

const rules = {
  name: [{ required: false }, { min: 3 }, { max: 10 }],
  sex: [{ required: false }],
  phone: [{ required: false }, { min: 5 }, { max: 16 }],
  idNumber: [{ required: false }, { min: 16 }, { max: 18 }],
};

const columns = computed(() => [
  {
    colKey: 'row-select',
    type: 'multiple',
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
    title: '姓名',
  },
  {
    colKey: 'sex',
    title: '性别',
  },
  {
    colKey: 'phone',
    title: '电话',
  },
  {
    colKey: 'idNumber',
    title: '身份证',
  },
  {
    colKey: 'createTime',
    title: '入职时间',
  },
  {
    colKey: 'operate',
    title: '操作',
    width: 150,
  },
]);

const test = (result: ValidateResultContext<any>) => {
  console.log('xxx');
};

const initEmployee = () => {
  employeeInfo.id = '';
  employeeInfo.name = '';
  employeeInfo.sex = 'M';
  employeeInfo.phone = '';
  employeeInfo.idNumber = '';
};

const echoEmployee = (row: any) => {
  const { id, name, sex, phone, idNumber } = row;
  employeeInfo.id = id;
  employeeInfo.name = name;
  employeeInfo.sex = sex;
  employeeInfo.phone = phone;
  employeeInfo.idNumber = idNumber;
};
</script>
