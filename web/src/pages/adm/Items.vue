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
import Tag from '../../components/Tag.vue';
import Select from '../../components/Select.vue';

import api from '../../services/api';
import IngredientItem from '../../components/IngredientItem.vue';

type ItemType = {
  id: number;
  desc: string | null;
};

type Ingredient = {
  id: string;
  name: string;
  price: number;
};

type IngredientToSend = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

type Item = {
  id: number;
  name: string;
  price: number;
  itemType: ItemType | null;
  ingredients: IngredientToSend[] | null;
};

type Status = {
  id: string;
  desc: string;
};

export default defineComponent({
  data() {
    return {
      items: [] as Item[],
      itemTypes: [] as ItemType[],
      ingredients: [] as Ingredient[],
      statuses: [] as Status[],

      isSidebarOpen: false,
      isModalOpen: false,

      newItem: {
        name: '',
        price: 0,
        itemType: {
          desc: null,
        },
        ingredients: null,
      } as Item,

      moreExpensive: 0,
      cheaper: 0,
    };
  },
  computed: {
    cost() {
      // @ts-ignore
      return this.$data.newItem.ingredients
        ?.filter((ingredient: IngredientToSend) => ingredient.id)
        ?.reduce(
          (acc: number, ingredient: IngredientToSend) =>
            acc + ingredient.price * ingredient.quantity,
          0
        )
        .toFixed(2);
    },
    recommendedPrice() {
      // @ts-ignore
      return (Number(this.cost) + this.cost * 0.3).toFixed(2);
    },
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
    Tag,
    Select,
    IngredientItem,
  },
  methods: {
    handleOpenSidebar() {
      this.$data.isSidebarOpen = true;
    },

    onCloseSidebar() {
      console.log('now we should do a new request');
      this.$data.isSidebarOpen = false;
    },

    async handleGetItems() {
      const { data } = await api.get<Item[]>('items');
      this.$data.items = data;

      const prices = data.map((item: Item) => Number(item.price));
      this.$data.cheaper = Math.min(...prices);
      this.$data.moreExpensive = Math.max(...prices);
    },

    async handleCreateItem() {
      if (this.newItem.name != '' && this.newItem.price != 0) {
        console.log('creating');
      } else {
        console.log('something went wrong');
      }
    },

    async handleUpdateItem(id: string) {},

    async handleDeleteItem(id: string) {},

    async handleGetStatuses() {
      const { data } = await api.get<{ statuses: Status[] }>('status');
      this.statuses = data.statuses;
    },

    async handleGetItemTypes() {
      const { data } = await api.get<{ itemTypes: ItemType[] }>('item-types');
      this.itemTypes = data.itemTypes;
    },

    async handleGetIngredients() {
      const { data } = await api.get<Ingredient[]>('ingredients');
      this.$data.ingredients = data;
    },

    setItemTypeSelected(itemType: ItemType) {
      this.$data.newItem.itemType = itemType;

      if (this.$data.newItem.ingredients !== null) return;

      if (this.$data.ingredients[0]) {
        const initialIngredient: IngredientToSend = {
          ...this.$data.ingredients[0],
          quantity: 1,
        };
        this.$data.newItem.ingredients = [initialIngredient];
      }
    },

    setIngredientSelected(ingredient: IngredientToSend, index: number) {
      if (this.$data.newItem.ingredients) {
        this.$data.newItem.ingredients[index] = ingredient;
      }
    },

    handleUpdateIngredientQty(qty: number, index: number) {
      if (this.$data.newItem.ingredients) {
        this.$data.newItem.ingredients[index].quantity = qty;
      }
    },

    handleRemoveIngredient(index: number) {
      if (this.$data.newItem.ingredients?.length == 1) return;
      this.$data.newItem.ingredients?.splice(index, 1);
    },

    handleAddIngredient() {
      this.$data.newItem.ingredients?.push({} as IngredientToSend);
    },

    handleFormSubmit(e: Event) {
      e.preventDefault();
    },

    onItemClick(item: Item) {},
  },
  mounted() {
    this.handleGetItems();
    this.handleGetStatuses();
    this.handleGetItemTypes();
    this.handleGetIngredients();
  },
});
</script>

