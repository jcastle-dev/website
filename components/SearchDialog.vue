<template>
  <Transition>
    <div v-if="showDialog" class="overlay">
      <div class="dialog">
        <input
          type="text"
          placeholder="Type to search..."
          ref="searchInput"
          v-model="searchTerm"
        />
        <ul>
          <li v-for="link of result" :key="link.item.id" class="mt-2">
            <nuxt-link :to="link.item.id">
              <b>{{ link.item.title }}</b>
              <p>
                {{
                  link.item.content?.slice(
                    link.item.content?.indexOf(searchTerm) - 10,
                    link.item.content?.indexOf(searchTerm) + 10
                  )
                }}...
                <!-- {{ link.item.content?.slice(0, 10) }}... -->
              </p>
            </nuxt-link>
          </li>
        </ul>
      </div>
      <div class="overlay-bg" @click="emit('close')"></div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import Fuse from "fuse.js";

const showDialog = defineModel();
const emit = defineEmits(["close"]);

const { data: searchSections } = await useAsyncData(
  "search-sections",
  async () => {
    let sections = await queryCollectionSearchSections("content", {
      ignoredTags: ["description"],
    });
    return sections.filter((_, index) => index % 2 !== 0);
  }
);
console.log(searchSections.value);
const searchTerm = ref<string>("");

const fuse = new Fuse(searchSections.value || [], {
  keys: ["title", "content"],
});

const result = computed(() => fuse.search(toValue(searchTerm)).slice(0, 10));
watch(result, (val) => {
  console.log(val);
});

const searchInput = useTemplateRef<HTMLInputElement>("searchInput");
watch(
  searchInput,
  (val) => {
    if (val) {
      searchInput.value?.focus();
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

    a {
      color: inherit;
      text-decoration: none;
    }
  }

  .overlay-bg {
    position: absolute;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }
}
</style>
