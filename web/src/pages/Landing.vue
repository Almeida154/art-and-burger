<script lang="ts">
import api from '../services/api';
import Navbar from '../components/Navbar.vue';
import Button from '../components/Button.vue';
import router from '../router';

interface BaseComponentData {
  ordersCount: number;
}

export default {
  data(): BaseComponentData {
    return {
      ordersCount: 0,
    };
  },

  async created() {
    const { data } = await api.get<number>('/orders/count');
    // @ts-ignore
    this.ordersCount = data;
  },

  methods: {
    handleGoToMenu() {
      router.push('/menu');
    },
  },

  components: {
    Navbar,
    Button,
  },
};
</script>

<template>
  <div class="wrapper">
    <header>
      <Navbar />
    </header>

    <div class="blur-fx first"></div>
    <div class="blur-fx second"></div>

    <section class="hero">
      <div class="hero__container container">
        <div class="content">
          <span class="subtitle">More than {{ ordersCount }} orders placed.</span>
          <h2 class="title">
            Special tasty <br />
            Burger.
          </h2>
          <p class="description">
            The best way to cook burgers in bugo he ultimate goal when cooking a bugo
            burger is a perfectly cooked burger that is juicy and packed with flavor.
          </p>
          <div class="buttons">
            <Button text="Sign Up" variant="primary" />
            <Button text="Go to menu" @click="handleGoToMenu" />
          </div>
        </div>

        <div class="illustration">
          <img src="img/hero-illustration.png" alt="Burger illustration" />
          <img class="arrow" src="img/dotted-arrow.png" alt="Burger illustration" />
          <div class="price-card">
            <span>Only</span>
            <span class="price">$19.9</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  position: relative;
  overflow: hidden;

  .blur-fx {
    position: absolute;
    width: 300px;
    height: 500px;
    filter: blur(360px) saturate(180%);
    border-radius: 50%;
    background-color: #ffffff;
    opacity: 0.1;
    overflow: hidden;
  }

  .blur-fx.first {
    left: -10%;
    top: -40%;
  }

  .blur-fx.second {
    right: -20%;
    bottom: -40%;
  }
}

.hero {
  // background-color: tomato;
  height: calc(100vh - 6rem);

  &__container {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .content {
    flex: 1;

    .subtitle {
      display: block;
      font-size: 0.8rem;
      font-weight: 500;
      text-transform: uppercase;
      color: var(--darker-accent-color);
      letter-spacing: 0.2rem;
      margin-bottom: 1.2rem;
      text-shadow: 0 0 32px var(--accent-color);
    }

    .title {
      font-size: 5rem;
      line-height: calc(5rem * 1.1);
      margin-bottom: 2rem;
      text-shadow: 0 0 24px rgba(255, 255, 255, 0.25);
    }

    .description {
      color: var(--text-color);
      font-size: 0.9rem;
      line-height: calc(0.9rem * 2);
      max-width: 75%;
      opacity: 0.8;
    }

    .buttons {
      margin-top: 2.6rem;
      display: flex;
      gap: 1rem;
    }
  }

  .illustration {
    flex: 1;
    position: relative;

    img {
      max-width: 110%;
      // -webkit-transform: scaleX(-1);
      // transform: scaleX(-1);
    }

    .price-card {
      display: flex;
      justify-content: center;
      flex-direction: column;
      position: absolute;
      top: 60%;
      left: -10%;
      background: #fff;
      padding: 0.8rem 2.2rem;
      border-radius: 1.2rem;
      color: var(--dark-color);

      span {
        font-weight: 600;
      }

      .price {
        margin-top: 0.2rem;
        font-size: 2rem;
        color: var(--accent-color);
      }
    }

    .arrow {
      position: absolute;
      width: 15%;
      left: -5%;
      transform: rotate(-30deg);
      top: 40%;
    }
  }
}
</style>
