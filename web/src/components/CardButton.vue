<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    text: String,
  },
  data() {
    return {
      click() {
        console.log('click');
      },
    };
  },
});
</script>

<template>
  <button v:on="$listeners" class="btn">
    {{ text }}
  </button>
</template>

<style lang="scss" scoped>
.btn {
  height: 2.8rem;
  color: var(--title-color);
  background: var(--dark-color);
  font-size: 0.7rem;
  text-transform: uppercase;
  border-radius: 0.6rem;
  font-weight: 500;
  cursor: pointer;
  border: none;
  transition: all 0.3s ease;

  &:hover {
    background: var(--darker-container-color);
    color: var(--text-color);
  }
}
</style>
