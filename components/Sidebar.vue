<template>
  <aside>
    <h3>Browse by Tag</h3>
    <div class="tags">
      <BlogTag
        v-for="tag in tags"
        :key="tag"
        :tag="tag"
        :selected="tag === selectedTag"
        @click="emit('tag-selected', tag)"
      />
    </div>
  </aside>
</template>

<script setup lang="ts">
const props = defineProps<{
  tags: string[];
  selectedTag: string;
}>();
const emit = defineEmits(["tag-selected"]);
</script>

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
    /* justify-content: center; */
    flex-wrap: wrap;
    gap: 0.75rem;
  }
}
</style>
