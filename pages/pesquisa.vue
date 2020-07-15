<template>
  <div>
    <header>
      <div class="container">
        <Logo class="mx-auto mt-12 mb-8 w-96" />
      </div>

      <SearchBar v-model="searchOptions" :disabled="$fetchState.pending" />
    </header>

    <div class="container my-10 text-lg">
      <p v-if="$fetchState.pending">
        <template v-if="$route.query.p">
          Carregando artigos da página <b>{{ page }}</b
          >. Por favor, aguarde.
        </template>
        <template v-else>
          Pesquisando artigos relacionados a
          <b class="text-blue-500">{{ usedTerms }}</b
          >. Por favor, aguarde.
        </template>
      </p>

      <p v-else-if="$fetchState.error" class="text-red-700">
        Infelizmente, não foi possível concluir esta pesquisa com sucesso.
      </p>

      <p v-else-if="total === 0">
        Não existem artigos relacionados ao termo pesquisado!
      </p>

      <p v-else>
        <span v-if="total === 1">1 resultado encontrado</span>
        <span v-else>{{ total }} resultados encontrados</span>
        para
        <b class="text-blue-500">{{ usedTerms }}</b
        >.
      </p>
    </div>

    <PostList v-if="!$fetchState.pending" :posts="posts" class="my-10" />

    <Pagination
      v-if="!$fetchState.pending && total"
      :items-count="total"
      :pages-count="posts.pages"
      :current-page="$route.query.p ? parseInt($route.query.p) || 1 : 1"
      class="mt-12"
      @change="pageChanged"
    />
  </div>
</template>

<script>
export default {
  name: 'Home',
  async fetch() {
    let query = `posts?search=${this.$route.query.t}`

    if (this.$route.query.p) {
      query += `&page=${this.$route.query.p}`
    }

    if (this.$route.query.o === 'relevance') {
      query += `&orderby=relevance`
    }

    this.posts = await this.$http.$get(`v2/${query}`)
  },
  data: () => ({
    searchOptions: {
      terms: '',
      relevance: false,
    },
    page: null,
    posts: null,
  }),
  computed: {
    usedTerms() {
      return this.$route.query.t || ''
    },
    total() {
      return (this.posts && this.posts.size) || 0
    },
  },
  watch: {
    '$route.query'() {
      this.updateData()
      this.$fetch()
    },
  },
  mounted() {
    this.updateData()
  },
  methods: {
    updateData() {
      this.searchOptions.terms = this.$route.query.t

      if (this.$route.query.p) {
        const page = parseInt(this.$route.query.p, 10)
        this.page = isNaN(page) ? 1 : page
      }

      this.searchOptions.relevance = this.$route.query.o === 'relevance'
    },

    pageChanged(page) {
      let destination = `pesquisa?t=${this.usedTerms}&p=${page}`

      if (this.searchOptions.relevance) {
        destination += '&o=relevance'
      }

      this.$router.push(destination)
    },
  },
  head() {
    if (!this.$fetchState.pending) {
      if (this.total === 1) {
        return {
          title: `1 resultado encontrado para ${this.usedTerms}`,
        }
      } else {
        return {
          title: `${this.total} resultados encontrados para ${this.usedTerms}`,
        }
      }
    }
  },
}
</script>
