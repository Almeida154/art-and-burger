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

    <div class="ingredients">
      <div class="ingredients__container container">
        <PageHeader
          :title="'Create a new ingredient'"
          :path="'ArtNBurger > Adm > New Ingredient'"
        />

        <div class="content">
          <Table
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
              {
                code: 2,
                name: 'Cheese',
                price: '$ 1,00',
              },
              {
                code: 2,
                name: 'Cheese',
                price: '$ 1,00',
              },
              {
                code: 2,
                name: 'Cheese',
                price: '$ 1,00',
              },
              {
                code: 2,
                name: 'Cheese',
                price: '$ 1,00',
              },
              {
                code: 2,
                name: 'Cheese',
                price: '$ 1,00',
              },
              {
                code: 2,
                name: 'Cheese',
                price: '$ 1,00',
              },
              {
                code: 2,
                name: 'Cheese',
                price: '$ 1,00',
              },
              {
                code: 2,
                name: 'Cheese',
                price: '$ 1,00',
              },
              {
                code: 2,
                name: 'Cheese',
                price: '$ 1,00',
              },
            ]"
          ></Table>
          <div class="sticky-container">
            <div class="sticky">a</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  margin-top: 6rem;
}

.ingredients {
  padding-top: 2rem;

  &__container {
    .content {
      display: grid;
      grid-template-columns: 1fr 0.5fr;
      column-gap: 1rem;
      margin-top: 2rem;

      .sticky-container {
        position: relative;
        width: 100%;

        .sticky {
          position: sticky;
          top: 8rem;
          border-radius: 0.2rem;
          background-color: var(--darker-container-color);
          width: inherit;
          padding: 1.4rem;
        }
      }
      @media screen and (max-width: 667px) {
        grid-template-columns: 1fr;

        .sticky-container {
          display: none;
        }
      }
    }
  }
}
</style>
