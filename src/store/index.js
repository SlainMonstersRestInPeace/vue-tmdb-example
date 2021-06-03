import axios from 'axios';
import { createStore } from 'vuex';

const TMDB_API_KEY = process.env.VUE_APP_TMDB_API_KEY;

async function fetchOperation({ commit, dispatch, state }, url, { options, transformResponse, errorHandler, onSuccess }) {
  options = options || {};
  onSuccess = onSuccess || (() => {})
  transformResponse = transformResponse || (res => res);
  errorHandler = errorHandler || (err => {throw err})

  let res = {};

  try {
    commit('fetchStart');

    res = await axios(url, options);
    res = await transformResponse(res);

    await onSuccess(res, { commit, dispatch, state })
  } catch (err) {
    errorHandler(err);

    commit('fetchEnd');
  }

  commit('fetchEnd');

  return res;
}

function mapMovie(movie) {
  return {
    id: movie.id,
    genres: movie.genres,
    title: movie.title,
    overview: movie.overview,
    release_date: movie.release_date,
    revenue: movie.revenue,
    rating: movie.vote_average,
    runtime: movie.runtime,
    tagline: movie.tagline,
    backdrop: movie.backdrop_path,
    poster: movie.poster_path,
    production_companies: movie.production_companies
  }
}

export default createStore({
  state: {
    error: null,
    tmdbConfig: null,
    movie: null,
    suggestions: {
      suggestions: []
    },
    defaultMovieId: 120,
    fetchLoading: false,
    previousRoute: null,
  },
  mutations: {
    setPreviousRoute(state, payload) {
      state.previousRoute = payload;
    },
    fetchStart(state) {
      state.fetchLoading = true;
    },
    fetchEnd(state) {
      state.fetchLoading = false;
    },
    setError(state, payload) {
      state.error = payload;
    },
    setTmdbConfig(state, payload) {
      state.tmdbConfig = payload;
    },
    setSuggestions(state, payload) {
      state.suggestions = payload;
    },
    setMovie(state, payload) {
      state.movie = payload;
    },
    clearMovie(state) {
      state.movie = null;
    },
    clearSuggestions(state) {
      state.suggestions = {
        suggestions: []
      };
    },
  },
  actions: {
    async getConfig(cxt) {
      const url = `https://api.themoviedb.org/3/configuration?api_key=${TMDB_API_KEY}`;

      await fetchOperation(cxt, url, {
        transformResponse: res => res.data,
        errorHandler: err => {
          if (!axios.isCancel(err)) {
            throw err;
          }
        },
        onSuccess: (data, { commit }) => {
          commit('setTmdbConfig', data)
        }
      });
    },
    async fetchMovie(cxt, id, options) {
      cxt.commit('clearMovie');
      // cxt.commit('clearSuggestions');

      const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}`;

      await fetchOperation(cxt, url, {
        options,
        transformResponse: res => mapMovie(res.data),
        errorHandler: err => {
          if (!axios.isCancel(err)) {
            throw err;
          }
        },
        onSuccess: (data, { commit }) => {
          commit('setMovie', data)
        }
      });
    },
    async fetchMovies(cxt, { url, options }) {
      cxt.commit('clearMovie');

      await fetchOperation(cxt, url, {
        options,
        transformResponse: res => res.data,
        errorHandler: err => {
          if (!axios.isCancel(err)) {
            throw err;
          }
        },
        onSuccess: (data, { commit, state }) => {
          commit('setSuggestions', {
            total_pages: data.total_pages,
            total_results: data.total_results,
            page: data.page,
            suggestions: state.suggestions.suggestions.concat(data.results.map(mapMovie))
          })
        }
      });
    },
    async searchMovies(cxt, { query, options }) {
      const page = query.page ? `&page=${query.page}` : '';
      const url = `https://api.themoviedb.org/3/search/movie?query=${query.query}&api_key=${TMDB_API_KEY}${page}`;

      await cxt.dispatch('fetchMovies', { url, options });
    },
    async fetchPopularMovies(cxt, { query, options }) {
      const page = query.page ? `&page=${query.page}` : '';
      const url = `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}${page}`;

      await cxt.dispatch('fetchMovies', { url, options });
    },
    async fetchNowPlayingMovies(cxt, { query, options }) {
      const page = query.page ? `&page=${query.page}` : '';
      const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${TMDB_API_KEY}${page}`;

      await cxt.dispatch('fetchMovies', { url, options });
    },
    async fetchTopRatedMovies(cxt, { query, options }) {
      const page = query.page ? `&page=${query.page}` : '';
      const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${TMDB_API_KEY}${page}`;

      await cxt.dispatch('fetchMovies', { url, options });
    },
    async fetchUpcomingMovies(cxt, { query, options }) {
      const page = query.page ? `&page=${query.page}` : '';
      const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${TMDB_API_KEY}${page}`;

      await cxt.dispatch('fetchMovies', { url, options });
    },
  },
  modules: {
  },
});
