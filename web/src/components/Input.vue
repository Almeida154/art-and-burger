<script lang="ts">
import { defineComponent } from '@vue/runtime-core';

export default defineComponent({
  data() {
    return {
      input: '',
    };
  },
  props: {
    firstOne: Boolean,
    lastOne: Boolean,
  },
  methods: {
    updateValue(e: Event) {
      this.$emit('update:value', (e.target as HTMLInputElement).value);
    },
  },
});
</script>

<template>
  <input
    class="input"
    :class="{ 'first-one': firstOne, 'last-one': lastOne }"
    v-model="input"
    @input="updateValue"
  />
</template>

<style lang="scss" scoped>
.input {
  background: rgba(18, 18, 18, 0.5);
  border: 2px solid var(--container-color);
  border-top: none;
  padding: 1rem;
  outline: none;
  max-width: 540px;
  font-size: 0.9rem;
}

.first-one {
  border-top: 2px solid var(--container-color);
  border-top-left-radius: 0.4rem;
  border-top-right-radius: 0.4rem;
}

.last-one {
  border-bottom-left-radius: 0.4rem;
  border-bottom-right-radius: 0.4rem;
}

::placeholder {
  color: var(--text-color);
}
</style>
