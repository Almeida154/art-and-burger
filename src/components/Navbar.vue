<script setup lang="ts">
import { defineProps, reactive, ref } from 'vue';

interface NavBarI {
  firstNumber: number;
  secondNumber: number;
}

defineProps<NavBarI>();

const state = reactive({
  sum: 0,
  num1: 0,
  num2: 0,
});

function handleSumFormSubmit(e: Event) {
  e.preventDefault();

  state.sum = state.num1 + state.num2;
  console.log(state.sum);
  console.log(state.num1 + state.num2);
}
</script>

<template>
  <h1 class="navbar">Navbar</h1>

  <form @submit="handleSumFormSubmit($event)">
    <input type="number" name="num1" :value="firstNumber" />
    <input type="number" name="num2" :value="secondNumber" />
    <input type="submit" value="Sum" />
  </form>

  <p>{{ state.sum }}</p>
</template>
