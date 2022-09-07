<script setup>
import movieList from '../components/MovieList.vue'
import movieSearchBar from '../components/MovieSearchBar.vue';
</script>


<template>
  <movie-search-bar />
  <div class="container pb-3">
    <movie-list />
  </div>
</template>
