import "./style.scss";
import { useState } from "react";

export default function Tooltip({
  text="", children, className="", ...restProps
}) {

  const [isVisible, setIsVisible] = useState(false);
  return (
    <div className={`tooltip ${className}`}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      {...restProps}
    >
      {children}
      {isVisible &&
        <div 
        className="tooltip__container"
        >
         <p className="tooltip__text"> {text} </p>
        </div>
      }
    </div>
  );
};