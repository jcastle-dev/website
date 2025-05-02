<template>
  <div class="tag" :style="{ fontSize, padding }">Tag Name</div>
</template>

<script setup lang="ts">
const props = defineProps<{
  compact?: boolean;
}>();
const fontSize = computed<string>(() =>
  props.compact ? "0.75rem" : "0.875rem"
);
const padding = computed<string>(() =>
  props.compact ? "0.25rem" : "0.25rem 0.5rem"
);
</script>

<style scoped>
.tag {
  background-color: var(--color-secondary);
  color: var(--color-background);
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--color-primary);
  }
}
</style>
