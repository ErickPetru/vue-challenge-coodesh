<template>
  <nav class="flex justify-center">
    <ul class="inline-flex pagination">
      <li>Página {{ currentPage }} de {{ pagesCount }}:</li>

      <li>
        <a
          v-if="previousPage"
          :href="`#p=${previousPage}`"
          @click.prevent="change(previousPage)"
          >&laquo;</a
        >
      </li>

      <li v-for="page of firstGroup" :key="page">
        <a
          :href="`#p=${page}`"
          :disabled="page === currentPage"
          :class="{ 'link-exact-active': page === currentPage }"
          @click.prevent="change(page)"
          >{{ page }}</a
        >
      </li>

      <template v-if="secondGroup">
        <span v-if="currentPage > 4" class="py-2 ml-3 mr-1">...</span>

        <li v-for="page of secondGroup" :key="page">
          <a
            :href="`#p=${page}`"
            :disabled="page === currentPage"
            :class="{ 'link-exact-active': page === currentPage }"
            @click.prevent="change(page)"
            >{{ page }}</a
          >
        </li>
      </template>

      <template v-if="thirdGroup">
        <span v-if="currentPage !== pagesCount - 3" class="py-2 ml-3 mr-1"
          >...</span
        >

        <li v-for="page of thirdGroup" :key="page">
          <a
            :href="`#p=${page}`"
            :disabled="page === currentPage"
            :class="{ 'link-exact-active': page === currentPage }"
            @click.prevent="change(page)"
            >{{ page }}</a
          >
        </li>
      </template>

      <li>
        <a
          v-if="nextPage"
          :href="`#p=${nextPage}`"
          @click.prevent="change(nextPage)"
          >&raquo;</a
        >
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    itemsCount: {
      type: Number,
      default: 0,
    },

    pagesCount: {
      type: Number,
      default: 0,
    },

    itemsPerPage: {
      type: Number,
      default: 10,
    },

    currentPage: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    previousPage() {
      if (this.currentPage > 1) {
        return this.currentPage - 1
      } else {
        return null
      }
    },

    nextPage() {
      if (this.currentPage < this.pagesCount) {
        return this.currentPage + 1
      } else {
        return null
      }
    },

    firstGroup() {
      if (this.currentPage < 4) {
        if (this.pagesCount > 5) {
          return Array.from(Array(5), (_, i) => i + 1)
        } else {
          return Array.from(Array(this.pagesCount), (_, i) => i + 1)
        }
      } else {
        return [1]
      }
    },

    secondGroup() {
      if (this.currentPage < 4) {
        return null
      } else if (this.pagesCount < 6) {
        return Array.from(Array(this.pagesCount), (_, i) => i + 1)
      } else {
        const start = this.currentPage - 3
        if (this.pagesCount - start < 6) {
          return null
        } else {
          return Array.from(Array(5), (_, i) => start + i + 1)
        }
      }
    },

    thirdGroup() {
      if (this.pagesCount < 6) {
        return null
      } else if (this.currentPage < this.pagesCount - 3) {
        return [this.pagesCount]
      } else {
        let start = this.currentPage - 3
        if (this.pagesCount - start < 6) {
          start = this.pagesCount - 5
          return Array.from(Array(5), (_, i) => start + i + 1)
        } else {
          return [this.pagesCount]
        }
      }
    },
  },
  methods: {
    change(page) {
      this.$emit('change', page)
    },
  },
}
</script>

<style scoped>
li {
  @apply ml-2;
  @apply bg-gray-200;
}

li:first-child {
  @apply text-gray-600;
  @apply ml-0;
  @apply py-2;
  @apply px-3;
}

li a {
  @apply block;
  @apply py-2;
  @apply px-3;
  @apply bg-gray-200;
  @apply text-gray-700;
  @apply font-bold;
  @apply outline-none;
}

li a:hover,
li a:focus {
  @apply bg-blue-200;
}

li a:focus {
  @apply shadow-outline;
}

li a.link-exact-active {
  @apply bg-blue-600;
  @apply text-white;
}

li a.link-exact-active:hover,
li a.link-exact-active:focus {
  @apply cursor-default;
  @apply shadow-none;
}
</style>
