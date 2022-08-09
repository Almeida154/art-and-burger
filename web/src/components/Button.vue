<script lang="ts">
export default {
  props: {
    text: String,
    variant: String,
  },
};
</script>

<template>
  <a :class="`btn ${variant ? variant : ''}`">{{ text }}</a>
</template>

<style lang="scss" scoped>
.btn {
  height: 3rem;
  color: var(--title-color);
  font-size: 0.9rem;
  text-transform: uppercase;
  padding: 0.8rem 1.6rem;
  border-radius: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  text-shadow: 0 0 24px rgba(255, 255, 255, 0.5);

  &:hover {
    color: var(--text-color);
  }
}

.primary {
  background-color: var(--accent-color);

  &:hover {
    background-color: var(--darker-accent-color);
    color: var(--title-color);
  }
}
</style>
