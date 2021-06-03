<template lang="pug">
header.site-header.d-flex.flex-row.align-items-center.mb-3
  router-link(to="/")
    img.tmdb-logo.mr-5(src="/tmdb-logo-long.svg")
  SearchMovieForm.mr-3
  Navigation
</template>

<script>
import SearchMovieForm from './SearchMovieForm'
import Navigation from './Navigation'

export default {
  name: 'Header',
  components: {
    SearchMovieForm,
    Navigation
  }
}
</script>

<style lang="scss" scoped>
.tmdb-logo {
  width: 154px;
  height: 20px;
}
</style>