<template lang="pug">
MovieResults(:movies="movies" @load-more="handleLoadMore")
</template>

<script>
import MovieResults from '../components/MovieResults'
import cancelToken from '../cancelToken'

export default {
  name: "PopularMovies",
  components: {
    MovieResults
  },
  beforeRouteLeave(to, from, next) {
    this.$store.commit('setPreviousRoute', from);

    next();
  },
  data() {
    return {
      lastLoadedPage: 0,
      source: cancelToken.source()
    }
  },
  computed: {
    movies() {
      return this.$store.state.suggestions.suggestions;
    },
    previousRoute() {
      return this.$store.state.previousRoute;
    }
  },
  created() {
    this.clearSuggestions();
    this.fetchMovies();
  },
  unmounted() {
    this.source.cancel();
  },
  methods: {
    clearSuggestions() {
      this.$store.commit('clearSuggestions');
    },
    fetchMovies() {
      const cancelToken = this.source.token;
      const options = { cancelToken };

      this.$store.dispatch('fetchPopularMovies', { query: { page: ++this.lastLoadedPage }, options });
    },
    handleLoadMore() {
      this.fetchMovies();
    }
  }
}
</script>