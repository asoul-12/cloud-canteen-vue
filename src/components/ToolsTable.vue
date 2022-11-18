<template>
  <t-card hoverShadow="true" bordered>
    <t-row>
      <t-col :span="0.5">
        <div>
          <t-button theme="primary" @click="addBtnHandler"> 新建 </t-button>
        </div>
      </t-col>
      <t-col :span="3">
        <div>
          <t-button
            style="margin-left: 30px"
            theme="primary"
            @click="delBtnHandler"
          >
            删除
          </t-button>
        </div>
      </t-col>
      <t-col :span="1" style="text-align: right">
        <div>
          <t-button variant="outline" @click="queryBtnHandler"> 搜索 </t-button>
        </div>
      </t-col>
      <t-col :span="7">
        <div>
          <t-input v-model="queryInput" />
        </div>
      </t-col>
    </t-row>
    <t-table
      row-key="id"
      :data="tableData"
      :columns="columns"
      :loading="isLoading"
      :stripe="true"
      :bordered="true"
      :hover="true"
      :show-header="true"
      :size="'large'"
      @page-change="onPageChange"
      :pagination="pageInfo"
      cell-empty-content="-"
      :table-layout="'flex'"
      :selected-row-keys="selectedRowKeys"
      @select-change="rehandleSelectChange"
      style="margin-top: 10px"
    >
      <template #image="{ row }">
        <slot name="dishImage" :row="row"></slot>
      </template>

      <template #operate="{ row }">
        <div class="table-operations">
          <t-button variant="outline" @click="editBtnHandler(row)">
            编辑
          </t-button>
        </div>
      </template>
    </t-table>
  </t-card>
  <t-dialog
    v-model:visible="dialigVisable"
    placement="center"
    :cancelBtn="'取消'"
    :confirmBtn="'提交'"
    :on-confirm="submit"
  >
    <slot name="form"></slot>
  </t-dialog>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from '@vue/runtime-core';
import { PageInfo } from '@/types/common/page';
import { commonApi } from '@/api/commonApi';
import { MessagePlugin } from 'tdesign-vue-next';
import { useStore } from '@/store/counter';

export default defineComponent({
  name: 'ToolsTable',

  props: {
    // 表头
    columns: {
      required: true,
      type: Array,
    },
    // table
    entity: {
      required: true,
      type: String,
    },
    // 数据实体
    domain: {
      required: true,
      type: Object,
    },
    // table-reset
    reset: {
      type: Function,
      required: true,
    },
    // 数据回显
    echo: {
      type: Function,
      required: true,
    },
  },

  setup(props) {
    const store = useStore();
    const tableData = ref([]);
    const isLoading = ref(false);
    const selectedRowKeys = ref([]);
    const queryInput = ref('');
    const dialigVisable = ref(false);
    const pageInfo = reactive<PageInfo>({
      defaultCurrent: 1,
      defaultPageSize: 5,
      current: 1,
      pageSize: 5,
      condition: '',
      total: 1,
    });
    const { reset, echo } = props;

    onMounted(() => {
      onPageChange(pageInfo);
    });

    // pageinfo : current , pageSize , previous
    const onPageChange = (info: any) => {
      // 使用表格组件的数据更新pageinfo
      pageInfo.current = info.current;
      pageInfo.pageSize = info.pageSize;
      pageInfo.condition = queryInput.value;
      isLoading.value = true;

      commonApi
        .pageByQuery(
          props.entity,
          localStorage.getItem('canteenId') as any,
          pageInfo
        )
        .then((res: any) => {
          tableData.value = res.data.records;
          pageInfo.total = res.data.total;
        })
        .catch((err: any) => {
          MessagePlugin.error(err.msg);
          tableData.value = [];
        })
        .finally(() => {
          isLoading.value = false;
        });
    };

    const addBtnHandler = () => {
      reset();
      dialigVisable.value = true;
    };

    const delBtnHandler = () => {
      const ids = selectedRowKeys.value;
      if (ids.length === 0) {
        MessagePlugin.info('还没选呢');
      } else {
        MessagePlugin.closeAll();
        isLoading.value = true;
        commonApi
          .batchDelete(props.entity, ids)
          .then((res: any) => {
            MessagePlugin.success('delete!');
          })
          .catch((err: any) => {
            MessagePlugin.error('fail');
          })
          .finally(() => {
            onPageChange({ current: 1, pageSize: 5 });
            selectedRowKeys.value = [];
          });
      }
    };

    const queryBtnHandler = () => {
      onPageChange(pageInfo);
    };

    const editBtnHandler = (row: any) => {
      echo(row);
      dialigVisable.value = true;
    };

    // 表中数据被勾选时的响应
    const rehandleSelectChange = (value: any, { selectedRowData }: any) => {
      selectedRowKeys.value = value;
    };

    const submit = () => {
      isLoading.value = true;

      // 修改
      if (props.domain.id !== '')
        commonApi
          .update(props.entity, props.domain)
          .then((res: any) => {
            onPageChange(pageInfo);
            MessagePlugin.success('提交成功');
          })
          .catch((err: any) => {
            MessagePlugin.error(err.msg);
          })
          .finally(() => {
            reset();
            dialigVisable.value = false;
          });
      // 新增
      else
        commonApi
          .save(props.entity, props.domain)
          .then((res: any) => {
            onPageChange(pageInfo);
            MessagePlugin.success('提交成功');
          })
          .catch((err: any) => {
            MessagePlugin.error(err.msg);
          })
          .finally(() => {
            reset();
            isLoading.value = false;
            dialigVisable.value = false;
          });
    };

    return {
      tableData,
      isLoading,
      pageInfo,
      selectedRowKeys,
      queryInput,
      dialigVisable,
      onPageChange,
      addBtnHandler,
      delBtnHandler,
      queryBtnHandler,
      editBtnHandler,
      submit,
      rehandleSelectChange,
    };
  },
});
</script>
