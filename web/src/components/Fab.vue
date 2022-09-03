<script lang="ts">
import { defineComponent } from 'vue';
import VueFeather from 'vue-feather';

export default defineComponent({
  defineEmits: ['click'],
  components: {
    VueFeather,
  },
  props: {
    icon: String,
  },
});
</script>

<template>
  <div class="fab" @click="$emit('click')">
    <vue-feather :type="icon"></vue-feather>
  </div>
</template>

<style lang="scss" scoped>
.fab {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 32px;
  right: 32px;
  background: var(--accent-color);
  width: 48px;
  height: 48px;
  border-radius: 50%;

  &:hover {
    background: var(--darker-accent-color);
  }
}
</style>
