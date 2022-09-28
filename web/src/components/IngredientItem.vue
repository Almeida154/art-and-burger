<script lang="ts">
import { defineComponent } from '@vue/runtime-core';

export default defineComponent({
  props: {
    count: {
      type: Number,
      default: 0,
    },
  },
  defineEmits: ['subtract, add'],
});
</script>

<template>
  <div class="counter">
    <button class="btn" @click="$emit('subtract')">-</button>
    <p>{{ count }}</p>
    <button class="btn" @click="$emit('add')">+</button>
  </div>
</template>

<style lang="scss" scoped>
.counter {
  height: 2.8rem;
  color: var(--title-color);
  background: var(--dark-color);
  font-size: 0.7rem;
  font-weight: 500;
  text-transform: uppercase;
  transition: all 0.3s ease;
  border-radius: 0.6rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;

  &:hover {
    background: var(--darker-container-color);
    color: var(--text-color);
  }

  .btn {
    cursor: pointer;
    height: 100%;
    width: 25%;
    border: none;
    background: var(--darker-container-color);
  }

  p {
    font-size: 0.9rem;
    font-weight: 300;
  }
}
</style>
