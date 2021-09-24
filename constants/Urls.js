const API_BASE = `https://api.themoviedb.org/3`
const IMAGE_BASE = `https://image.tmdb.org/t/p`
const YOUTUBE_BASE_URL = `https://www.youtube.com/watch`

const POPULAR_MOVIES = `/movie/popular`
const UPCOMING_MOVIES = `/movie/upcoming`

const RATE_URL = (id) => `/movie/${id}/rating`

const MOVIE = (id) => `/movie/${id}`

const API_KEY = `595f2eff9389c7805c3e9672949f90b1`

const APPEND_TO_RESPONSE = {
    VIDEOS: "videos",
    CREDITS: "credits",
    RECOMMENDATIONS: "recommendations",
    SIMILAR: "similar",
};

export {
    APPEND_TO_RESPONSE,
    API_BASE,
    IMAGE_BASE,
    POPULAR_MOVIES,
    UPCOMING_MOVIES,
    API_KEY,
    RATE_URL,
    MOVIE,
    YOUTUBE_BASE_URL
}