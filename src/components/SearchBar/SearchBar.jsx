import { FaExclamationTriangle } from "react-icons/fa";
import toast from "react-hot-toast";
import css from "./SearchBar.module.css";

const warn = () => {
  toast("Please enter a search query!", {
    style: {
      color: "darkorange",
      padding: "7px 10px",
    },
    icon: <FaExclamationTriangle />,
    duration: 1500,
  });
};

export default function SearchBar({ onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault();

    const query = e.target.elements.input.value.trim();
    if (query === "") {
      warn();
      return;
    }
    onSubmit(query);
    e.target.reset();
  };

  return (
    <div className={css.container}>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          type="text"
          name="input"
          autoComplete="off"
          autoFocus
          placeholder="Search movies by name"
        />
        <button className={css.button} type="submit">
          Search
        </button>
      </form>
    </div>
  );
}
