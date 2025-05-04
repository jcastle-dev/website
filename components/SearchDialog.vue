<template>
  <Transition>
    <div v-if="showDialog" class="overlay">
      <div class="dialog">
        <input type="text" placeholder="Type to search..." ref="search" />
      </div>
      <div class="overlay-bg" @click="emit('close')"></div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const showDialog = defineModel();
const emit = defineEmits(["close"]);

const search = useTemplateRef<HTMLInputElement>("search");
watch(
  search,
  (val) => {
    if (val) {
      search.value?.focus();
    }
  },
  { immediate: true }
);
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.35s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.overlay {
  position: fixed;
  inset: 0;
  display: grid;
  place-content: center;
  z-index: 1;

  .dialog {
    width: 500px;
    height: 300px;
    background-color: var(--color-surface);
    border-radius: var(--border-radius);
    padding: 1rem;
    z-index: 1;

    input {
      outline: none;
      border: none;
      /* border: 2px solid #aaa; */
      /* background-color: transparent; */
      background-color: var(--color-background);
      color: var(--color-secondary);
      border-radius: var(--border-radius);
      font-size: 1rem;
      /* background-color: orange; */
      /* flex: 1; */
      width: 100%;
      padding: 0.75rem 1rem;
    }
  }

  .overlay-bg {
    position: absolute;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }
}
</style>
