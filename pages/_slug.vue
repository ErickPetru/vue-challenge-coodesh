<template>
  <div>
    <header>
      <div class="container">
        <Logo class="mx-auto mt-12 mb-8 w-96" />
      </div>

      <SearchBar v-model="searchOptions" :disabled="$fetchState.pending" />
    </header>

    <article v-if="post && post.title" class="container">
      <nav v-if="post.breadcrumbs" class="flex mt-12 mb-4 text-gray-700">
        <span v-for="(link, index) of post.breadcrumbs.links" :key="link.url">
          <template v-if="!link.id">
            <a
              :href="link.url"
              class="font-bold outline-none hover:text-pink-600 focus:text-pink-600 focus:shadow-outline"
              >{{ link.text }}</a
            >
            <span v-if="index < post.breadcrumbs.links.length - 2" class="px-1"
              >&nbsp;»&nbsp;
            </span>
          </template>
        </span>
      </nav>

      <main>
        <h1 class="text-5xl font-bold leading-none text-blue-500 font-headings">
          {{ post.title }}
        </h1>

        <p v-if="post.published" class="flex my-2 text-sm">
          <img src="~/assets/img/clock.svg" alt="Ícone: Relógio" class="mr-1" />
          <span>{{
            post.published
              | dateParse('YYYY-MM-DD')
              | dateFormat('DD MMMM, YYYY')
          }}</span>
        </p>

        <blockquote v-if="post.headline" class="text-xl">
          {{ post.headline }}
        </blockquote>

        <figure v-if="post.featured_media">
          <img
            :src="post.featured_media.large"
            :srcset="post.featured_media | mediaToSrcset"
          />
        </figure>

        <aside
          v-if="post.related_links && post.related_links.length"
          class="my-4"
        >
          <ul>
            <li v-for="item of post.related_links" :key="item.id">
              <a :href="item.link" class="py-1">
                {{ item.title }}
              </a>
            </li>
          </ul>
        </aside>

        <section
          class="pb-8 border-b-2 border-green-500 content"
          v-html="post.content"
        />

        <section v-if="post.bibliography" class="mt-10 bibliography">
          <h4 class="text-lg font-bold font-headings">Fontes</h4>
          <div class="text-sm" v-html="post.bibliography" />
        </section>

        <section v-if="post.tags && post.tags.length" class="mt-12 tags">
          <span class="p-2 px-3 mt-2 mr-2 bg-gray-400">Tags:</span>
          <a
            v-for="tag of post.tags"
            :key="tag.id"
            class="p-2 px-3 mt-2 mr-2 bg-gray-200"
            :href="tag.link"
            >{{ tag.name }}</a
          >
        </section>

        <section
          v-if="post.author"
          class="flex flex-col p-8 mt-12 text-center bg-gray-100 border border-gray-200 rounded-sm md:flex-row author md:text-left"
        >
          <div class="flex-shrink-0 w-32 mx-auto">
            <img
              :alt="post.author.name"
              :src="post.author.picture"
              class="w-full border border-gray-400 rounded-sm"
            />
          </div>

          <div class="pt-8 md:pt-0 md:pl-6">
            <a
              class="text-xl font-bold leading-none"
              :href="post.author.link"
              >{{ post.author.name }}</a
            >
            <p
              v-if="post.author.description"
              class="mt-4"
              v-html="post.author.description"
            />
          </div>
        </section>
      </main>
    </article>

    <div v-else class="container my-10 text-lg">
      <p v-if="$fetchState.pending">
        Carregando o artigo solicitado. Por favor, aguarde.
      </p>

      <p v-else-if="$fetchState.error" class="text-red-700">
        O artigo não foi localizado. Por favor, confira o endereço solicitado.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Post',
  async fetch() {
    this.post = await this.$http.$get(`v1/posts/${this.$route.params.slug}`)
  },
  data: () => ({
    searchOptions: {
      terms: '',
      relevance: false,
    },
    post: null,
  }),
  head() {
    if (!this.post || !this.post.metas) return

    const meta = []

    if (this.post.author) {
      meta.push({
        hid: 'author',
        name: 'author',
        content: this.post.author.name,
      })
    }

    const metaValues = this.post.metas
    const metaKeys = Object.keys(metaValues)

    const primitiveKeys = metaKeys.filter((k) =>
      ['string', 'number', 'boolean'].includes(typeof metaValues[k])
    )

    meta.push(
      primitiveKeys.map((k) => ({
        hid: k,
        name: k,
        content: metaValues[k],
      }))
    )

    const arrayKeys = metaKeys.filter((k) => Array.isArray(metaValues[k]))

    meta.push(
      arrayKeys
        .map((k) => metaValues[k])
        .flat()
        .map((e, i) => ({
          hid: `article:tag-${i + 1}`,
          name: 'article:tag',
          content: e.content,
        }))
    )

    return {
      title: this.post.title,
      script: this.post.metas.schema
        ? [
            {
              type: 'application/ld+json',
              json: this.post.metas.schema,
            },
          ]
        : null,
      meta: meta.flat(),
    }
  },
}
</script>

<style scoped>
main >>> a {
  @apply text-blue-500;
  @apply border-blue-500;
  @apply border-b;
  @apply border-dotted;
  @apply outline-none;
}

main >>> a:hover,
main >>> a:focus {
  @apply text-blue-700;
}

main >>> a:focus {
  @apply shadow-outline;
}

main >>> ul {
  @apply my-6;
  @apply pl-12;
  @apply text-lg;
  @apply list-disc;
}

main >>> ul li {
  @apply py-1;
}

main >>> blockquote {
  @apply pl-4;
  @apply my-8;
  @apply leading-tight;
  @apply border-l-2;
  @apply border-pink-500;
  @apply text-gray-600;
}

.content >>> p {
  @apply my-4;
  @apply text-lg;
}

.content >>> h2 {
  @apply mt-10;
  @apply mb-6;
  @apply font-headings;
  @apply font-bold;
  @apply text-green-500;
  @apply text-4xl;
  @apply leading-none;
}

.content >>> h3 {
  @apply mt-8;
  @apply font-headings;
  @apply font-bold;
  @apply text-2xl;
}

main >>> figure {
  @apply mt-6;
}

main >>> figure img {
  @apply border-gray-300;
  @apply border;
  @apply rounded-sm;
  @apply block;
  @apply w-full;
  @apply object-cover;
  max-height: 60vh;
  object-position: 50% 35%;
}

.content >>> figure figcaption {
  @apply relative;
  @apply font-bold;
  @apply text-gray-600;
  @apply p-3;
  @apply pl-12;
  @apply mt-2;
  @apply border-b;
  @apply border-dotted;
  @apply border-blue-300;
}

.content >>> figure figcaption::before {
  @apply absolute;
  @apply font-headings;
  @apply text-8xl;
  @apply text-blue-500;
  content: '\201c';
  top: -0.5rem;
  left: 0;
}

.author >>> a {
  @apply text-blue-800;
}

.author a {
  @apply text-gray-800;
  @apply border-none;
}

main >>> .ui-dialog {
  @apply hidden;
}
</style>
