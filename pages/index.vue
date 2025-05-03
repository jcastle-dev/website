<script setup lang="ts">
import { watchDebounced } from "@vueuse/core";

const searchTerm = ref<string>("");

const { data: blogPosts, refresh } = await useAsyncData("index", () => {
  return queryCollection("content")
    .where("title", "LIKE", `%${searchTerm.value}%`)
    .orWhere((query) =>
      query
        .where("description", "LIKE", `%${searchTerm.value}%`)
        .where("tags", "LIKE", `%${searchTerm.value}%`)
    )
    .all();
});
console.log(blogPosts.value);

watchDebounced(
  searchTerm,
  async () => {
    await refresh();
    console.log(blogPosts.value);
  },
  { debounce: 500 }
);

useSeoMeta({
  title: "jcastle_dev",
  description:
    "Programming tutorials for intermediate web developers and aspiring DevOps engineers",
});
</script>

<template>
  <div class="grid">
    <Sidebar />
    <div></div>
    <main>
      <section class="hero">
        <h1>
          jcastle_<span id="d">d</span><span id="e">e</span
          ><span id="v">v</span>
        </h1>
        <p>
          Programming tutorials for intermediate
          <span class="text-highlight"> web developers </span>
          and aspiring <span class="text-highlight">DevOps engineers</span>
        </p>
        <BlogSearch v-model="searchTerm" />
      </section>
      <section class="blogs">
        <TransitionGroup name="blogs">
          <BlogCard
            v-for="post in blogPosts"
            :key="post.id"
            :blog-post="post"
          />
        </TransitionGroup>
      </section>
    </main>
  </div>
</template>

<style scoped>
.blogs-move,
.blogs-enter-active,
.blogs-leave-active {
  transition: all 0.5s ease;
}
.blogs-enter-from,
.blogs-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.blogs-leave-active {
  position: absolute;
}

.grid {
  display: grid;
  /* place-content: center; */
  grid-template-columns: 300px 1fr;
  /* max-width: 90vw; */
  /* gap: 3rem; */
  margin: 0 auto;
  padding-top: 2rem;
}

.hero {
  max-width: 512px;
  margin: 0 auto;
  margin-bottom: 3rem;

  h1 {
    font-family: "JetBrains Mono", monospace;
    font-size: 4rem;
    font-weight: 300;

    #d {
      color: var(--color-primary);
    }

    #e {
      color: var(--color-primary);
    }

    #v {
      color: var(--color-primary);
    }
  }

  p {
    font-size: 2rem;
    margin: 1.5rem 0 3rem 0;

    .text-highlight {
      background: linear-gradient(to right, var(--color-primary), #fff);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
}
.blogs {
  display: flex;
  justify-content: center;
  align-items: stretch;
  flex-wrap: wrap;
  gap: 2rem;
  padding-bottom: 2rem;
}
</style>
