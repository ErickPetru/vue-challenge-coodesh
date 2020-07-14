<template>
  <img src="~/assets/img/logo.svg" :alt="alt" />
</template>

<script>
export default {
  name: 'Logo',
  props: {
    alt: {
      type: String,
      default: 'Melhor com Saúde',
    },
  },
}
</script>
