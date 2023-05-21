import "./style.scss";

function Validation({ errorMessage }) {
  const success = errorMessage === "Изменения профиля сохранены" ? "error_green" : "";
  return (
    <span className={`error ${errorMessage ? "error_visible" : ""} ${success}`}>{errorMessage}</span>
  );
}

export default Validation;