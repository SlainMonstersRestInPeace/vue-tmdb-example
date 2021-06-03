<template lang="pug">
form#search.d-flex.flex-row.align-items-center
  input.typeahead(v-model="title" type="text" placeholder="Search Movie Titles..." ref="inputRef" required aria-label="Search Title")
  .mr-3
  button.btn.text-white.button-search.px-4(type="submit") Search
</template>

<script>
import $ from 'jquery'
import Bloodhound from 'corejs-typeahead'

const TMDB_API_KEY = process.env.VUE_APP_TMDB_API_KEY;
const tmdbUrl = `https://api.themoviedb.org/3/search/movie?query=%QUERY&api_key=${TMDB_API_KEY}`;

export default {
  name: 'SearchForm',
  data() {
    return {
      title: '',
      bh: null,
      selectedItem: null
    }
  },
  computed: {
    tmdbConfig() {
      return this.$store.state.tmdbConfig;
    }
  },
  async mounted() {
    if (!this.tmdbConfig) {
      this.getConfig();
    }

    $('#search').on('submit', e => {
      e.preventDefault();

      this.submitForm();
    });

    this.initTypeahead();
  },
  methods: {
    async submitForm() {
      $('.typeahead').typeahead('close');

      if (this.selectedItem) {
        const id = this.selectedItem.id;

        this.fetchMovie(id);

        this.$router.push({ name: 'ViewMovie', params: { id } })
      } else {
        this.$router.push({ name: 'SearchMovies', params: { query: this.title }, query: { q: this.title } })
      }
    },
    getConfig() {
      this.$store.dispatch('getConfig');
    },
    fetchMovie(id) {
      this.$store.dispatch('fetchMovie', id)
    },
    initTypeahead() {
      this.bh = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.whitespace,
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        remote: {
          wildcard: "%QUERY",
          url: tmdbUrl,
          filter(res) {
            return res.results.map(item => ({
              title: item.original_title,
              id: item.id
            }))
          }
        }
      });

      $('.typeahead').typeahead({
        hint: true,
        highlight: true,
        minLength: 2
      },
      {
        name: 'movies',
        source: this.bh.ttAdapter(),
        display: suggestion => suggestion.title
      });

      $('.typeahead').on('typeahead:select', (jQ, suggestion) => {
        this.selectedItem = suggestion;

        $('#search').submit();
        $('.typeahead').typeahead('close');
      });

      $('.typeahead').on('typeahead:cursorchange', (jQ, suggestion) => {
        this.selectedItem = suggestion;
      });

      $('.typeahead').on('typeahead:autocomplete', (jQ, suggestion) => {
        this.selectedItem = suggestion;
      });

      $('.typeahead').on('input', e => {
        this.selectedItem = null;
      });

      $('.typeahead').on('click', function(e) {
        e.target.select();
      });
    }
  },
}
</script>

<style lang="scss" scoped>
$emerald-green: #1DD4AA;
$azure: #02B5E3;

.button-search {
  background: linear-gradient(to right, $emerald-green, $azure);
  font-weight: 700;
  font-family: "Lato", sanse-serif;
  border-radius: 80px;
}

input[type=text] {
  outline: none;
  border: none;
  border-bottom: 1px solid white;
  background: transparent;
  padding: 8px 16px;
  color: white;
  font-family: "Lato", sans-serif;
  width: 300px;
}

.search-input {
  overflow: hidden;
  border-radius: 80px;
  background: white;
}
</style>