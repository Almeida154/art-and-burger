<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import type { PropType } from 'vue';

import VSelect from 'vue-select';

export default defineComponent({
  props: {
    firstOne: Boolean,
    lastOne: Boolean,
    options: [] as PropType<any[]>,
    label: String,
  },
  computed: {
    selected: {
      get() {},
      set(value: any) {
        this.$emit('setItemTypeSelected', value);
      },
    },
  },
  components: {
    'v-select': VSelect,
  },
  methods: {
    setSelected: () => {
      console.log('changed');
    },
  },
});
</script>

<template>
  <v-select
    v-model="selected"
    :options="options"
    :label="label"
    @input="setSelected"
    class="input"
    :class="{ 'first-one': firstOne, 'last-one': lastOne }"
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
  position: relative;
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

:deep(.vs__search) {
  border: none;
  background: none;
  outline: none;
}

:deep(.vs__search:only-child) {
  width: 100%;
}

:deep(.vs__selected) {
  color: var(--title-color);
  font-size: 0.9rem;
}

:deep(.vs__clear) {
  display: none !important;
}

:deep(.vs__dropdown-toggle) {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

:deep(.vs__dropdown-menu) {
  position: absolute;
  left: -1px;
  right: -1px;
  top: 56px;
  list-style-type: none;
  outline: 2px solid var(--container-color);
  padding: 0.6rem 0;
  border-radius: 0.4rem;

  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    from(rgba(6, 6, 6, 0.98))
  );
  backdrop-filter: blur(10px) saturate(180%);

  z-index: 1000;
}

:deep(.vs__dropdown-option) {
  padding: 0.4rem 0.6rem;
}

:deep(.vs__dropdown-option.vs__dropdown-option--highlight) {
  background-color: var(--dark-color);
}

:deep(.vs__open-indicator) {
  display: none;
}

:deep(::placeholder) {
  color: var(--text-color);
}
</style>
