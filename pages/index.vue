<template>
  <div>
    <div class="container">
      <Logo class="mx-auto mb-8 w-96" />
    </div>

    <SearchBar v-model="searchOptions" />
  </div>
</template>

<script>
export default {
  name: 'Home',
  layout: 'center',
  data: () => ({
    searchOptions: {
      terms: '',
      relevance: false,
    },
  }),
}
</script>
