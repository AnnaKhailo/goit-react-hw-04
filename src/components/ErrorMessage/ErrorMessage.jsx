import css from "./ErrorMessage.module.css";

export default function ErrorMessage() {
  return (
    <div className={css.error}>
      <p>Oops! There was an error! Try again!</p>
    </div>
  );
}
