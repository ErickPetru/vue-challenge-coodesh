<template>
  <div
    id="app"
    class="antialiased leading-normal tracking-tight text-gray-700 font-base"
  >
    <div class="flex flex-col justify-between min-h-full">
      <Nuxt />

      <footer class="flex-grow-0 mt-24 text-white bg-blue-600">
        <div class="py-6 bg-blue-500" />
        <div class="container my-12 text-center">
          <p>© 2020 <strong>Erick Eduardo Petrucelli</strong></p>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LayoutDefault',
}
</script>
