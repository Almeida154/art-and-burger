<script lang="ts">
import { ShoppingCartIcon } from 'vue-feather-icons';

export default {
  components: {
    ShoppingCartIcon,
  },
};
</script>

<template>
  <nav class="container">
    <img src="img/accent-brand.svg" alt="ArtNBurger brand image" />

    <div class="menu">
      <ul>
        <li><a href="#">Burgers</a></li>
        <li><a href="#">Drinks</a></li>
        <li><a href="#">Orders</a></li>
      </ul>

      <div class="buttons">
        <button>
          <shopping-cart-icon size="1.5x" class="custom-class"></shopping-cart-icon>
        </button>
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 6rem;

  img {
    width: 180px;
    cursor: pointer;
  }

  .menu {
    display: flex;
    align-items: center;
    gap: 4rem;

    ul {
      display: flex;
      gap: 4rem;
      list-style: none;

      li {
        font-size: 0.8rem;
        text-transform: uppercase;

        a {
          color: var(--text-color);
          transition: color 0.2s;

          &:hover {
            color: var(--accent-color);
          }
        }
      }
    }
  }
}
</style>
