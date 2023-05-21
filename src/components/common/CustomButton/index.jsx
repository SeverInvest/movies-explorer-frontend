import "./style.scss";

export default function CustomButton({
  type="button",
  text="",
  className="",
  ariaLabel="",
  disabled=false,
  children,
  ...restProps
}) {
  const isText = text ? true : false;
  const classNames = ["button", className];

  return (
    <button
      type={type}
      aria-label={ariaLabel}
      disabled={disabled}
      className={classNames.join(" ")}
      {...restProps}
    >
      {isText && text}
      {children}
    </button>

  )
}
