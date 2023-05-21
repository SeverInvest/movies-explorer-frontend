import "./style.scss";
import images from "../../../images";

export default function CustomSwitch({
  className = "",
  setIsToggle = null,
  text = "",
  isToggle = false,
  disabled,
  children,
  ...restProps
}) {

  const imgTumbler = isToggle ? images.smalltumbon : images.smalltumboff

  return (

    <label className={`switch ${className}`}>
      <input
        type="checkbox"
        className="switch__input"
        {...restProps}
        onClick={() => setIsToggle(!isToggle)}
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
