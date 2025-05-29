<template>
  <div class="tag" :style="{ backgroundColor }">{{ props.tag }}</div>
</template>

<script setup lang="ts">
const props = defineProps<{
  tag: string;
  selected?: boolean;
}>();
const backgroundColor = computed<string>(() => {
  return props.selected ? "var(--color-primary)" : "var(--color-secondary)";
});
</script>

<style scoped>
.tag {
  /* background-color: var(--color-secondary); */
  color: var(--color-background);
  padding: 0.25rem 0.4rem;
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
