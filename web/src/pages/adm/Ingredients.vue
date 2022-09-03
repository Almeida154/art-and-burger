<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import Navbar from '../../components/Navbar.vue';
import PageHeader from '../../components/PageHeader.vue';
import Table from '../../components/Table.vue';
import Fab from '../../components/Fab.vue';
import Sidebar from '../../components/Sidebar.vue';
import Input from '../../components/Input.vue';
import Button from '../../components/Button.vue';

export default defineComponent({
  data() {
    return {
      isOpen: false,
      ingredientName: '',
      ingredientPrice: 0,
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
  },
  methods: {
    handleOpenSidebar() {
      this.$data.isOpen = true;
    },
    onCloseSidebar() {
      console.log('now we should do a new request');
      this.$data.isOpen = false;
    },
    handleCreateIngredient() {
      if (this.ingredientName != '' && this.ingredientPrice != 0) {
        console.log('creating');
      } else {
        console.log('something went wrong');
      }
    },
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
            <div class="sticky">
              <h4>General ingredients details</h4>
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

    <Fab icon="plus" @click="handleOpenSidebar" />

    <Sidebar
      title="New ingredient"
      subtitle="Please, fill in all this fields to create a new ingredient."
      @onCloseSidebar="onCloseSidebar"
      :isOpen="isOpen"
    >
      <form>
        <Input firstOne placeholder="Name" v-model="ingredientName" />
        <Input lastOne placeholder="Price" v-model="ingredientPrice" />
        <Button
          :variant="
            ingredientName != '' && ingredientPrice != 0 ? 'primary' : 'disabled'
          "
          text="Create"
          @click="handleCreateIngredient"
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

  @media (max-width: 456px) {
    width: 100%;
  }

  .btn {
    margin-top: 1rem;
    max-width: 340px;
  }
}
</style>
