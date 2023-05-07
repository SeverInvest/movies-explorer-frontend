// import { Link } from "react-router-dom";
// import { useState } from 'react';
import "./style.scss";
// import images from "../../../images";

export default function CustomSwitch({
  className = "",
  onToggle,
  imgTumbler,
  text = "",
  children,
  ...restProps
}) {

  return (

    <label className="switch__label">
      <input
        type="checkbox"
        className="switch"
        {...restProps}
        onClick={onToggle}
      />
      <img
        className="switch__img"
        src={imgTumbler}
        alt="переключатель короткометражек"
      />
      <p className={className}>
        {text}
      </p>
      {children}
    </label>
  )
}
