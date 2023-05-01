// import { Link } from "react-router-dom";
// import { useState } from 'react';
import "./style.scss";
// import images from "../../../images";

export default function CustomSwitch({
  onToggleSwitch,
  imgTumbler,
  text = "",
  children,
  ...restProps
}) {

  return (
    <div
      className="switch"
      {...restProps}
      onClick={onToggleSwitch}
    >
      <img className="switch__img" src={imgTumbler} alt="переключатель короткометражек" />
      <p className="switch__text">{text}</p> 
      {children}
    </div>

  )
}
