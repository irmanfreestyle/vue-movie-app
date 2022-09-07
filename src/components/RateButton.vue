<script setup>
import { app } from '../main'
import { ref, defineProps, onMounted } from "vue"
import movieService from "../service/movie"

const props = defineProps(['movieId'])
const rating = ref(0)

async function getRatedMovies() {
  try {
    const { results } = await movieService.movieDetailsBySession()
    rating.value = results.find(movie => movie.id === props.movieId)?.rating || 0
  } catch (err) {
    app.$toast.error('Sorry, something wrong!')
  }
}

async function rateIt() {
  try {
    if (rating.value > 0) {
      await movieService.rateMovie(props.movieId, rating.value)
    } else {
      await movieService.unRateMovie(props.movieId)
    }
    app.$toast.success(rating.value > 0 ? 'Success, you rate it!' : 'Success, you delete the rating!')
  } catch (err) {
    app.$toast.error('Sorry, something wrong!')
  }
}

onMounted(() => {
  getRatedMovies()
})
</script>

<template>
  <div class="slide-container">
    <input type="range" min="0" max="10" class="slider" v-model="rating" @change="rateIt">
    <span class="text-warning">{{ rating }}</span>
  </div>
</template>

<style lang="scss">
.slide-container {
  width: 100%;
  .slider {
    -webkit-appearance: none;
    width: 100%;
    height: 5px;
    border-radius: 5px;
    background: #FFFFFF;
    outline: none;
    opacity: 0.7;
    -webkit-transition: .2s;
    transition: opacity .2s;

    &:hover {
      opacity: 1;
    }

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 23px;
      height: 24px;
      border: 0;
        border-radius: 50%;
      background-image: url('https://img.icons8.com/doodle/452/star--v1.png');
      background-size: contain;
      background-position: center center;
      background-repeat: no-repeat;
      cursor: pointer;
    }
  }
}
</style>