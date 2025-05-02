<template>
  <div class="tag">{{ props.tag }}</div>
</template>

<script setup lang="ts">
const props = defineProps<{
  tag: string;
}>();
</script>

<style scoped>
.tag {
  background-color: var(--color-secondary);
  color: var(--color-background);
  padding: 0.25rem;
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--color-primary);
  }
}
</style>
