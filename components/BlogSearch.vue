<template>
  <div class="container">
    <input type="text" placeholder="Search tutorials" />
    <button><Icon name="ph:magnifying-glass-bold" size="1.25rem" /></button>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* padding: 1rem; */
  background-color: #222;
  border-radius: 50px;
  overflow: hidden;
  /* padding: 0.5rem; */
  /* gap: 0.5rem; */

  input {
    border: none;
    outline: none;
    background-color: transparent;
    color: #f0f2f4;
    font-size: 1rem;
    /* background-color: orange; */
    flex: 1;
    padding: 0.75rem 1rem;
  }

  button {
    background-color: #f0f2f4;
    border: none;
    border-radius: 50px;
    /* aspect-ratio: 1; */
    padding: 0.75rem 1.5rem;
    cursor: pointer;
    color: #111;
    /* font-size: 1rem; */
    /* background-color: orange border-radius 1rem; */
  }
}
</style>
