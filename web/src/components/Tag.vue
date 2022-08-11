<script lang="ts">
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
  },
};
</script>

<template>
  <div class="tag">
    <p>{{ text }}</p>
  </div>
</template>

<style lang="scss" scoped>
.tag {
  outline: 1px solid var(--container-color);
  background-color: var(--darker-container-color);
  display: flex;
  align-items: center;
  justify-content: center;
  width: max-content;
  padding: 0.4rem 0.8rem;
  border-radius: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: var(--container-color);
  }

  p {
    font-size: 0.825rem;
    font-weight: 300;
    color: var(--text-color);
  }
}
</style>
