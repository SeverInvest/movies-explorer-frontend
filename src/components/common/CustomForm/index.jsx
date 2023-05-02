// import { Link } from "react-router-dom";

import "./style.scss";

export default function CustomForm({
  nameForm,
  isEnabled,
  buttonText,
  onSubmit,
  blue,
  option,
  children,
  ...restProps
}) {
const classNames=["form__submit"]

if (blue) {
  classNames.push("form__submit_blue")
} else {
  classNames.push("form__submit_normal")
}

if (isEnabled) {
  classNames.push("form__submit_disabled")
}

if (option === "login") {
  classNames.push("form__submit_login")
}

  return (

    <form
      className="form"
      method="post"
      onSubmit={onSubmit}
      id={nameForm}
      name={nameForm}
      {...restProps}
    >
      {children}
      <button
        className={classNames.join(" ")}
        type="submit"
        aria-label={buttonText}
        name={`button-submit-${nameForm}`}>
        {buttonText}
      </button>
    </form>

  )
}
