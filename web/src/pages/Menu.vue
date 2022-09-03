<script lang="ts">
import Navbar from '../components/Navbar.vue';
import Tag from '../components/Tag.vue';

import api from '../services/api';
import Card from '../components/Card.vue';

import { defineComponent } from '@vue/runtime-core';
import PageHeader from '../components/PageHeader.vue';

type ItemType = {
  id: number;
  desc: string;
};

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
      itemTypes: [] as ItemType[],
    };
  },

  async created() {
    const { data } = await api.get<{ itemTypes: ItemType[] }>('item-types');
    this.itemTypes = data.itemTypes;
  },

  components: {
    Navbar,
    Tag,
    Card,
    PageHeader,
  },
});
</script>

<template>
  <div class="wrapper">
    <header>
      <Navbar menu />
    </header>

    <div class="menu">
      <div class="menu__container container">
        <PageHeader :title="'Our menu'" :path="'Art&Burger > Menu'" />

        <div class="filters">
          <div class="tags">
            <Tag
              v-for="itemType in itemTypes"
              :key="itemType.id"
              :text="itemType.desc"
            />
          </div>

          <p>Filter by</p>
        </div>

        <div class="items">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  margin-top: 6rem;
}

.menu {
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

      p {
        color: var(--text-color);
      }
    }

    .items {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 0.8fr));
      justify-content: center;
      align-content: space-around;
      align-items: center;
      margin-top: 5rem;
      row-gap: 1rem;
      column-gap: 1rem;

      @media (max-width: 460px) {
        grid-template-columns: 1fr;
      }
    }
  }
}
</style>
