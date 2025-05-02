<template>
  <div class="card">
    <img :src="props.blogPost.image" />
    <div class="details">
      <p>
        {{ props.blogPost.description }}
      </p>
      <nuxt-link :to="props.blogPost.path">Read More</nuxt-link>
      <div class="tags">
        <BlogTag v-for="tag in props.blogPost.tags" :key="tag" :tag="tag" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  blogPost: any;
}>();
</script>

<style scoped>
.card {
  max-width: 350px;
  overflow: hidden;
  border-radius: var(--border-radius);

  img {
    max-width: 100%;
  }

  .details {
    background-color: var(--color-surface);
    padding: 1.5rem 2rem;

    p {
      line-height: 1.35;
    }

    a {
      display: block;
      margin: 0.5rem 0 1.5rem 0;
      color: var(--color-primary);
    }

    .tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
  }
}
</style>
