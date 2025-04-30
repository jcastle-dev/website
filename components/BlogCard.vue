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
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.card {
  max-width: 350px;
  overflow: hidden;
  border-radius: 50px;

  img {
    max-width: 100%;
  }

  .details {
    background-color: #222;
    padding: 1.5rem 2rem;
  }
}
</style>
