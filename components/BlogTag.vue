<template>
  <div class="tag">Tag Name</div>
</template>

<script setup lang="ts"></script>

<style scoped>
.tag {
  background-color: #bbeabb;
  color: #111;
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 50px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #00ff00;
  }
}
</style>
