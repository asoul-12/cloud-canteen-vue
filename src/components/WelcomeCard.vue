<template>
  <t-row>
    <t-col :span="6" :offset="3">
      <t-card :style="cardOptions.style" header-bordered hover-shadow shadow>
        <template #header>
          <word-draw :wordDrawOptions="wordDrawOptions" />
        </template>
        <template #footer>
          <t-row>
            <t-col :span="6">
              <t-button
                button
                variant="text"
                size="large"
                @click="toHome"
                block
              >
                开始
                <template #icon>
                  <play-icon />
                </template>
              </t-button>
            </t-col>
            <t-col :span="6">
              <t-button
                button
                variant="text"
                size="large"
                @click="moreBtnClick"
                block
              >
                详情
                <template #icon>
                  <help-icon />
                </template>
              </t-button>
            </t-col>
          </t-row>
        </template>
      </t-card>
    </t-col>
  </t-row>
</template>

<script>
import { defineComponent, ref } from '@vue/runtime-core';
import { MessagePlugin } from 'tdesign-vue-next';
import { HelpIcon, PlayIcon } from 'tdesign-icons-vue-next';
import WorldDraw from './wordDraw.vue';
import { redirectToHome } from 'utils/useRouterJump';

export default defineComponent({
  name: 'WelcomeCard',
  components: { HelpIcon, PlayIcon },
  setup() {
    const cardOptions = {
      style: {
        width: '700px',
        marginTop: '100px',
      },
    };

    const wordDrawOptions = {
      content: '餐厅',
      width: 322,
      type: 'animation',
      strokeAnimationSpeed: 2,
      delayBetweenStrokes: 500,
    };

    const msg = ref(null);
    const moreBtnClick = () => {
      if (!msg.value) {
        msg.value = MessagePlugin.info({
          content: '没做呢',
        });
      } else {
        MessagePlugin.close(msg.value);
        msg.value = null;
      }
    };

    return {
      cardOptions,
      moreBtnClick,
      wordDrawOptions,
      toHome: redirectToHome,
    };
  },
});
</script>
