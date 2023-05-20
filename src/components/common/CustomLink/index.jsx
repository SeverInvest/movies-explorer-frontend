import { Link } from "react-router-dom";
import "./style.scss";

export default function CustomLink({ 
  linkTo = "/", 
  textLink = "",
  className = "",
  children,
  ...restProps
}) {
  const isText = textLink ? true : false;
  const classNames = ["link", className];

  return (
      <Link
        to={linkTo}
        className={classNames.join(" ")}
        {...restProps}
        >
        {isText && textLink}
        {children}
      </Link>

  )
}
