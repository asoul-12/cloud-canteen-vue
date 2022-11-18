<template>
  <t-head-menu>
    <template #logo>
      <t-row>
        <t-col style="margin-top: 5px" offset="4">
          <word-draw
            @click="redirectToWelcome"
            style="cursor: pointer"
            :word-draw-options="wordDrawOptions"
          />
        </t-col>
      </t-row>
    </template>

    <template #operations>
      <a
        class="menu-icon"
        v-for="(item, idx) in operationOptions"
        :key="idx"
        @click="item.action"
      >
        <t-icon class="t-menu__operations-icon" :name="item.icon" />
      </a>
    </template>
  </t-head-menu>
  <t-drawer
    v-model:visible="visible"
    attach="body"
    mode="push"
    placement="right"
    header="个人信息"
    :footer="null"
  >
    <user-info />
  </t-drawer>
</template>
<script lang="ts">
import {
  defineComponent,
  ref,
  Ref,
  reactive,
  onMounted,
} from '@vue/runtime-core';
import { MessagePlugin } from 'tdesign-vue-next';
import { redirectToWelcome } from 'utils/useRouterJump';
import UserInfo from 'components/UserInfo.vue';
import { WordDrawOptions } from '@/types/common/wordDrawParameter';
import WorldDraw from '@/components/WordDraw.vue';
import { user } from '@/api/user';
import { useStore } from '@/store/counter';

interface OperationOption {
  icon: string;
  action: (e: MouseEvent) => void;
}

export default defineComponent({
  name: 'Header',
  components: { UserInfo, WorldDraw },
  setup() {
    const store = useStore();
    const visible: Ref<boolean> = ref(false);
    const wordDrawOptions = reactive<WordDrawOptions>({
      content: '餐厅',
      width: 55,
      type: null,
      strokeAnimationSpeed: 4,
      delayBetweenStrokes: 200,
    });

    onMounted(() => {});

    // drawer handler
    const userDrawerHandler = () => {
      visible.value = true;
    };

    // 登出
    const logoutHandler = () => {
      localStorage.clear();
      MessagePlugin.info('登出');
      redirectToWelcome();
      user
        .logout()
        .then((res: any) => {})
        .catch((err: any) => {
          MessagePlugin.error(err.msg);
        });
    };

    // TODO handler
    const todoHandler = () => {
      MessagePlugin.info('没做呢');
    };

    const operationOptions: Array<OperationOption> = [
      { icon: 'mail', action: todoHandler },
      { icon: 'user', action: userDrawerHandler },
      { icon: 'logout', action: logoutHandler },
    ];

    return {
      wordDrawOptions,

      visible,
      operationOptions,

      redirectToWelcome,
    };
  },
});
</script>

<style>
.menu-icon {
  cursor: pointer;
}
</style>
