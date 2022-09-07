import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

export const useMovieStore = defineStore('movie', () => {
  const movies = reactive({ data: [], page: 1, total_pages: 1 })
  const searchKeyword = ref('')

  function setSearchKeyword (data) {
    searchKeyword.value = data
  }

  function setMovies ({ page, results, total_pages }) {
    movies.data = [...movies.data, ...results]
    movies.total_pages = total_pages
    movies.page = page
  }

  return { movies, searchKeyword, setSearchKeyword, setMovies }
})