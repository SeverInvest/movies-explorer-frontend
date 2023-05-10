// import { Link } from "react-router-dom";
import "./style.scss";

export default function CustomButton({
  type="button",
  text="",
  className="",
  ariaLabel="",
  children,
  ...restProps
}) {
  const isText = text ? true : false;
  const classNames = ["button", className];

  return (
    <button
      type={type}
      aria-label={ariaLabel}
      className={classNames.join(" ")}
      {...restProps}
    >
      {isText && text}
      {children}
    </button>

  )
}
