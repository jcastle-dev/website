<template>
  <aside>
    <h3>Browse by Tag</h3>
    <!-- <hr /> -->
    <div class="tags">
      <BlogTag v-for="i in 16" :key="i" />
    </div>
  </aside>
</template>

<script setup lang="ts"></script>

<style scoped>
aside {
  width: 100%;
  height: calc(100vh - 4rem);
  background-color: #222;
  border-radius: 50px;
  padding: 1rem;

  h3 {
    text-align: center;
    margin-bottom: 1rem;
  }

  hr {
    border: none;
    height: 1px;
    background-color: #f0f2f4;
    margin: 1rem 0 1.5rem 0;
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }
}
</style>
