<template>
  <div class="container">
    <Logo class="logo" />
  </div>
</template>

<script>
export default {
  name: 'Home',
}
</script>

<style scoped>
.container {
  @apply h-full;
  @apply flex;
  @apply flex-col;
  @apply content-center;
  @apply items-center;
  @apply text-center;
}

.logo {
  @apply w-96;
  @apply flex-auto;
  min-width: 180px;
}
</style>
