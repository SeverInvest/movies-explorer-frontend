import "./style.scss";

function Validation({ errorMessage }) {
  const success = errorMessage === "Изменения профила сохранены" ? "error_green" : "";
  return (
    <span className={`error ${errorMessage ? "error_visible" : ""} ${success}`}>{errorMessage}</span>
  );
}

export default Validation;