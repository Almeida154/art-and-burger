<script lang="ts">
import { defineComponent } from 'vue';
import VueFeather from 'vue-feather';

export default defineComponent({
  components: {
    VueFeather,
  },
  props: {
    landing: {
      type: Boolean,
    },
    menu: {
      type: Boolean,
    },
  },
  methods: {
    handleToggleNav() {
      const nav = document.querySelector('#nav');
      if (nav) {
        nav.classList.toggle('active');
      }
    },
  },
});
</script>

<template>
  <header class="header container">
    <img src="img/accent-brand.svg" alt="ArtNBurger brand image" />
    <div class="header__content">
      <div class="links">
        <nav class="nav" id="nav">
          <ul>
            <li v-show="landing"><a href="#">Sign in</a></li>
            <li v-show="landing"><a href="#">Menu</a></li>
            <li v-show="landing"><a href="#">About</a></li>
            <li v-show="landing"><a href="#">Contact</a></li>

            <li v-show="menu"><a href="#">Orders</a></li>
          </ul>

          <div class="toggle-nav close" id="toggleNav">
            <vue-feather
              type="x"
              size="1.6rem"
              @click="handleToggleNav"
            ></vue-feather>
          </div>
        </nav>
      </div>

      <div v-show="menu" class="cart-container">
        <a class="cart">
          <vue-feather type="shopping-cart" size="1rem"></vue-feather>
        </a>
      </div>

      <div class="toggle-nav open" id="toggleMenu">
        <vue-feather
          type="menu"
          size="1.6rem"
          @click="handleToggleNav"
        ></vue-feather>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 6rem;

  img {
    width: 180px;
    cursor: pointer;
  }

  &__content {
    display: flex;
    gap: 2rem;
    align-items: center;
  }

  .nav {
    display: flex;
    align-items: center;
    gap: 4rem;
    transition: all 0.5s;

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

    @media (max-width: 768px) {
      background: -webkit-gradient(
        linear,
        left top,
        left bottom,
        from(rgba(0, 0, 0, 0.9))
      );
      backdrop-filter: blur(15px) saturate(180%);
      display: flex;
      justify-content: center;
      position: fixed;
      left: 0;
      right: 0;
      top: -100%;
      height: 100vh;
      z-index: 10;

      ul {
        flex-direction: column;
        align-items: center;

        li {
          font-size: 1.4rem;
        }
      }

      &.active {
        top: 0;
      }
    }
  }

  .cart-container {
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

  .toggle-nav {
    display: none;
    align-items: center;
    justify-content: center;

    i {
      color: var(--accent-color);
      cursor: pointer;
    }

    @media (max-width: 768px) {
      display: flex;
    }

    &.close {
      top: 2.2rem;
      right: 2rem;
      position: absolute;
    }
  }
}
</style>
