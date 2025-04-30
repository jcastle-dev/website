<script setup lang="ts">
// const { data: home } = await useAsyncData(() =>
//   queryCollection("content").path("/").first()
// );

// useSeoMeta({
//   title: home.value?.title,
//   description: home.value?.description,
// });
</script>

<template>
  <div class="grid">
    <Sidebar />
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
        <BlogSearch />
      </section>
      <section class="blogs">
        <BlogCard />
      </section>
    </main>
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: 300px minmax(350px, 512px);
  max-width: clamp(350px, 90vw, 1200px);
  gap: 3rem;
  margin: 0 auto;
  padding-top: 2rem;
}

.hero {
  h1 {
    font-family: "JetBrains Mono", monospace;
    font-size: 4rem;
    font-weight: 300;

    #d {
      color: #00ff00;
    }

    #e {
      color: #00ff00;
    }

    #v {
      color: #00ff00;
    }
  }

  p {
    font-size: 2rem;
    margin: 1.5rem 0 3rem 0;

    .text-highlight {
      background: linear-gradient(to right, #00ff00, #fff);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
}
</style>
