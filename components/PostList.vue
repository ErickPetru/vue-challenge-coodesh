<template>
  <section v-if="posts && posts.size" class="container posts-list">
    <p class="py-2 text-xl text-gray-600 uppercase border-t-2 border-blue-500">
      Todos os resultados
    </p>

    <div class="articles">
      <PostListItem v-for="post of posts.data" :key="post.id" :post="post" />
    </div>
  </section>
</template>

<script>
export default {
  name: 'PostList',
  props: {
    posts: {
      type: Object,
      default: null,
    },
  },
}
</script>

<style scoped>
.articles > :last-child {
  margin-bottom: 0;
}
</style>
