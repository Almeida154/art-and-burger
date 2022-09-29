<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import type { PropType } from 'vue';
import VSelect from 'vue-select';
import VueFeather from 'vue-feather';

import Counter from './Counter.vue';

type Ingredient = {
  id: string;
  name: string;
  price: number;
};

export default defineComponent({
  data() {
    return {
      count: 1,
      availableIngredients: this.$props.ingredients,
      alreadySelectedIngredients: this.$props.alreadySelectedIngredients,
    };
  },
  props: {
    ingredient: {
      type: Object as PropType<Ingredient>,
    },
    ingredients: {
      type: [] as PropType<Ingredient[]>,
    },
    alreadySelectedIngredients: {
      type: [] as PropType<Ingredient[]>,
    },
  },
  computed: {
    selected: {
      get() {
        if (this.$props.ingredient?.id) {
          return this.$props.ingredient;
        }
      },
      set(value: any) {
        this.$emit('setIngredientSelected', value);
      },
    },
  },
  methods: {
    add() {
      this.count++;
    },
    subtract() {
      if (this.count > 1) {
        this.count--;
      }
    },
  },
  mounted() {
    this.$data.availableIngredients = this.$props.ingredients?.filter(
      (ingredient: Ingredient) =>
        !this.$props.alreadySelectedIngredients?.includes(ingredient)
    );
  },
  components: { Counter, VueFeather, VSelect },
});
</script>

<template>
  <div class="ingredient-item">
    <v-select
      v-model="selected"
      :searchable="true"
      :options="availableIngredients"
      label="name"
      class="name"
      placeholder="Choose a ingredient..."
    />
    <Counter class="counter" :count="count" @add="add" @subtract="subtract" />
    <div @click="$emit('removeIngredient')" class="icon">
      <VueFeather class="ic" type="trash" size="1.2rem" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ingredient-item {
  position: relative;
  display: flex;
  color: var(--title-color);
  font-size: 0.7rem;
  font-weight: 500;
  align-items: center;

  .name {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    font-weight: 300;
    flex: 3;
    background: var(--container-color);
    margin-right: 1rem;
    height: 2.8rem;
    border-radius: 0.6rem;
    position: relative;
  }

  .counter {
    flex: 2;
    margin-right: 1rem;
  }

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--darker-container-color);
    color: var(--darker-accent-color);
    height: 2.8rem;
    width: 2.8rem;
    border-radius: 0.6rem;
    cursor: pointer;
    transition: 0.3s ease-in-out;

    &:hover {
      background: var(--dark-color);
    }
  }
}

:deep(.vs__search) {
  position: absolute;
  display: block;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  padding: 0.4rem 0.8rem;
  background: none !important;
  border: none;
  outline: none;
}

:deep(.vs__selected) {
  color: var(--title-color);
  font-size: 0.9rem;
}

:deep(.vs__actions) {
  display: none !important;
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

:deep(.vs__selected-options):focus-within {
  .vs__selected {
    display: none;
  }
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
