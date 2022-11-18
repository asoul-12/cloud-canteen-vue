<template>
  <div id="RegisterCard">
    <t-form
      ref="form"
      :data="formData"
      :rules="rules"
      :colon="true"
      :label-width="0"
      @submit="onSubmit"
    >
      <t-form-item name="name">
        <t-input
          v-model="formData.name"
          placeholder="请输入饭馆名"
          size="large"
          clearable
        >
          <template #prefix-icon>
            <user-avatar-icon />
          </template>
        </t-input>
      </t-form-item>

      <t-form-item name="account">
        <t-input
          v-model="formData.account"
          placeholder="请输入邮箱"
          size="large"
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
          clearable
        >
          <template #prefix-icon>
            <lock-on-icon />
          </template>
        </t-input>
      </t-form-item>

      <t-form-item name="passwordAgain">
        <t-input
          v-model="formData.passwordAgain"
          placeholder="请再次输入密码"
          size="large"
          type="password"
          clearable
        >
          <template #prefix-icon>
            <lock-off-icon />
          </template>
        </t-input>
      </t-form-item>

      <t-form-item style="padding-top: 8px">
        <t-button
          theme="primary"
          type="submit"
          :disabled="isSubmitBtnDisabled"
          block
          >注册</t-button
        >
      </t-form-item>
    </t-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import {
  UserAvatarIcon,
  DesktopIcon,
  LockOnIcon,
  LockOffIcon,
} from 'tdesign-icons-vue-next';
import { getRegisterContext } from 'utils/useValidator';

export default defineComponent({
  name: 'LoginCard',
  components: { UserAvatarIcon, DesktopIcon, LockOnIcon, LockOffIcon },
  setup() {
    const headers = {
      ['Authorization']: localStorage.getItem('token'),
    };

    const { formData, rules, isSubmitBtnDisabled, onSubmit } =
      getRegisterContext();

    return {
      headers,

      formData,
      rules,
      isSubmitBtnDisabled,

      onSubmit,
    };
  },
});
</script>

<style>
#RegisterCard {
  margin: 20px;
}
</style>
