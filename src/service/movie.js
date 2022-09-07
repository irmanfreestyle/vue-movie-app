import axios from './axios'
const API_KEY = import.meta.env.VITE_MOVIE_API_KEY
const defaultParams = { api_key: API_KEY }

const GUEST_SESSION_ID = () => {
  return localStorage.getItem('GUEST_SESSION_ID')
}

const movieService = {
  getPopular: data => {
    const path = '/movie/popular'
    return axios.get(path, { params: { ...data, ...defaultParams } })
  },
  getDetails: id => {
    const path = `/movie/${id}`
    return axios.get(path, { params: defaultParams })
  },
  searchMovies: data => {
    const path = '/search/movie'

    return axios.get(path, { params: { ...data, ...defaultParams } })
  },
  rateMovie: (id, value) => {
    const path = `movie/${id}/rating`
    const payload = { value }

    return axios.post(path, payload, { params: {
      ...defaultParams,
      guest_session_id: GUEST_SESSION_ID()
    }})
  },
  unRateMovie: (id) => {
    const path = `movie/${id}/rating`

    return axios.delete(path, { params: {
      ...defaultParams,
      guest_session_id: GUEST_SESSION_ID()
    }})
  },
  generateSessionId: () => {
    const path = '/authentication/guest_session/new'
    return axios.get(path, { params: defaultParams })
  },
  movieDetailsBySession: () => {
    const path = `/guest_session/${GUEST_SESSION_ID()}/rated/movies`

    return axios.get(path, { params: defaultParams })
  }
}

export default movieService