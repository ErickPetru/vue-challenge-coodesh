<template>
  <nav class="self-stretch p-1 bg-blue-500">
    <div class="container flex">
      <input
        ref="field"
        v-model="internalTerms"
        class="flex-grow p-2 text-white bg-blue-400 rounded-sm outline-none opacity-75 hover:opacity-100 focus:opacity-100 focus:shadow-outline"
        placeholder="O que você procura?"
        :disabled="disabled"
        @keypress.enter="search"
      />
      <button
        class="flex items-center content-center w-10 h-10 p-2 ml-2 bg-blue-600 rounded-full focus:outline-none hover:bg-blue-700 focus:bg-blue-700"
        :disabled="disabled"
        @click="search"
      >
        <img src="~/assets/img/search.svg" alt="Pesquisar" class="h-full" />
      </button>

      <div class="ml-8">
        <label class="inline-flex items-center h-full cursor-pointer">
          <input
            v-model="internalRelevance"
            type="checkbox"
            class="w-5 h-5 text-pink-600 form-checkbox"
          /><span
            class="ml-2 text-white text-opacity-75 transition duration-300 ease-in-out hover:text-opacity-100"
            >Mais Relevantes</span
          >
        </label>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'SearchBar',
  props: {
    value: {
      type: Object,
      default: () => ({
        terms: '',
        relevance: false,
      }),
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    internalTerms: {
      get() {
        return this.value.terms
      },

      set(terms) {
        if (this.value.terms !== terms) {
          this.$emit('input', {
            terms,
            relevance: this.value.relevance,
          })
        }
      },
    },

    internalRelevance: {
      get() {
        return this.value.relevance
      },

      set(relevance) {
        if (this.value.relevance !== relevance) {
          this.$emit('input', {
            terms: this.value.terms,
            relevance,
          })
        }
      },
    },
  },
  methods: {
    search() {
      const terms = this.value.terms.trim().replace(/\s\s+/g, ' ')
      if (!terms) {
        this.$refs.field.focus()
        return
      }

      const searchOptions = {
        terms,
        relevance: this.value.relevance,
      }

      let query = `pesquisa?t=${searchOptions.terms}`
      if (searchOptions.relevance) {
        query += '&o=relevance'
      }
      this.$router.push(query)

      this.$emit('search', searchOptions)
    },
  },
}
</script>
