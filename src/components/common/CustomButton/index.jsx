// import { Link } from "react-router-dom";
import "./style.scss";

export default function CustomButton({
  type,
  text,
  option,
  ariaLabel,
  children,
  ...restProps
}) {
  const classNames = ["button"];

  if (option === "search") {
    classNames.push("button_search");
  }

  if (option === "more") {
    classNames.push("button_more");
  }

  return (
    <button
      type={type}
      aria-label={ariaLabel}
      className={classNames.join(" ")}
      {...restProps}
    >
      {text}
      {children}
    </button>

  )
}