<template>
  <div class="wrapper">
    <header>
      <Navbar adm />
    </header>

    <div class="items">
      <div class="items__container container">
        <PageHeader :title="'Registered Items'" :path="'ArtNBurger > Adm > Items'" />

        <div class="tags">
          <Tag v-for="status in statuses" :key="status.id" :text="status.desc" />
        </div>

        <div class="content">
          <Table
            :columns="['id', 'name', 'price', 'type']"
            :items="items"
            @onItemClick="onItemClick"
          ></Table>

          <div class="sticky-container">
            <div class="sticky">
              <h4>General items details</h4>
              <div class="detail-item">
                <p>Total</p>
                <span>{{ items.length }}</span>
              </div>

              <div class="detail-item">
                <p>More expensive</p>
                <span>$ {{ moreExpensive }}</span>
              </div>

              <div class="detail-item">
                <p>Cheaper:</p>
                <span>$ {{ cheaper }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Fab icon="plus" @click="handleOpenSidebar" />

    <Sidebar
      title="New item"
      subtitle="Please, fill in all this fields to create a new item."
      @onCloseSidebar="onCloseSidebar"
      :isOpen="isSidebarOpen"
    >
      <form class="sidebar" v-on:submit="handleFormSubmit">
        <Input firstOne placeholder="Name" v-model="newItem.name" />
        <Select
          :lastOne="
            (newItem.itemType && newItem.itemType.desc) === null ||
            (newItem.itemType && newItem.itemType.desc) !== 'drink'
          "
          :searchable="false"
          :options="itemTypes"
          label="desc"
          placeholder="Type"
          @setItemTypeSelected="setItemTypeSelected"
        ></Select>

        <div
          class="ingredients"
          v-show="
            (newItem.itemType && newItem.itemType.desc) !== null &&
            (newItem.itemType && newItem.itemType.desc) !== 'drink'
          "
        >
          <div class="header">
            <p>Ingredients:</p>
            <Button
              text="New Ingredient"
              leftIcon="plus"
              @click="handleAddIngredient"
            ></Button>
          </div>

          <div class="ingredient-list">
            <IngredientItem
              v-for="(ingredient, index) in newItem.ingredients"
              :key="ingredient.id"
              :ingredient="ingredient"
              :ingredients="ingredients"
              :alreadySelectedIngredients="newItem.ingredients ?? []"
              @setIngredientSelected="
                (newIngredient) => setIngredientSelected(newIngredient, index)
              "
              @setIngredientQuantity="(qty) => handleUpdateIngredientQty(qty, index)"
              @removeIngredient="handleRemoveIngredient(index)"
            />
          </div>
        </div>

        <div
          class="prices"
          v-show="
            (newItem.itemType && newItem.itemType.desc) !== null &&
            (newItem.itemType && newItem.itemType.desc) !== 'drink'
          "
        >
          <p>Cost: $ {{ cost }}</p>
          <p>|</p>
          <p>Recommended price: $ {{ recommendedPrice }}</p>
        </div>

        <Input
          placeholder="Price"
          v-model="newItem.price"
          v-show="(newItem.itemType && newItem.itemType.desc) !== null"
          lastOne
          :firstOne="(newItem.itemType && newItem.itemType.desc) !== 'drink'"
        />

        <Button
          class="send"
          :variant="
            newItem.name != '' &&
            newItem.price != 0 &&
            newItem.itemType &&
            newItem.itemType.desc !== null
              ? 'primary'
              : 'disabled'
          "
          text="Create"
          @click="handleCreateItem"
        ></Button>
      </form>
    </Sidebar>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  position: relative;
  margin-top: 6rem;
}

.items {
  padding: 2rem 0;

  &__container {
    .tags {
      margin-top: 2rem;
      display: flex;
      gap: 0.4rem;
    }

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

form {
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 60%;
  margin: 0 auto;
  transition: 0.3s ease-in;

  &.sidebar {
    .btn.send {
      margin-top: 1rem;
      max-width: 540px;
    }

    @media (max-width: 1024px) {
      width: 100%;
    }

    @media (max-width: 667px) {
      width: 100%;

      .input,
      .btn.send {
        max-width: 100%;
      }
    }
    .ingredients {
      margin-top: 1rem;

      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid var(--container-color);

        .btn {
          color: var(--accent-color);
          text-shadow: none;
          padding: 0;

          &:hover {
            text-shadow: 0 0 48px var(--accent-color);
          }
        }
      }

      .ingredient-list {
        margin: 1rem 0;

        .ingredient-item + .ingredient-item {
          margin-top: 0.8rem;
        }
      }
    }

    .prices {
      display: flex;
      margin-bottom: 8px;
      gap: 16px;

      p {
        font-size: 10px;
        opacity: 0.2;
      }
    }
  }

  &.modal {
    @media (max-width: 767px) {
      width: 100%;
    }
  }
}
</style>
