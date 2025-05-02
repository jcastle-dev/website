<template>
  <ContentRenderer v-if="page" :value="page" />
  <p v-else>Article not found</p>
</template>

<script setup lang="ts">
const route = useRoute();
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection("content").path(route.path).first();
});
</script>

<style scoped></style>
