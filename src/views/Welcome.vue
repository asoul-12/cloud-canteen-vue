<template>
  <t-layout>
    <t-content style="height: 100vh">
      <welcome-card />
    </t-content>
  </t-layout>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import WelcomeCard from 'components/WelcomeCard.vue';

export default defineComponent({
  name: 'Welcome',
  components: {
    WelcomeCard,
  },
  setup() {
    return {};
  },
});
</script>
