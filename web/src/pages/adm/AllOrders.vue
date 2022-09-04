<script lang="ts">
import { defineComponent } from '@vue/runtime-core';

import VueFeather from 'vue-feather';

import Navbar from '../../components/Navbar.vue';
import PageHeader from '../../components/PageHeader.vue';
import Tag from '../../components/Tag.vue';

import api from '../../services/api';
import Button from '../../components/Button.vue';
import Table from '../../components/Table.vue';

type Status = {
  id: string;
  desc: string;
};

type Item = {
  id: string;
  name: string;
  price: string;
  type: string;
  ingredients: [{ name: string }];
};

type Order = {
  id: string;
  totalPrice: string;
  orderedAt: string;
  status: {
    desc: string;
  };
  items: Item[];
};

export default defineComponent({
  data() {
    return {
      statuses: [] as Status[],
      columns: ['id', 'total', 'date', 'status'],
      items: [
        {
          id: 'cb91ab90-4d82-4019-91db-88186f96c575',
          total: '$138',
          date: '29/08/22',
          status: 'accepted',
        },
        {
          id: '23decce5-6ea6-402c-b259-1823fad6f5ca',
          total: '$138',
          date: '29/08/22',
          status: 'done',
        },
      ],
    };
  },

  async created() {
    const { data } = await api.get<{ statuses: Status[] }>('status');
    this.statuses = data.statuses;
  },

  methods: {
    onItemClick(order: Order) {
      console.log(order.id);
    },
  },

  components: {
    Navbar,
    PageHeader,
    Tag,
    Button,
    VueFeather,
    Table,
  },
});
</script>

<template>
  <div class="wrapper">
    <header>
      <Navbar adm />
    </header>

    <div class="all-orders">
      <div class="all-orders__container container">
        <PageHeader
          :title="'All Orders, Admin '"
          :path="'ArtNBurger > Adm > All Orders'"
        />

        <div class="filters">
          <div class="tags">
            <Tag v-for="status in statuses" :key="status.id" :text="status.desc" />
          </div>

          <div class="update-container">
            <a class="update">
              <vue-feather type="refresh-ccw" size="1rem"></vue-feather>
            </a>
          </div>
        </div>

        <div class="orders-list">
          <Table
            :columns="columns"
            :items="items"
            @onItemClick="onItemClick"
          ></Table>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  margin-top: 6rem;
}

.all-orders {
  padding: 2rem 0;

  &__container {
    .filters {
      margin-top: 2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .tags {
        display: flex;
        gap: 0.4rem;
      }

      .update-container {
        .update {
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          background: var(--accent-color);
          padding: 0.6rem;
          border-radius: 0.4rem;
          cursor: pointer;
          color: var(--title-color);

          &:hover {
            background: var(--darker-accent-color);
          }
        }
      }
    }

    .orders-list {
      margin-top: 2rem;
    }
  }
}
</style>
