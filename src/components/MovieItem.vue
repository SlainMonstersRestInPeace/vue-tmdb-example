<template lang="pug">
.card.border-0
  div(v-if="posterUrl != null")
    img.movie-poster.card-img-top(:src="posterUrl" @error="handleImageNotFound")
  .card-body.position-relative.pt-4
    RatingMeter(:rating="movie.rating")
    h5.card-title.movie-title {{movie.title}}
    h6.card-subtitle.text-muted.movie-release {{release}}
  router-link.stretched-link(:to="`/movie/${movie.id}`")
</template>

<script>
import { getPosterUrl } from '../util/index'

import RatingMeter from './RatingMeter'

export default {
  name: 'MovieItem',
  components: {
    RatingMeter
  },
  props: {
    movie: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    posterUrl() {
      return getPosterUrl(this.config, this.movie.poster, ['w342', 'original']) || '/not-found.png';
    },
    config() {
      return this.$store.state.tmdbConfig;
    },
    release() {
      return this.movie.release_date || 'N/A';
    },
    rating() {
      return this.movie.rating ? `${this.movie.rating} / 10` : 'N/A';
    },
  },
  methods: {
    handleImageNotFound(e) {
      if (e.target.src !== "/not-found.png") {
        e.target.src = "/not-found.png";
      } else {
        e.target.src = "";
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  border-radius: 4px;
}

.movie-poster {
  height: 200px;
}
</style>