<script lang="ts">
import { defineComponent } from '@vue/runtime-core';

export default defineComponent({
  data() {
    return {};
  },
});
</script>

<template>
  <div class="not-found">
    <div class="not-found__container container">
      <h2>404</h2>
      <p>Ooops. This page was not found!</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.not-found {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;

  &__container {
    h2 {
      font-size: 6rem;
      font-weight: 600;
      color: var(--title-color);
    }

    p {
      font-size: 2rem;
      margin-top: 0.6rem;
      font-weight: 300;
      color: var(--text-color);
    }
  }
}
</style>
