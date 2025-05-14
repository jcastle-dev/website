<template>
  <iframe
    :src="props.src"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen
  ></iframe>
</template>

<script setup lang="ts">
const props = defineProps<{
  src: string;
}>();
</script>

<style scoped>
iframe {
  margin-top: 1rem;
  width: 100%;
  aspect-ratio: 16 / 9;
}
</style>
