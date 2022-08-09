<script lang="ts">
import VueFeather from 'vue-feather';

export default {
  components: {
    VueFeather,
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
        <a class="cart">
          <vue-feather type="shopping-cart" size="1rem"></vue-feather>
        </a>
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
          font-weight: 500;
          text-shadow: 0 0 24px rgba(255, 255, 255, 0.5);

          &:hover {
            color: var(--accent-color);
            text-shadow: 0 0 24px var(--accent-color);
          }
        }
      }
    }

    .buttons {
      .cart {
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
}
</style>
