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
import api from '../../services/api';

type Ingredient = {
  id: string;
  name: string;
  price: number;
};

export default defineComponent({
  data() {
    return {
      ingredients: [] as Ingredient[],

      isSidebarOpen: false,
      isModalOpen: false,

      mayDelete: false,
      deleteInterval: {} as ReturnType<typeof setInterval>,
      deleteTime: 3,

      selectedIngredient: {} as Ingredient,
      updatedIngredient: {} as Ingredient,
      newIngredient: {
        name: '',
        price: 0,
      } as Ingredient,

      moreExpensive: 0,
      cheaper: 0,
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
    handleOpenSidebar() {
      this.$data.isSidebarOpen = true;
    },
    onCloseSidebar() {
      this.$data.isSidebarOpen = false;
    },
    toggleModal() {
      this.$data.isModalOpen = !this.$data.isModalOpen;
    },
    onCloseModal() {
      this.$data.isModalOpen = false;
    },

    async handleGetIngredients() {
      const { data } = await api.get<Ingredient[]>('ingredients');
      this.$data.ingredients = data;

      const prices = data.map((ingredient: Ingredient) => Number(ingredient.price));
      this.$data.cheaper = Math.min(...prices);
      this.$data.moreExpensive = Math.max(...prices);
    },
    async handleCreateIngredient() {
      if (this.newIngredient.name != '' && this.newIngredient.price != 0) {
        const { data } = await api.post('ingredient', this.$data.newIngredient);
        this.handleGetIngredients();
        this.$data.isSidebarOpen = false;
      } else {
        console.log('something went wrong');
      }
    },
    async handleUpdateIngredient(id: string) {
      const { data } = await api.put(
        `ingredient/${id}`,
        this.$data.updatedIngredient
      );
      this.handleGetIngredients();
      this.toggleModal();
    },
    async handleDeleteIngredient(id: string) {
      this.$data.deleteTime = 3;

      if (this.$data.mayDelete) {
        clearInterval(this.$data.deleteInterval);
        this.$data.mayDelete = false;
        this.toggleModal();

        const { data } = await api.delete(`ingredient/${id}`);
        this.handleGetIngredients();
      } else {
        this.$data.mayDelete = true;

        this.$data.deleteInterval = setInterval(() => {
          this.$data.deleteTime--;
          if (this.$data.deleteTime == 0) {
            clearInterval(this.$data.deleteInterval);
            this.$data.mayDelete = false;
          }
        }, 1 * 1000);
      }
    },

    onItemClick(ingredient: Ingredient) {
      this.toggleModal();
      this.$data.selectedIngredient = ingredient;
      this.$data.updatedIngredient.name = ingredient.name;
      this.$data.updatedIngredient.price = ingredient.price;
    },
  },
  mounted() {
    this.handleGetIngredients();
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
          :title="'Registered Ingredients'"
          :path="'ArtNBurger > Adm > Ingredients'"
        />

        <div class="content">
          <Table
            :columns="['id', 'name', 'price']"
            :items="ingredients"
            @onItemClick="onItemClick"
          ></Table>

          <div class="sticky-container">
            <div class="sticky">
              <h4>General ingredients details</h4>
              <div class="detail-item">
                <p>Total</p>
                <span>{{ ingredients.length }}</span>
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
      title="New ingredient"
      subtitle="Please, fill in all this fields to create a new ingredient."
      @onCloseSidebar="onCloseSidebar"
      :isOpen="isSidebarOpen"
    >
      <form class="sidebar">
        <Input firstOne placeholder="Name" v-model="newIngredient.name" />
        <Input lastOne placeholder="Price" v-model="newIngredient.price" />
        <Button
          :variant="
            newIngredient.name != '' && newIngredient.price != 0
              ? 'primary'
              : 'disabled'
          "
          text="Create"
          @click="handleCreateIngredient"
        ></Button>
      </form>
    </Sidebar>

    <Modal
      :title="selectedIngredient.name"
      subtitle="You can edit, delete or view this ingredient."
      @onCloseModal="onCloseModal"
      :isOpen="isModalOpen"
    >
      <form class="modal">
        <Input
          firstOne
          placeholder="Name"
          :value="updatedIngredient.name"
          v-model="updatedIngredient.name"
        />
        <Input
          lastOne
          placeholder="Price"
          :value="updatedIngredient.price"
          v-model="updatedIngredient.price"
        />
        <Button
          :variant="
            updatedIngredient.name != '' && updatedIngredient.price != 0
              ? 'primary'
              : 'disabled'
          "
          text="Update"
          @click="handleUpdateIngredient(selectedIngredient.id)"
        ></Button>
        <Button
          variant="secondary"
          :text="mayDelete ? `Confirm delete? ${deleteTime}s` : 'Delete'"
          @click="handleDeleteIngredient(selectedIngredient.id)"
        ></Button>
      </form>
    </Modal>
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

form {
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 50%;
  margin: 0 auto;
  transition: 0.3s ease-in;

  &.sidebar {
    @media (max-width: 667px) {
      width: 100%;
    }
  }

  &.modal {
    @media (max-width: 767px) {
      width: 100%;
    }
  }

  .btn {
    margin-top: 1rem;
    max-width: 540px;
  }
}
</style>
