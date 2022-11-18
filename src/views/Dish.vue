<template>
  <ToolsTable
    :entity="'dish'"
    :domain="dishInfo"
    :columns="columns"
    :reset="reset"
    :echo="echo"
  >
    <!-- :src="`https://takeout-dish-image-1255913523.cos.ap-guangzhou.myqcloud.com/dish-img/${row.image}`" -->

    <template #dishImage="{ row }">
      <t-image
        fit="cover"
        :src="row.image"
        :style="{ width: '120px', height: '120px' }"
        @click="uploadImageHandler(row)"
      />
    </template>

    <template #form>
      <t-form ref="form" :data="dishInfo" :rules="rules" colon>
        <t-form-item label="菜名" name="name">
          <t-input v-model="dishInfo.name"></t-input>
        </t-form-item>

        <t-form-item label="口味" name="category">
          <t-select v-model="dishInfo.categoryId">
            <t-option
              v-for="item in CATEGORY_OPTIONS"
              :key="item.id"
              :value="item.id"
              :label="item.name"
            ></t-option>
          </t-select>
        </t-form-item>

        <t-form-item label="价格" name="price">
          <t-input-number
            v-model="dishInfo.price"
            theme="normal"
            placeholder="数字"
          />
        </t-form-item>

        <t-form-item label="库存" name="stock">
          <t-input-number
            v-model="dishInfo.stock"
            theme="normal"
            placeholder="数字"
          />
        </t-form-item>

        <t-form-item label="索引" name="sort">
          <t-input-number
            v-model="dishInfo.sort"
            theme="normal"
            placeholder="数字"
          />
        </t-form-item>

        <t-form-item label="描述" name="desription">
          <t-textarea
            v-model="dishInfo.description"
            placeholder="菜品描述"
            clearable
          />
        </t-form-item>

        <t-form-item label="上架状态" name="status">
          <t-switch
            v-model="dishInfo.status"
            :label="['上架', '下架']"
          ></t-switch>
        </t-form-item>

        <t-form-item label="图片" name="image">
          <t-upload
            v-model="image"
            :auto-upload="true"
            accept="image/*"
            :theme="'image'"
            :max="1"
            :show-upload-progress="true"
            :headers="headers"
            draggable
            clearable
            :action="`/api/common/upload/dish/${dishInfo.id}`"
            @fail="handleUploadFail"
          />
        </t-form-item>
      </t-form>
    </template>
  </ToolsTable>

  <t-dialog
    v-model:visible="uploadDialog"
    header="更换图片"
    placement="center"
    :cancelBtn="null"
    :confirmBtn="null"
  >
    <t-upload
      v-model="image"
      :auto-upload="true"
      accept="image/*"
      :theme="'image'"
      :max="1"
      :show-upload-progress="true"
      :headers="headers"
      draggable
      :action="`/api/common/upload/dish/${dishInfo.id}`"
      @success="handleUploadSuccess"
    />
  </t-dialog>
</template>

<script setup lang="ts">
import axios from 'axios';
import { Ref, ref, reactive, onMounted } from '@vue/runtime-core';
import { dish, category } from 'api/dish';
import { MessagePlugin } from 'tdesign-vue-next';
import ToolsTable from '@/components/ToolsTable.vue';
import { CategoryInfo, DishInfo } from '@/types/domain/dish';
import { commonApi } from '@/api/commonApi';
import { useStore } from '@/store/counter';

const store = useStore();
const uploadDialog = ref(false);
const image: Ref<Array<any>> = ref([]);
const headers = {
  ['Authorization']: localStorage.getItem('token'),
};

const CATEGORY_OPTIONS: Ref<Array<CategoryInfo>> = ref([]);
const dishInfo = reactive<DishInfo>({
  id: '',
  name: '',
  category: '',
  categoryId: '',
  image: '',
  sort: 0,
  price: 0,
  description: '',
  stock: 0,
  status: true,
  createTime: '',
  canteenId: localStorage.getItem('canteenId') as any,
});
const columns = [
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
    title: '菜名',
  },
  {
    colKey: 'category',
    title: '口味',
  },
  {
    colKey: 'image',
    title: '图',
  },
  {
    colKey: 'price',
    title: '价格',
  },
  {
    colKey: 'discount',
    title: '折扣',
  },
  {
    colKey: 'stock',
    title: '库存',
  },
  {
    colKey: 'sort',
    title: '索引',
  },
  {
    colKey: 'description',
    title: '描述',
  },
  {
    colKey: 'createTime',
    title: '上架时间',
  },
  {
    colKey: 'operate',
    title: '操作',
  },
];
const rules = {
  name: [{ required: true }, { min: 1 }, { max: 20 }],
  category: [{ required: true }],
  price: [{ required: true }],
  sort: [{ required: true }],
  stock: [{ required: true }],
  description: [{ required: false }],
  status: [{ required: true }],
  // image: [{ required: true }],
};

onMounted(() => {
  category
    .categoryList(localStorage.getItem('canteenId') as any)
    .then((res: any) => {
      CATEGORY_OPTIONS.value = res.data;
      console.log(CATEGORY_OPTIONS.value);
    })
    .catch((err: any) => {
      MessagePlugin.error(err.msg);
    });
});

const uploadImageHandler = (row: any) => {
  dishInfo.id = row.id;
  uploadDialog.value = true;
};

const handleUploadFail = ({ file }: any) => {
  MessagePlugin.error(`文件 ${file.name} 上传失败`);
};

const handleUploadSuccess = (context: any) => {
  MessagePlugin.success('上传成功');
};

const reset = () => {
  dishInfo.id = '';
  dishInfo.name = '';
  dishInfo.category = '';
  dishInfo.sort = 0;
  dishInfo.price = 0;
  dishInfo.description = '';
  dishInfo.stock = 0;
  dishInfo.status = true;
};

const echo = (row: any) => {
  const { id, name, category, image, sort, price, description, stock, status } =
    row;
  dishInfo.id = id;
  dishInfo.name = name;
  dishInfo.image = image;
  dishInfo.category = category;
  dishInfo.sort = sort;
  dishInfo.price = price;
  dishInfo.description = description;
  dishInfo.stock = stock;
  dishInfo.status = status;
};
</script>
