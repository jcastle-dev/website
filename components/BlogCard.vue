<template>
  <div class="card" :style="{ backgroundColor }">
    <img :src="props.blogPost.image" />
    <div class="details">
      <div>
        <p>
          {{ props.blogPost.description }}
        </p>
        <nuxt-link :to="props.blogPost.path">Read More</nuxt-link>
      </div>
      <div class="tags">
        <BlogTag
          v-for="tag in props.blogPost.tags.split(' ')"
          :key="tag"
          :tag="tag"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  blogPost: any;
}>();
// console.log(props.blogPost);

const backgroundColor = computed<string>(() => {
  return `#${props.blogPost.color}`;
});
</script>

<style scoped>
.card {
  max-width: 350px;
  overflow: hidden;
  border-radius: var(--border-radius);
  display: flex;
  flex-direction: column;

  img {
    max-width: 100%;
  }

  .details {
    background-color: var(--color-surface);
    /* padding: 1.5rem 2rem; */
    padding: 1rem;
    padding-top: 0;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /* gap: 1rem; */
    margin: 1rem;
    margin-top: 0;
    border-radius: var(--border-radius);

    p {
      line-height: 1.35;
      margin-bottom: 0.25rem;
    }

    a {
      display: inline-block;
      margin-bottom: 1.5rem;
      color: var(--color-primary);
      text-decoration: none;
      /* text-underline-offset: 2px; */
    }

    .tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
  }
}
</style>
