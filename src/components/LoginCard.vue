<template>
  <div id="LoginCard">
    <t-form
      ref="form"
      :data="formData"
      :rules="rules"
      :colon="true"
      label-width="0"
      @submit="onSubmit"
    >
      <t-form-item name="account">
        <t-input
          v-model="formData.account"
          placeholder="请输入用户名"
          size="large"
          autocomplete
          clearable
        >
          <template #prefix-icon>
            <desktop-icon />
          </template>
        </t-input>
      </t-form-item>

      <t-form-item name="password">
        <t-input
          v-model="formData.password"
          placeholder="请输入密码"
          size="large"
          type="password"
          autocomplete
          clearable
        >
          <template #prefix-icon>
            <lock-on-icon />
          </template>
        </t-input>
      </t-form-item>

      <t-form-item style="padding-top: 8px">
        <t-button
          theme="primary"
          type="submit"
          :disabled="isSubmitBtnDisabled"
          block
          >登陆</t-button
        >
      </t-form-item>
    </t-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import { DesktopIcon, LockOnIcon } from 'tdesign-icons-vue-next';
import { getLoginContext } from 'utils/useValidator';

export default defineComponent({
  name: 'LoginCard',
  components: { DesktopIcon, LockOnIcon },
  setup() {
    const { formData, rules, isSubmitBtnDisabled, onSubmit } =
      getLoginContext();

    return {
      formData,
      rules,

      isSubmitBtnDisabled,
      onSubmit,
    };
  },
});
</script>

<style>
#LoginCard {
  margin: 20px;
}
</style>
