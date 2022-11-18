<template>
  <t-layout>
    <t-content style="height: 100vh">
      <t-row style="margin-top: 100px">
        <t-col :span="6" :offset="3">
          <word-draw
            v-if="value === 'login'"
            :word-draw-options="loginWordDrawOptions"
          />
          <word-draw v-else :word-draw-options="registerWordDrawOptions" />
        </t-col>
      </t-row>

      <t-row>
        <t-col :span="6" :offset="3">
          <t-tabs :value="value" :theme="theme" @change="changeHandler">
            <t-tab-panel value="login">
              <template #label>
                <t-icon name="user" class="tabs-icon-margin" />
                登陆
              </template>
              <login-card />
            </t-tab-panel>

            <t-tab-panel value="register">
              <template #label>
                <t-icon name="user-add" class="tabs-icon-margin" />
                成为商家
              </template>
              <register-card />
            </t-tab-panel>
          </t-tabs>
        </t-col>
      </t-row>
    </t-content>
  </t-layout>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, reactive } from '@vue/runtime-core';
import { WordDrawOptions } from '@/types/common/wordDrawParameter';
import LoginCard from 'components/LoginCard.vue';
import RegisterCard from 'components/RegisterCard.vue';

export default defineComponent({
  name: 'Login',
  components: { LoginCard, RegisterCard },
  setup() {
    const loginWordDrawOptions = reactive<WordDrawOptions>({
      content: '登陆',
      width: 60,
      type: 'animation',
      strokeAnimationSpeed: 4,
      delayBetweenStrokes: 200,
    });

    const registerWordDrawOptions = reactive<WordDrawOptions>({
      content: '注册',
      width: 60,
      type: 'animation',
      strokeAnimationSpeed: 4,
      delayBetweenStrokes: 200,
    });

    const value: Ref<string> = ref('login');
    const theme: Ref<string> = ref('normal');

    // bug here
    const changeHandler = (newValue: string): void => {
      if (newValue !== value.value) {
        // wordDrawOptions.content = newValue === 'login' ? '登陆' : 'register' ? '注册' : ''
      }
      value.value = newValue;
    };

    return {
      loginWordDrawOptions,
      registerWordDrawOptions,
      value,
      theme,
      changeHandler,
    };
  },
});
</script>

<style>
.tab-icon-margin {
  margin-right: 4px;
}
</style>
