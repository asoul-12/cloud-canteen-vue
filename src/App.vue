<template>
  <t-config-provider :global-config="globalConfig">
    <router-view />
  </t-config-provider>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import merge from 'lodash/merge';
import enConfig from 'tdesign-vue-next/es/locale/zh_CN';

export default defineComponent({
  name: 'App',
  components: {},
  setup() {
    const globalConfig = merge(enConfig, {});

    return {
      globalConfig,
    };
  },
});
</script>

<style scoped></style>
