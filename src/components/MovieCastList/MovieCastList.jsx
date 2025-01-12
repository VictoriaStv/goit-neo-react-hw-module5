import { useMemo } from "react";
import css from "./MovieCastList.module.css";
import MovieCastMember from "../MovieCastMember/MovieCastMember";

const sortCastByProfilePath = (a, b) => {
  if (a.profile_path && !b.profile_path) {
    return -1;
  }
  if (!a.profile_path && b.profile_path) {
    return 1;
  }
  return 0;
};

export default function MovieCastList({ cast }) {
  const sortedCast = useMemo(() => {
    return [...cast].sort(sortCastByProfilePath);
  }, [cast]);

  return (
    <ul className={css.list}>
      {sortedCast.map((actor) => (
        <li key={actor.credit_id} className={css.item}>
          <MovieCastMember actor={actor} />
        </li>
      ))}
    </ul>
  );
}
