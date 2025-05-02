<template>
  <aside>
    <h3>Browse by Tag</h3>
    <!-- <hr /> -->
    <div class="tags">
      <BlogTag v-for="i in 16" :key="i" tag="example" />
    </div>
  </aside>
</template>

<script setup lang="ts"></script>

<style scoped>
aside {
  width: 300px;
  height: calc(100vh - 4rem);
  padding: 2rem;
  position: fixed;

  h3 {
    text-align: center;
    margin-bottom: 1rem;
  }

  hr {
    border: none;
    height: 1px;
    background-color: var(--color-secondary);
    margin: 1rem 0 1.5rem 0;
  }

  .tags {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0.75rem;
  }
}
</style>
