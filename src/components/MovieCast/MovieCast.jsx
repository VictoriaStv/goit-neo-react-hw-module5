import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getMovieActors } from "../../api/Api";
import MovieCastList from "../MovieCastList/MovieCastList";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchMovieCast = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const { cast } = await getMovieActors(movieId);
        setCast(cast);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovieCast();
  }, [movieId]);

  return (
    <div>
      {cast.length > 0 && !isLoading ? (
        <MovieCastList cast={cast} />
      ) : (
        <p>Cast information is not available.</p>
      )}
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
    </div>
  );
}
