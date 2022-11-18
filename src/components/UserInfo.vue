<template>
  <div v-if="!loading">
    <t-row :align="'middle'" justify="center">
      <t-col flex="auto">
        <t-avatar size="100px">
          {{ administratorInfo.canteenName }}
        </t-avatar>
      </t-col>
    </t-row>
    <t-row :align="'middle'" justify="center">
      <t-col flex="auto">
        <div v-if="editFlag">
          <p>
            canteen-name:
            <t-input v-model="administratorInfoBak.canteenName" />
          </p>
          <p>
            name:
            <t-input v-model="administratorInfoBak.name" />
          </p>
          <p>
            account:
            <t-input v-model="administratorInfoBak.account" disabled />
          </p>
          <p>
            password:
            <t-input />
          </p>
          <t-button @click="editBtnClick">取消</t-button>
          <t-button @click="editUserInfo">确认</t-button>
        </div>
        <div v-else>
          <p>name:{{ administratorInfo.name }}</p>
          <p>account:{{ administratorInfo.account }}</p>
          <t-button @click="editBtnClick">修改个人信息</t-button>
        </div>
      </t-col>
    </t-row>
  </div>

  <div v-else>
    <t-row
      v-for="(item, idx) in skeletonOptions"
      :key="idx"
      :align="'middle'"
      justify="center"
    >
      <t-col flex="auto">
        <t-skeleton
          :theme="item.theme"
          :class="item.class"
          :loading="loading"
          animation="gradient"
        />
      </t-col>
    </t-row>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  Ref,
  onMounted,
} from '@vue/runtime-core';
import { user } from 'api/user';
import { AdministratorInfo } from '@/types/domain/user';
import { MessagePlugin } from 'tdesign-vue-next';
import { useStore } from '@/store/counter';

const skeletonOptions: Array<{ theme: string; class: string }> = [
  { theme: 'avatar', class: 'avatar' },
  { theme: 'text', class: 'text' },
];

export default defineComponent({
  name: 'Header',
  setup() {
    const loading: Ref<boolean> = ref(true);
    const editFlag: Ref<boolean> = ref(false);
    const store = useStore();
    const administratorInfo = reactive<AdministratorInfo>({
      id: '',
      canteenId: '',
      canteenName: '',
      avatar: '',
      name: '',
      account: '',
      password: '',
    });
    const administratorInfoBak = reactive<AdministratorInfo>({
      id: '',
      canteenId: '',
      canteenName: '',
      avatar: '',
      name: '',
      account: '',
      password: '',
    });

    onMounted(() => {
      const token = localStorage.getItem('token');
      if (token) {
        user
          .getUserInfo()
          .then((res: any) => {
            const data = res.data;
            administratorInfo.id = data.id;
            administratorInfo.account = data.account;
            administratorInfo.name = data.name;
            administratorInfo.canteenId = data.canteenId;
            administratorInfo.canteenName = data.canteenName;
            administratorInfo.avatar = data.avatar;

            administratorInfoBak.account = administratorInfo.account;
            administratorInfoBak.name = administratorInfo.name;
            administratorInfoBak.canteenName = administratorInfo.canteenName;

            store.setUserInfo(administratorInfo);
            console.log('data', data);

            loading.value = false;
          })
          .catch((err: any) => {
            MessagePlugin.error(err.msg);
          });
      }
    });

    // 修改按钮事件
    const editBtnClick = () => {
      editFlag.value = !editFlag.value;
    };

    //
    const editUserInfo = () => {
      user
        .editUserInfo(administratorInfoBak)
        .then((res: any) => {
          MessagePlugin.info(res.msg);
        })
        .catch((err: any) => {
          MessagePlugin.error(err.msg);
        });
    };

    return {
      skeletonOptions,
      loading,
      editFlag,
      administratorInfo,
      administratorInfoBak,
      editBtnClick,
      editUserInfo,
    };
  },
});
</script>

<style>
.avatar {
  line-height: 100px;
}
</style>
