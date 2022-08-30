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
  id: number;
  desc: string;
};

export default defineComponent({
  data() {
    return {
      statuses: [] as Status[],
    };
  },

  async created() {
    const { data } = await api.get<{ statuses: Status[] }>('status');
    this.statuses = data.statuses;
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
            :columns="['code', 'total', 'date', 'status']"
            :items="[
              {
                code: `# ${'06a1356c-0bc7-42c1-81b9-5eedb8d249ef'.slice(0, 8)}...`,
                total: '$138',
                date: '29/08/22',
                status: 'accepted',
              },
              {
                code: `# ${'06a1356c-0bc7-42c1-81b9-5eedb8d249ef'.slice(0, 8)}...`,
                total: '$138',
                date: '29/08/22',
                status: 'done',
              },
              {
                code: `# ${'06a1356c-0bc7-42c1-81b9-5eedb8d249ef'.slice(0, 8)}...`,
                total: '$138',
                date: '29/08/22',
                status: 'pending',
              },
            ]"
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
  padding-top: 2rem;

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
