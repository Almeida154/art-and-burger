<script setup lang="ts">
import { defineProps, reactive, ref } from 'vue';

interface NavBarI {
  firstNumber: number;
  secondNumber: number;
}

defineProps<NavBarI>();

// const state = reactive({
//   sum: 0,
//   num1: 0,
//   num2: 0,
// });

const sum = ref(0);
const num1 = ref(0);
const num2 = ref(0);

function handleSumFormSubmit(e: Event) {
  e.preventDefault();
  sum.value = num1.value + num2.value;
}
</script>

<template>
  <h1 class="navbar">Navbar</h1>

  <form @submit="handleSumFormSubmit($event)">
    <input type="number" name="num1" v-model="num1" />
    <input type="number" name="num2" v-model="num2" />
    <input type="submit" value="Sum" />
  </form>

  <p>{{ sum }}</p>
</template>
