import axios from "axios";

const API_TOKEN =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZjA5YmE4NmM4MGVhNjhiNmY1OWQzMzEwMDJkMjZmYyIsIm5iZiI6MTczNjY4NDM3OS4xMjQsInN1YiI6IjY3ODNiMzViZWU4NGZhNGRlZjdiNjQ2MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BkOlVui46DUlnkOr5ocSykl-GAkbk1GbPTFMw_qpAwk";
const movieApi = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    include_adult: false,
    language: "en-US",
  },
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
    accept: "application/json",
  },
});

export const getTrendingMovies = async () => {
  const { data } = await movieApi.get("/trending/movie/day");
  return data;
};

export const searchMovies = async (query, page) => {
  const { data } = await movieApi.get("/search/movie", {
    params: {
      query,
      page,
    },
  });
  return data;
};

export const getMovieDetails = async (movieId) => {
  const { data } = await movieApi.get(`/movie/${movieId}`);
  return data;
};

export const getMovieActors = async (movieId) => {
  const { data } = await movieApi.get(`/movie/${movieId}/credits`);
  return data;
};

export const getMovieReviews = async (movieId, page) => {
  const { data } = await movieApi.get(`/movie/${movieId}/reviews`, {
    params: {
      page,
    },
  });
  return data;
};
