<template>
  <aside>
    <h3>Browse by Tag</h3>
    <div class="tags">
      <BlogTag
        v-for="tag in props.tags"
        :key="tag"
        :tag="tag"
        :selected="tag === model"
        @click="handleTagClick(tag)"
      />
    </div>
  </aside>
</template>

<script setup lang="ts">
const props = defineProps<{
  tags: string[];
}>();
const model = defineModel();
const handleTagClick = (tag: string) => {
  model.value = tag === model.value ? "" : tag;
};
</script>

<style scoped>
aside {
  width: 300px;
  height: calc(100vh - 4rem);
  padding: 2rem;
  position: fixed;
  display: none;

  @media screen and (min-width: 1024px) {
    display: block;
  }

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
