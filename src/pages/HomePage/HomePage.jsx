import { useEffect, useState } from "react";

import css from "./HomePage.module.css";

import { getTrendingMovies } from "../../api/Api";
import Loader from "../../components/Loader/Loader";
import MovieList from "../../components/MovieList/MovieList";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

export default function HomePage() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const movies = await getTrendingMovies();
        setTrendingMovies(movies.results);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTrendingMovies();
  }, []);
  return (
    <div className={css.home}>
      <h1>Trending today</h1>
      {trendingMovies.length > 0 && !isLoading && (
        <MovieList movies={trendingMovies} />
      )}
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
    </div>
  );
}
