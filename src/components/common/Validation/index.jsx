import "./style.scss";

function Validation({ errorMessage, classNameValidation = "", children, ...restProps }) {

  const classNames = [];

  classNames.push("error");
  classNames.push(classNameValidation);
  classNames.push(errorMessage ? "error_visible" : "");
  classNames.push(errorMessage === "Изменения профиля сохранены" ? "error_green" : "");

  return (
    <span
      className={classNames.join(" ")}
      {...restProps}
    >
      {errorMessage}
      {children}
    </span>
  );
}

export default Validation;
