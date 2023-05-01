import { Link } from "react-router-dom";
import "./style.scss";

export default function CustomLink({ 
  linkTo, 
  textLink,
  option,
  children,
  ...restProps
}) {
  const isText = textLink ? true : false;
  const classNames = ["link"];

  if (option==="normal") {
    classNames.push("link_normal");
  }

  if (option==="rect") {
    classNames.push("link_rect");
  }

  if (option==="big-normal") {
    classNames.push("link_big-normal");
  }

  if (option==="big") {
    classNames.push("link_big");
  }

  if (option==="arrow") {
    classNames.push("link_arrow");
  }

  if (option==="medium-normal") {
    classNames.push("link_medium-normal");
  }

   if (option==="underlined") {
    classNames.push("link_underlined");
  }
 
  if (option==="img") {
    classNames.push("link_img");
  }

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
