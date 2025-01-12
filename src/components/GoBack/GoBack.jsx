import { FaLongArrowAltLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import css from "./GoBack.module.css";

export default function GoBack({ location }) {
  return (
    <Link to={location} className={css.goBack}>
      <FaLongArrowAltLeft className={css.icon} />
      Go back
    </Link>
  );
}
