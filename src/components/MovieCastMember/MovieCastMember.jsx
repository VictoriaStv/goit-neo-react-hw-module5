import css from "./MovieCastMember.module.css";
import { FaUser } from "react-icons/fa";

export default function MovieCastMember({ actor }) {
  return (
    <div className={css.card}>
      {actor.profile_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w154${actor.profile_path}`}
          alt={actor.name}
          className={css.image}
        />
      ) : (
        <div className={css.iconContainer}>
          <FaUser className={css.icon} />
        </div>
      )}
      <p className={css.name}>{actor.name}</p>
      <p className={css.character}>Character: {actor.character}</p>
    </div>
  );
}
