<script setup>
import { ref } from 'vue'

const POSTER_URL = import.meta.env.VITE_MOVIE_POSTER_URL
const props = defineProps(['movie'])
const imageError = ref(false)

function onImageError() {
  imageError.value = true
}
</script>

<template>
  <div class="card mb-4">
    <img
      class="card-img-top"
      :src="POSTER_URL + props.movie.poster_path"
      :alt="props.movie.title"
      v-show="!imageError"
      @error="onImageError"
    >
    <img v-show="imageError" src="../assets/no-thumbnail.svg" alt="no thumbnail">
    <div class="card-body">
      <h5 class="card-title text-dark">{{ props.movie.title }}</h5>
      <p class="card-text text-secondary">{{ props.movie.overview || 'No Overview Available' }}</p>
    </div>
  </div>
</template>

<style lang="scss">
  .card {
    transition: .5s;
    height: 353px;
    border: none;
    box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px;

    img {
      height: 248px;
      object-fit: cover;
    }

    &:hover {
      box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
    }

    &-title {
      height: 40px;
      font-size: 1rem;
      font-weight: 700;
      margin: 0;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    &-text {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      line-height: 15px;
      font-size: 13px;
      padding-top: 3px;
    }
  }
</style>
