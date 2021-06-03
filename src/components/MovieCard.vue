<template lang="pug">
.card.overflow-hidden.text-white.border-0(:style="backdropStyle")
  .row(:style="backgroundStyle")
    .col-4
      div(v-if="posterUrl != null")
        img.movie-poster.d-block.w-100(:src="posterUrl" @error="handleImageNotFound")
    .col-8.py-3
      h2.movie-title {{title}}
      h5.movie-tagline {{movie.tagline}}
      p.movie-overview.mb-5 {{movie.overview}}
      h5.movie-genres {{genres}}
      h6.movie-companies.mb-4 {{companies}}
      .row
        .col-6
          h6.m-0 Original Release:
          p.movie-release {{release}}
        .col-6
          h6.m-0 Box Office:
          p.movie-revenue {{revenue}}
      .row
        .col-6
          h6.m-0 Running Time:
          p.movie-runtime {{runtime}}
        .col-6
          h6.m-0 Vote Average:
          p.movie-rating {{rating}}
button.btn.btn-success.col-12.mt-3.back(@click="handleClick") Go back
</template>

<script>
import { getPosterUrl } from '../util/index'
import { getBackdropUrl } from '../util/index'

export default {
  name: 'MovieCard',
  props: {
    movie: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    previousRoute() {
      return this.$store.state.previousRoute || { name: 'PopularMovies', params: { page: 1 } };
    },
    backdropStyle() {
      if (this.backdropUrl) {
        return {
          "background-image": `url(${this.backdropUrl})`,
          "background-size": 'cover'
        }
      }

      return {
        "background-color": "black"
      }
    },
    backgroundStyle() {
      if (this.backdropUrl) {
        return {
          "background-color": "rgba(0, 0, 0, 0.8)"
        }
      }

      return {
        "background-color": "black"
      }
    },
    posterUrl() {
      return getPosterUrl(this.config, this.movie.poster, ['w342', 'original']) || '/not-found.png';
    },
    backdropUrl() {
      return getBackdropUrl(this.config, this.movie.backdrop, 'original');
    },
    config() {
      return this.$store.state.tmdbConfig;
    },
    title() {
      return this.movie.title ? this.movie.title.toUpperCase(): '';
    },
    release() {
      return this.movie.release_date || 'N/A';
    },
    rating() {
      return this.movie.rating ? `${this.movie.rating} / 10` : 'N/A';
    },
    runtime() {
      return this.movie.runtime ? `${this.movie.runtime} min` : 'N/A';
    },
    revenue() {
      return this.movie.revenue ? `US $${this.movie.revenue}` : 'N/A';
    },
    genres() {
      if (!this.movie.genres) {
        return '';
      };

      return this.movie.genres.map(genre => genre.name).join(', ')
    },
    companies() {
      if (!this.movie.production_companies) {
        return '';
      };

      return this.movie.production_companies.map(company => company.name).join(', ')
    }
  },
  methods: {
    goBack() {
      this.$router.push(this.previousRoute);
    },
    handleClick() {
      this.goBack();
    },
    handleImageNotFound(e) {
      if (e.target.src !== "/not-found.png") {
        e.target.src = "/not-found.png";
      } else {
        e.target.src = "";
      }
    }
  },
}
</script>

<style lang="scss" scoped>
$acid-green: #00FC77;

.card {
  font-family: "Oswald";
  font-weight: 300;
}

.movie-title {
  font-family: "Open Sans", sans-serif;
  font-weight: bold;
}

.movie-tagline {
  font-weight: 300;
}

.movie-overview {
  font-family: "Lato", sans-serif;
  font-weight: 300;
}

.movie-genres {
  font-weight: 300;
}

.movie-companies {
  font-weight: 300;
}

.movie-release, .movie-revenue, .movie-runtime, .movie-rating {
  font-size: 1.5em;
}

.movie-tagline, .movie-genres, .movie-release, .movie-runtime, .movie-revenue, .movie-rating {
  color: $acid-green;
}

.back {
  font-family: 'Oswald', sans-serif;
  font-weight: 700;
}

</style>