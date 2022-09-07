<script setup>
import { app } from '../main'
import { computed, onMounted, ref, watch } from 'vue'
import { useMovieStore } from '../store/movie';
import movieService from '../service/movie';
import MovieCard from '../components/MovieCard.vue'
import Spinner from './Spinner.vue'

const loading = ref(false)
const movieStore = useMovieStore()
const movies = computed(() => movieStore.movies.data)
const page = computed(() => movieStore.movies.page)
const totalPages = computed(() => movieStore.movies.total_pages)
const searchMovieKeyword = computed(() => movieStore.searchKeyword)
const isSearching = computed(() => searchMovieKeyword.value.trim().length)

watch(searchMovieKeyword, keyword => {
  searchMovies(keyword)
})

async function loadPopularMovies(page = 1) {
  loading.value = true

  try {
    const result = await movieService.getPopular({ page })
    movieStore.setMovies(result)
  } catch (err) {
    app.$toast.error('Sorry, something wrong!')
  }

  loading.value = false
}

async function searchMovies(keyword, page = 1, continueSearching = false) {
  loading.value = true
  if(!continueSearching) movieStore.movies.data = []

  try {
    if (!keyword.trim().length) {
      loadPopularMovies()
    } else {
      const result = await movieService.searchMovies({ query: keyword, page })
      movieStore.setMovies(result)
    }
  } catch (err) {
    app.$toast.error('Sorry, something wrong!')
  }

  loading.value = false
}

function loadMore() {
  if (!isSearching.value) {
    loadPopularMovies(page.value + 1)
  } else {
    searchMovies(searchMovieKeyword.value, page.value + 1, true)
  }
}

onMounted(() => {
  if (!movies.value.length) {
    loadPopularMovies()
  }
})
</script>

<template>
  <div class="text-center" v-show="!movies.length && !loading">No movies found!</div>
  <div class="pb-3" v-show="movies.length">
    <b>Popular Movies</b>
  </div>
  <div class="row">
    <div
      class="col-6 col-sm-4 col-md-3 col-lg-2"
      v-for="movie in movies"
      :key="movie.id"
    >
      <router-link :to="`/movie/${movie.id}`" class="text-decoration-none">
        <MovieCard :movie="movie" />
      </router-link>
    </div>
  </div>

  <div class="text-center" v-show="!loading && movies.length && (totalPages !== page)">
    <button class="btn btn-sm btn-outline-primary d-flex align-items-center m-auto" @click="loadMore">
      <i class="material-icons">rotate_right</i> &nbsp;
      Load More Movies
    </button>
  </div>

  <Spinner v-if="loading" />
</template>