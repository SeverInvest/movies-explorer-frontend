import "./style.scss";
import images from "../../../images";
import { useState } from 'react';

export default function CustomSwitch({
  className = "",
  onToggle = null,
  text = "",
  isDefaultOn = false,
  disabled, 
  children,
  ...restProps
}) {

  let defaultImgButton = null;
  if (isDefaultOn) {
    defaultImgButton = images.smalltumbon
  } else {
    defaultImgButton = images.smalltumboff
  }

  const [imgTumbler, setImgTumbler] = useState(defaultImgButton)

  const handleToggle = (() => {
    if (imgTumbler === images.smalltumbon) {
      setImgTumbler(images.smalltumboff);
    } else {
      setImgTumbler(images.smalltumbon);
    }
    onToggle();
  });

  return (

    <label className={`switch ${className}`}>
      <input
        type="checkbox"
        className="switch__input"
        {...restProps}
        onClick={handleToggle}
        disabled={disabled}
      />
      <img
        className={`switch__img ${disabled ? "switch__img_disabled" : ""}`}
        src={imgTumbler}
        alt={text}
      />
      {text}
      {children}
    </label>
  )
}
