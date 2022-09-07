<script setup>
import { onMounted, ref } from 'vue'
import { useMovieStore } from '../store/movie'

const movieStore = useMovieStore()
const keyword = ref('')
let timeout = null

function onSearchMovie() {
  clearTimeout(timeout)

  timeout = setTimeout(() => {
    movieStore.setSearchKeyword(keyword.value)
  }, 1000)
}

onMounted(() => {
  keyword.value = movieStore.searchKeyword
})
</script>

<template>
  <div class="banner mb-3 d-flex align-items-center justify-content-center flex-column text-white">
    <h1>Welcome</h1>
    <h3>Millions of movies available. Explore now</h3>
    <input
      type="text"
      class="form-control rounded-pill"
      placeholder="Explore movies now..."
      v-model="keyword"
      @keyup="onSearchMovie"
    >
  </div>
</template>

<style lang="scss" scoped>
.banner {
  height: 360px;
  background-image: url('https://image.tmdb.org/t/p/w1920_and_h600_multi_faces_filter(duotone,032541,01b4e4)/bgQUBbZ14hfeb975yZ2YzTnAwen.jpg');
  background-position: top center;
  background-size: cover;
  background-repeat: no-repeat;

  input {
    width: 500px;
    max-width: 95%;
  }
}
</style>