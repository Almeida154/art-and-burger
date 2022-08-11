<script lang="ts">
import CardButton from './CardButton.vue';
import Counter from './Counter.vue';
export default {
  data() {
    return {
      count: 0,
      item: {
        price: 21,
      },
    };
  },
  methods: {
    add() {
      // @ts-ignore
      this.count++;
    },
    subtract() {
      // @ts-ignore
      if (this.count > 0) {
        // @ts-ignore
        this.count--;
      }
    },
  },
  components: { CardButton, Counter },
};
</script>

<template>
  <div class="card">
    <img src="img/burger2.png" />
    <h5>Cheesebacon</h5>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, a?</p>
    <span>$ {{ count > 0 ? count * item.price : item.price }}</span>

    <CardButton id="card-button" text="Add to cart" />
    <Counter :count="count" @subtract="subtract" @add="add" />
  </div>
</template>

<style lang="scss" scoped>
.card {
  background-color: var(--container-color);
  width: 220px;
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  border-radius: 0.8rem;

  img {
    width: 60%;
    margin: 0 auto;
  }

  h5 {
    margin-top: 1rem;
    font-size: 1rem;
    font-weight: 500;
    color: var(--title-color);
  }

  p {
    margin-top: 0.4rem;
    font-size: 0.7rem;
    font-weight: 300;
    color: var(--text-color);
    opacity: 0.7;
  }

  span {
    margin-top: 1rem;
    font-size: 1rem;
    color: var(--text-color);
  }

  #card-button {
    margin-top: 2rem;

    & + .counter {
      margin-top: 0.6rem;
    }
  }
}
</style>
