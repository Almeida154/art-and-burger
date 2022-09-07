<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import VueFeather from 'vue-feather';

import Navbar from '../../components/Navbar.vue';
import PageHeader from '../../components/PageHeader.vue';
import Table from '../../components/Table.vue';
import Fab from '../../components/Fab.vue';
import Sidebar from '../../components/Sidebar.vue';
import Input from '../../components/Input.vue';
import Button from '../../components/Button.vue';
import Modal from '../../components/Modal.vue';

type Item = {
  id: number;
  name: string;
  price: number;
  type: string;
  ingredients: [{ name: string }];
};

export default defineComponent({
  data() {
    return {
      items: [] as Item[],
    };
  },
  components: {
    Navbar,
    PageHeader,
    Table,
    Fab,
    Sidebar,
    Input,
    Button,
    Modal,
    VueFeather,
  },
  methods: {
    onItemClick(item: Item) {},
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
        <PageHeader :title="'Registered Items'" :path="'ArtNBurger > Adm > Items'" />

        <div class="content">
          <Table
            :columns="['id', 'name', 'price', 'type']"
            :items="[
              {
                id: '23decce5-6ea6-402c-b259-1823fad6f5ca',
                name: 'Cheeseburger',
                price: '$ 10,00',
                type: 'meat',
              },
              {
                id: '23decce5-6ea6-402c-b259-1823fad6f5ca',
                name: 'Veggieburger M',
                price: '$ 7,00',
                type: 'veggie',
              },
              {
                id: '23decce5-6ea6-402c-b259-1823fad6f5ca',
                name: 'Coca-Cola 300 ML',
                price: '$ 2,00',
                type: 'drink',
              },
            ]"
            @onItemClick="onItemClick"
          ></Table>

          <div class="sticky-container">
            <div class="sticky">
              <h4>General items details</h4>
              <div class="detail-item">
                <p>Total</p>
                <span>06</span>
              </div>

              <div class="detail-item">
                <p>More expensive</p>
                <span>$ 3</span>
              </div>

              <div class="detail-item">
                <p>Cheaper:</p>
                <span>$ 0.2</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  position: relative;
  margin-top: 6rem;
}
.ingredients {
  padding: 2rem 0;

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

          h4 {
            font-size: 1rem;
            font-weight: 300;
            margin-bottom: 2rem;
          }

          .detail-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-bottom: 0.4rem;
            border-bottom: 1px dashed var(--container-color);

            span {
              font-weight: 300;
            }
          }

          .detail-item + .detail-item {
            margin-top: 1rem;
          }
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
