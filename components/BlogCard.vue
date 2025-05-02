<template>
  <div class="card">
    <img src="/images/placeholder.png" />
    <div class="details">
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore iure
        ut fugit? Expedita minus cumque itaque accusantium eos ullam, quisquam
        deserunt quaerat ratione, commodi tempore debitis fugit quos, sunt
        omnis.
      </p>
      <nuxt-link to="/">Read More</nuxt-link>
      <div class="tags">
        <BlogTag v-for="i in 4" :key="i" compact />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

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
