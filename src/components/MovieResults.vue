<template lang="pug">
.movie-results
  .d-flex.flex-wrap.justify-content-start.items-container
    .item.d-flex.flex-column.mb-4(v-for="movie in movies" :key="uuid()")
      MovieItem.flex-grow-1(:movie="movie")
  button.btn.btn-success.load-more.col-12.mb-3(@click="$emit('load-more')") Load More
</template>

<script>
import uuid from '../mixins/uuid'
import MovieItem from './MovieItem'

export default {
  name: "MovieResults",
  components: {
    MovieItem
  },
  mixins: [uuid],
  props: {
    movies: {
      type: Array,
      default: () => []
    }
  },
  emits: ['load-more'],
}
</script>

<style lang="scss" scoped>
.load-more {
  font-family: 'Oswald', sans-serif;
  font-weight: 700;

  font-size: 1.15em;
}
</style>