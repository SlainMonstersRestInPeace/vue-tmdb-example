<template lang="pug">
MovieCard(:movie="movie")
</template>

<script>
import MovieCard from '../components/MovieCard'

export default {
  components: {
    MovieCard
  },
  beforeRouteLeave(to, from, next) {
    this.$store.commit('setPreviousRoute', from);

    next();
  },
  props: {
    id: {
      type: Number,
      default: 0
    }
  },
  computed: {
    tmdbConfig() {
      return this.$store.state.tmdbConfig;
    },
    movie() {
      return this.$store.state.movie || {};
    }
  },
  async created() {
    if (!this.tmdbConfig) {
      await this.$store.dispatch('getConfig');
    }

    this.$store.dispatch('fetchMovie', this.id);
  }
}
</script>

<style lang="scss" scoped>

</style>