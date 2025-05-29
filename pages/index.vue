<template>
  <div class="grid">
    <Sidebar :tags="allTags" v-model="selectedTag" />
    <div class="filler"></div>
    <main>
      <section class="hero">
        <h1 v-gsap.whenVisible.animateText.once.slow>
          jcastle_<span id="d">d</span><span id="e">e</span
          ><span id="v">v</span>
        </h1>
        <p>
          Programming tutorials for intermediate
          <span class="text-highlight"> web developers </span>
          and aspiring <span class="text-highlight">DevOps engineers</span>
        </p>
        <!-- <BlogSearch @click="showSearchDialog = true" /> -->
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

    <!-- <SearchDialog
      v-model="showSearchDialog"
      @close="showSearchDialog = false"
    /> -->
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: "jcastle_dev",
  description:
    "Programming tutorials for intermediate web developers and aspiring DevOps engineers",
});

const showSearchDialog = ref<boolean>(false);
const selectedTag = ref<string>("");

const { data: tags } = await useAsyncData("tags", () => {
  return queryCollection("content").select("tags").all();
});
// console.log(tags.value);
const allTags = computed(() => {
  let tagsString = "";
  tags.value!.forEach((tag) => {
    tagsString += tag.tags + " ";
  });
  const tagsArray = tagsString.split(" ");
  const uniqueTags = [...new Set(tagsArray)];
  return uniqueTags.filter((tag) => tag !== "");
});

const { data: blogPosts, refresh } = await useAsyncData(
  computed(() => `blogs-${selectedTag.value}`),
  () => {
    return queryCollection("content")
      .where("tags", "LIKE", `%${selectedTag.value}%`)
      .all();
  }
);
// console.log(blogPosts.value);
</script>

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
  grid-template-columns: 1fr;
  /* max-width: 90vw; */
  /* gap: 3rem; */
  margin: 0 auto;
  padding-top: 2rem;

  @media screen and (min-width: 1024px) {
    grid-template-columns: 300px 1fr;
  }
}

.filler {
  display: none;

  @media screen and (min-width: 1024px) {
    display: block;
  }
}

.hero {
  max-width: 512px;
  margin: 0 auto;
  margin-bottom: 3rem;
  padding: 0 1rem;
  text-align: center;

  h1 {
    font-weight: 300;
    font-size: 3rem;

    @media screen and (min-width: 1024px) {
      font-size: 4rem;
    }
  }

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
  font-size: 1.5rem;
  margin: 1.5rem 0 3rem 0;

  @media screen and (min-width: 1024px) {
    font-size: 2rem;
  }

  .text-highlight {
    background: linear-gradient(to right, var(--color-primary), #fff);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
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
