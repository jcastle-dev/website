<template>
  <div class="container">
    <input v-model="searchTerm" type="text" placeholder="Search tutorials" />
    <button><Icon name="ph:magnifying-glass-bold" size="1.25rem" /></button>
  </div>
</template>

<script setup lang="ts">
const searchTerm = defineModel();
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* padding: 1rem; */
  background-color: var(--color-surface);
  border-radius: var(--border-radius);
  overflow: hidden;
  /* padding: 0.5rem; */
  /* gap: 0.5rem; */

  input {
    border: none;
    outline: none;
    background-color: transparent;
    color: var(--color-secondary);
    font-size: 1rem;
    /* background-color: orange; */
    flex: 1;
    padding: 0.75rem 1rem;
  }

  button {
    background-color: var(--color-secondary);
    border: none;
    border-radius: var(--border-radius);
    /* aspect-ratio: 1; */
    padding: 0.75rem 1.5rem;
    cursor: pointer;
    color: var(--color-background);
    /* font-size: 1rem; */
    /* background-color: orange border-radius 1rem; */
  }
}
</style>
