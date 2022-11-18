<template>
  <t-menu
    :theme="menuSiderOption.theme"
    :default-value="menuSiderOption.defaultValue"
  >
    <t-menu-item
      v-for="(item, idx) in menuSiderOption.items"
      :key="idx"
      :value="item.value"
      :to="item.to"
    >
      {{ item.label }}
      <template #icon>
        <t-icon :name="item.icon" />
      </template>
    </t-menu-item>

    <template #operations>
      <t-icon
        class="t-menu__operations-icon"
        :name="iconName"
        @click="changeCollapsed"
      />
    </template>
  </t-menu>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, computed } from '@vue/runtime-core';
import { MessagePlugin } from 'tdesign-vue-next';
import { MenuSiderOption } from '@/types/common/menuSider';
import { menuItem } from 'utils/useSiderMenu';

const menuSiderOption: MenuSiderOption = {
  theme: 'default',
  defaultValue: 'dish',
  height: '100vh',
  logo: {
    width: '136',
    class: 't-menu__logo--center',
  },
  items: menuItem,
};

export default defineComponent({
  name: 'SiderMenu',
  setup() {
    const collapsed: Ref<boolean> = ref(true);

    const iconName = computed(() =>
      collapsed.value ? 'chevron-right' : 'chevron-left'
    );

    const changeCollapsed = (): void => {
      collapsed.value = !collapsed.value;
      MessagePlugin.info('没做呢');
    };

    return {
      collapsed,
      iconName,
      changeCollapsed,

      menuSiderOption,
    };
  },
});
</script>
