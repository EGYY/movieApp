const axios = require('axios').default
import {
    API_KEY,
    API_BASE,
    POPULAR_MOVIES,
    UPCOMING_MOVIES,
    YOUTUBE_BASE_URL,
    IMAGE_BASE, RATE_URL, MOVIE,
} from "../constants/Urls";

const REQUEST_WITH_PARAMS = axios.create({
    baseURL: API_BASE,
    params: {
        api_key: API_KEY,
        language: 'ru-Ru',
    }
})

const SIMPLE_REQUEST = axios.create({baseURL: API_BASE, params: {api_key: API_KEY}})

const getPopularMovies = (with_genres) => {
    if (with_genres) {
      return REQUEST_WITH_PARAMS.get(POPULAR_MOVIES, {
          params: {
              with_genres
          }
      })
    }else {
        return REQUEST_WITH_PARAMS.get(POPULAR_MOVIES)
    }
}

const getUpcomingMovies = () => {
    return REQUEST_WITH_PARAMS.get(UPCOMING_MOVIES)
}

const getImage = (path) => `${IMAGE_BASE}/original${path}`

const rateMovie = (movieId) => SIMPLE_REQUEST.get(RATE_URL(movieId))

const getCurrMovie = (movieId, append_to_response) => REQUEST_WITH_PARAMS.get(MOVIE(movieId),  append_to_response ? { params: { append_to_response,  language: 'ru-Ru' } } : null)

const getVideo = (key) => `${YOUTUBE_BASE_URL}?v=${key}`;

export {
    getImage,
    getPopularMovies,
    rateMovie,
    getUpcomingMovies,
    getCurrMovie,
    getVideo
}