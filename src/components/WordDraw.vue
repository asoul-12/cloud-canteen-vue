<template>
  <div id="drawAnimation"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType } from '@vue/runtime-core';
import cnchar from 'cnchar';
import draw from 'cnchar-draw';
import { WordDrawOptions } from '../types/common/wordDrawParameter';

export default defineComponent({
  name: 'WelcomeCard',
  props: {
    wordDrawOptions: {
      type: Object as PropType<WordDrawOptions>,
      require: true,
    },
  },
  setup(prop) {
    const { wordDrawOptions } = prop;
    const { content, width, type, strokeAnimationSpeed, delayBetweenStrokes } =
      wordDrawOptions as WordDrawOptions;

    onMounted(() => {
      cnchar.use(draw);
      cnchar.draw(content, {
        el: '#drawAnimation',
        type: type ? cnchar.draw.TYPE.ANIMATION : undefined,
        style: {
          length: width,
        },
        animation: {
          strokeAnimationSpeed,
          delayBetweenStrokes,
        },
      });
    });

    return {};
  },
});
</script>
