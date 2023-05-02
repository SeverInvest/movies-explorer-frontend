// import { Link } from "react-router-dom";

import "./style.scss";

export default function CustomInput({
  name,
  textLabel,
  error,
  children,
  ...restProps
}) {

  return (
    <label className="register__form__label">
      {textLabel}
      <input
        className={`register__form__input ${error ? "register__form__input_red" : ""}`}
        autoComplete="off"
        name={name}
        id={name}
        required
        {...restProps}
      />
    </label>


  )
}
