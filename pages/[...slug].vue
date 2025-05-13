<template>
  <div class="container">
    <ContentRenderer v-if="page" :value="page" />
    <p v-else>Article not found</p>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection("content").path(route.path).first();
});
</script>

<style>
.container {
  max-width: 65ch;
  margin: 0 auto;
  padding-top: 2rem;

  a {
    color: inherit;
    text-decoration: none;
  }
}
</style>
