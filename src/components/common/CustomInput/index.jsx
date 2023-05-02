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
    <label className="form__label">
      {textLabel}
      <input
        className={`form__input ${error ? "form__input_red" : ""}`}
        autoComplete="off"
        name={name}
        id={name}
        required
        {...restProps}
      />
    </label>


  )
}
