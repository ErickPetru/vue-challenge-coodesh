<template>
  <article class="flex py-8 mb-4 border-b-2 border-green-500">
    <nuxt-link
      :to="`/${post.slug}`"
      class="flex-shrink-0 w-1/2 outline-none post-image sm:w-5/12 md:w-1/3 lg:w-1/4 focus:shadow-outline"
    >
      <div v-if="post.featured_media" class="relative overflow-hidden">
        <img
          class="object-cover min-w-full min-h-full transition duration-300 ease-in-out transform scale-125 hover:scale-100"
          :src="post.featured_media.medium"
          :srcset="post.featured_media | mediaToSrcset"
        />
      </div>
    </nuxt-link>

    <div class="flex flex-col px-8 text-lg md:text-normal">
      <p
        v-if="post.categories && post.categories.length"
        class="text-sm text-pink-500"
      >
        <a
          v-for="category of post.categories"
          :key="category.id"
          :href="category.link"
          class="mb-4 mr-2 outline-none hover:text-pink-600 focus:text-pink-600 focus:shadow-outline"
          >{{ category.name }}</a
        >
      </p>

      <strong
        class="mt-1 mb-2 text-lg font-bold leading-tight tracking-wide sm:text-xl md:text-4xl font-headings"
      >
        <nuxt-link
          :to="`/${post.slug}`"
          class="outline-none hover:text-green-700 focus:text-green-700 focus:shadow-outline"
        >
          {{ post.title }}
        </nuxt-link>
      </strong>

      <p
        class="hidden text-sm text-gray-600 sm:block md:text-normal"
        v-html="post.excerpt"
      />
    </div>
  </article>
</template>

<script>
export default {
  name: 'PostListItem',
  props: {
    post: {
      type: Object,
      default: null,
    },
  },
}
</script>

<style scoped>
.post-image:focus img {
  @apply scale-100;
}
</style>
