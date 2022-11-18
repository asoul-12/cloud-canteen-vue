<template>
  <t-layout>
    <t-header id="MainHeader">
      <header-menu />
    </t-header>

    <t-layout>
      <t-aside id="MainSider">
        <sider-menu />
      </t-aside>
      <t-content id="MainContent">
        <router-view />
      </t-content>
    </t-layout>
  </t-layout>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@vue/runtime-core';
import HeaderMenu from 'components/HeaderMenu.vue';
import { Message } from '@/types/chatProtocol/message';
import SiderMenu from 'components/SiderMenu.vue';

export default defineComponent({
  name: 'Home',
  components: { HeaderMenu },
  setup() {},
});
</script>

<style>
#MainHeader {
  height: 68px;
  width: 100vw;

  border-bottom: 1px solid #e6e7e7;
}

#MainContent {
  padding: 20px;
  width: 100vw;
  min-height: calc(100vh - 68px);
}
</style>
