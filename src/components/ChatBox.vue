<template>
  <t-card>
    <template #avatar>
      <t-avatar image="https://tdesign.gtimg.com/site/avatar.jpg" />
    </template>
    <template #actions>
      <t-avatar image="https://tdesign.gtimg.com/site/avatar.jpg" />
    </template>
  </t-card>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from '@vue/runtime-core';

export default defineComponent({
  name: 'ChatBox',
  setup() {
    return {};
  },
});
</script>
