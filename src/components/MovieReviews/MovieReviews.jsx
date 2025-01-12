import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getMovieReviews } from "../../api/Api";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import MovieReviewsList from "../MovieReviewsList/MovieReviewsList";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const getNextPage = async () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const { results, total_pages } = await getMovieReviews(movieId, page);
        if (page === 1) {
          setReviews([...results]);
          setTotalPages(total_pages);
        } else {
          setReviews((prevReviews) => [...prevReviews, ...results]);
        }
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [movieId, page]);

  return (
    <>
      {reviews.length > 0 && !isLoading ? (
        <MovieReviewsList reviews={reviews} />
      ) : (
        <p>We don&apos;t have any reviews for this movie.</p>
      )}
      {isLoading && <Loader />}
      {totalPages > page && !isLoading && <LoadMoreBtn onClick={getNextPage} />}
      {error && <ErrorMessage />}
    </>
  );
}
