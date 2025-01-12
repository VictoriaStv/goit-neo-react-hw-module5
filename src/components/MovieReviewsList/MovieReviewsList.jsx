import css from "./MovieReviewsList.module.css";
import MovieReview from "../MovieReview/MovieReview";

export default function MovieReviewsList({ reviews }) {
  return (
    <ul className={css.list}>
      {reviews.map((review) => (
        <li key={review.id} className={css.item}>
          <MovieReview review={review} />
        </li>
      ))}
    </ul>
  );
}
