<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import movieService from '../service/movie'
import Spinner from '../components/Spinner.vue';
import RateButton from '../components/RateButton.vue';

const POSTER_URL = import.meta.env.VITE_MOVIE_POSTER_URL
const BACKDROP_URL = import.meta.env.VITE_MOVIE_BACKDROP_URL
const router = useRoute()
const loading = ref(true)
const movie = ref({})
const imageError = ref(false)

function onImageError() {
  imageError.value = true
}

async function loadMovieDetails() {
  try {
    const result = await movieService.getDetails(router.params.id)
    movie.value = result
  } catch (error) {
    app.$toast.error('Sorry, something wrong!')
  }

  loading.value = false
}

onMounted(() => {
  loadMovieDetails()
})
</script>

<template>
  <div
    :style="{
      background: `url(${BACKDROP_URL}${movie.backdrop_path})`,
      minHeight: '93vh'
    }"
    class="row align-items-center justify-content-center backdrop text-white position-relative m-0"
  >
    <div class="backdrop-filter" />

    <Spinner v-if="loading" />

    <div v-show="!loading" class="col-sm-6 col-md-3 col-lg-2 py-4 text-center" style="z-index: 1;">
      <img
        class="w-100 rounded-3"
        style="max-width: 300px;"
        :src="POSTER_URL + movie.poster_path"
        :alt="movie.title"
        v-show="!imageError"
        @error="onImageError"
      >
      <img v-show="imageError" src="../assets/no-thumbnail.svg" alt="no thumbnail" class="w-100">
      <RateButton :movieId="movie.id" />
    </div>

    <div class="col-md-5 col-lg-6" style="z-index: 1;" v-show="!loading">
      <h1 class="text-center text-md-start fw-bold">{{ movie.title }}</h1>
      <section>
        <span>{{ movie.release_date }}</span> &nbsp; &#8226; &nbsp;
        <span>{{ movie?.genres?.map(item => item.name).join(', ') }}</span> &nbsp; &#8226; &nbsp;
        <span>{{ movie.status }}</span>
      </section>
      <section class="my-3 fst-italic">{{ movie.tagline }}</section>
      <section class="pb-4">
        <h5 class="fw-bold" @click="movieService.movieDetailsBySession()">Overview</h5>
        {{ movie.overview }}
      </section>
    </div>
  </div>
</template>
