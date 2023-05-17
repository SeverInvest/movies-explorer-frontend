import "./style.scss";

export default function CustomForm({
  nameForm = "",
  isValid = true,
  buttonText = "",
  onSubmit = null,
  blue = false,
  option = "",
  children,
  ...restProps
}) {

const classNames=["form__submit"]

if (blue) {
  classNames.push("form__submit_blue")
} else {
  classNames.push("form__submit_normal")
}

if (!isValid) {
  classNames.push("form__submit_disabled")
}

if (option === "login") {
  classNames.push("form__submit_login")
}

if (option === "profile") {
  classNames.push("form__submit_profile")
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
