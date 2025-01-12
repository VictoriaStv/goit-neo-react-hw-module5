import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { Toaster } from "react-hot-toast";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Loader from "../../components/Loader/Loader";
import MovieList from "../../components/MovieList/MovieList";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import SearchBar from "../../components/SearchBar/SearchBar";
import NotFoundMessage from "../../components/NotFoundMessage/NotFoundMessage";
import NavigationButton from "../../components/NavigationButton/NavigationButton";
import { searchMovies } from "../../api/Api";
import css from "./MoviesPage.module.css";

export default function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState(searchParams.get("query") || "");
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const [totalPages, setTotalPages] = useState(
    Number(searchParams.get("totlaPages")) || 0
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setPage(1);
    setMovies([]);
    setSearchParams({ query: newQuery, page: 1, totalPages });
  };

  const handlePrevPage = () => {
    setPage((prevPage) => {
      const prev = Math.max(prevPage - 1, 1);
      setSearchParams({ query, page: prev, totalPages });
      return prev;
    });
  };

  const handleNextPage = () => {
    setPage((prevPage) => {
      const next = Math.min(prevPage + 1, totalPages);
      setSearchParams({ query, page: next, totalPages });
      return next;
    });
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const data = await searchMovies(query, page);
        setMovies(data.results);
        setTotalPages(data.total_pages);
        setSearchParams({ query, page, totalPages: data.total_pages });
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    if (query) {
      fetchMovies();
    }
  }, [page, query]);

  return (
    <div className={css.container}>
      <div>
        <Toaster />
      </div>
      <SearchBar onSubmit={handleSearch} />
      {movies.length > 0 && !isLoading && <MovieList movies={movies} />}
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {query && movies.length === 0 && !isLoading && !error && (
        <NotFoundMessage query={query} />
      )}
      {totalPages > page && !isLoading && (
        <div className={css.pagination}>
          <NavigationButton
            icon={<FaArrowLeft />}
            onClick={handlePrevPage}
            disabled={page === 1}
          />
          <span className={css.pageInfo}>
            Page {page} of {totalPages}
          </span>
          <NavigationButton
            icon={<FaArrowRight />}
            onClick={handleNextPage}
            disabled={page === totalPages}
          />
        </div>
      )}
    </div>
  );
}
