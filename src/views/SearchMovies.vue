<template lang="pug">
MovieResults(:movies="movies" @load-more="handleLoadMore")
</template>

<script>
import MovieResults from '../components/MovieResults'
import cancelToken from '../cancelToken'

export default {
  name: 'SearchMovies',
  components: {
    MovieResults
  },
  beforeRouteLeave(to, from, next) {
    this.$store.commit('setPreviousRoute', from);

    next();
  },
  props: {
    query: {
      type: String,
      default: ''
    },
    page: {
      type: Number,
      default: 0
    },
  },
  data() {
    return {
      lastLoadedPage: 0,
      source: cancelToken.source()
    }
  },
  computed: {
    movies() {
      return this.$store.state.suggestions.suggestions
    }
  },
  watch: {
    query() {
      this.searchMovies();
    },
  },
  created() {
    this.clearSuggestions();
    this.searchMovies();
  },
  unmounted() {
    this.source.cancel();
  },
  methods: {
    clearSuggestions() {
      this.$store.commit('clearSuggestions');
    },
    searchMovies() {
      const cancelToken = this.source.token;
      const options = { cancelToken };

      this.$store.dispatch('searchMovies', { query: { query: this.query, page: ++this.lastLoadedPage }, options });
    },
    handleLoadMore() {
      this.searchMovies();
    }
  }
}
</script>

<style lang="scss" scoped>

</style>