<script setup lang="ts">
import { onMounted, reactive, ref } from '@vue/runtime-core';
import Navbar from './components/Navbar.vue';

var state = reactive({
  isLoading: true,
});

onMounted(() => {
  setTimeout(() => (state.isLoading = false), 1000);
});
</script>

<template>
  <Navbar v-if="!state.isLoading" :firstNumber="5" :secondNumber="7" />
</template>

<style scoped></style>
