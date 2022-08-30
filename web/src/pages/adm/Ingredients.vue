<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import Navbar from '../../components/Navbar.vue';
import PageHeader from '../../components/PageHeader.vue';
import Table from '../../components/Table.vue';

export default defineComponent({
  data() {
    return {};
  },
  components: {
    Navbar,
    PageHeader,
    Table,
  },
});
</script>

<template>
  <div class="wrapper">
    <header>
      <Navbar adm />
    </header>

    <div class="new-ingredient">
      <div class="new-ingredient__container container">
        <PageHeader
          :title="'Create a new ingredient'"
          :path="'ArtNBurger > Adm > New Ingredient'"
        />
        <Table
          style="margin-top: 40px"
          :columns="['code', 'name', 'price']"
          :items="[
            {
              code: 1,
              name: 'Tomato',
              price: '$ 1,00',
            },
            {
              code: 2,
              name: 'Cheese',
              price: '$ 1,00',
            },
          ]"
        ></Table>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  margin-top: 6rem;
}

.new-ingredient {
  padding-top: 2rem;

  &__container {
  }
}
</style>
