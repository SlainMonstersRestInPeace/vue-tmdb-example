import { createRouter, createWebHistory } from 'vue-router';

import ViewMovie from '../views/ViewMovie'

import SearchMovies from '../views/SearchMovies'
import PopularMovies from '../views/PopularMovies'
import NowPlayingMovies from '../views/NowPlayingMovies'
import UpcomingMovies from '../views/UpcomingMovies'
import TopRatedMovies from '../views/TopRatedMovies'

import NotFound from '../views/NotFound'

import store from '../store/index'

const routes = [
  {
    path: '/',
    redirect: '/popular'
  },
  {
    path: '/movie',
    redirect: `/movie/${store.state.defaultMovieId}`
  },
  {
    path: '/movie/:id',
    name: 'ViewMovie',
    component: ViewMovie,
    props(route) {
      return {
        id: +route.params.id
      }
    }
  },
  {
    path: '/search',
    name: 'SearchMovies',
    component: SearchMovies,
    props(route) {
      return {
        query: route.query.q,
        page: +route.query.pgn - 1,
      }
    }
  },
  {
    path: '/popular',
    name: 'PopularMovies',
    component: PopularMovies,
  },
  {
    path: '/now-playing',
    name: 'NowPlayingMovies',
    component: NowPlayingMovies,
  },
  {
    path: '/upcoming',
    name: 'UpcomingMovies',
    component: UpcomingMovies,
  },
  {
    path: '/top-rated',
    name: 'TopRatedMovies',
    component: TopRatedMovies,
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFound
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
