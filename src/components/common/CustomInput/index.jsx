import "./style.scss";

export default function CustomInput({
  name,
  textLabel,
  error,
  option = "",
  children,
  ...restProps
}) {

  return (
    <label className={`form__label ${option === "profile" ? "form__label_profile" : ""}`}>
        {textLabel}
      <input
        className={`form__input ${error ? "form__input_red" : ""} ${option === "profile" ? "form__input_profile" : ""}`}
        name={name}
        id={name}
        required
        {...restProps}
      />
    </label>


  )
}
