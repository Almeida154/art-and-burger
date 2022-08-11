<script lang="ts">
import Navbar from '../components/Navbar.vue';
import Tag from '../components/Tag.vue';

import api from '../services/api';
import Card from '../components/Card.vue';

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

export default {
  data() {
    return {
      items: [] as Item[],
      itemTypes: [] as ItemType[],
    };
  },

  async created() {
    const { data } = await api.get('item-types');
    // @ts-ignore
    this.itemTypes = data.itemTypes;
  },

  components: {
    Navbar,
    Tag,
    Card,
  },
};
</script>

<template>
  <div class="wrapper">
    <Navbar />

    <div class="menu">
      <div class="menu__container container">
        <span>Art&Burger > Menu</span>
        <h3>Our menu</h3>

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
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.menu {
  height: 2000px;

  &__container {
    margin-top: 2rem;

    span {
      opacity: 0.3;
      color: var(--text-color);
      word-spacing: 0.4rem;
    }

    h3 {
      margin-top: 1rem;
      font-weight: 400;
      font-size: 1.8rem;
      color: var(--title-color);
    }

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
      margin-top: 5rem;
      display: flex;
      gap: 1rem;
    }
  }
}
</style>
