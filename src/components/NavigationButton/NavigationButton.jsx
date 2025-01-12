import css from "./NavigationButton.module.css";

export default function NavigationButton({ icon, onClick, disabled }) {
  return (
    <button className={css.button} onClick={onClick} disabled={disabled}>
      {icon}
    </button>
  );
}
