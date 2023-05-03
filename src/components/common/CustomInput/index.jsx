// import { Link } from "react-router-dom";

import "./style.scss";

export default function CustomInput({
  name,
  textLabel,
  error,
  children,
  option="",
  ...restProps
}) {

  return (
    <label className={`form__label ${option === "profile" ? "form__label_profile" : ""}`}>
      <p className={option === "profile" ? "form__label-text_profile" : ""}>{textLabel}</p>
      <input
        className={`form__input ${error ? "form__input_red" : ""} ${option === "profile" ? "form__input_profile" : ""}`}
        autoComplete="off"
        name={name}
        id={name}
        required
        {...restProps}
      />
    </label>


  )
}
