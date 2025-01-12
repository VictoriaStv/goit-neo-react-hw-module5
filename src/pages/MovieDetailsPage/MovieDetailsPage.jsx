import { useState, useEffect } from "react";
import { Suspense } from "react";
import { useLocation } from "react-router-dom";
import { Link, Outlet, useParams } from "react-router-dom";
import { FaImage } from "react-icons/fa";
import GoBack from "../../components/GoBack/GoBack";

import { getMovieDetails } from "../../api/Api";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import css from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const location = useLocation();
  const [movieDetails, setMovieDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [prevLocation] = useState(location.state || "/movies");

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const movie = await getMovieDetails(movieId);
        setMovieDetails(movie);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovieDetails();
  }, [movieId]);

  const getYear = (releaseDate) => {
    return releaseDate ? releaseDate.split("-")[0] : null;
  };

  return (
    <div className={css.container}>
      <GoBack className={css.goBack} location={prevLocation} />
      {movieDetails && !isLoading && (
        <div className={css.details}>
          {movieDetails.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w342${movieDetails.poster_path}`}
              alt={movieDetails.title}
              className={css.poster}
            />
          ) : (
            <div className={css.iconContainer}>
              <FaImage className={css.icon} />
            </div>
          )}
          <div className={css.info}>
            <h1>
              {movieDetails.original_title}
              {getYear(movieDetails.release_date) &&
                ` (${getYear(movieDetails.release_date)})`}
            </h1>
            <p>User score: {movieDetails.vote_average}</p>
            <h2>Overview</h2>
            <p>{movieDetails.overview}</p>
            <h2>Genres</h2>
            <p>{movieDetails.genres.map((genre) => genre.name).join(", ")}</p>
          </div>
        </div>
      )}
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      <hr className={css.separator} />
      <h2>Additional information</h2>
      <ul className={css.list}>
        <li>
          <Link to={`/movies/${movieId}/cast`}>Cast</Link>
        </li>
        <li>
          <Link to={`/movies/${movieId}/reviews`}>Reviews</Link>
        </li>
      </ul>
      <hr className={css.separator} />
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  );
}
