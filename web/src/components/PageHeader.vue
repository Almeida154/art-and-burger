<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    title: {
      type: String,
    },
    path: {
      type: String,
    },
  },
});
</script>

<template>
  <div>
    <span>{{ path }}</span>
    <h3>{{ title }}</h3>
  </div>
</template>

<style lang="scss" scoped>
span {
  opacity: 0.3;
  color: var(--text-color);
  word-spacing: 0.4rem;
}

h3 {
  margin-top: 1rem;
  font-weight: 400;
  font-size: 1.8rem;
  color: var(--title-color);
}
</style>
