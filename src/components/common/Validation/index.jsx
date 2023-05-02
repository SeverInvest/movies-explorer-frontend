import "./style.scss";

function Validation({ errorMessage }) {
  return (
    <span className={`error ${errorMessage ? "error_visible" : ""}`}>{errorMessage}</span>
  );
}

export default Validation;