import CustomLink from "../../common/CustomLink";

export default function HeaderAccount(
  {
    children,
    ...restProps
  }
) {
  return (
    <CustomLink
      className="header__link-account"
      linkTo="/profile"
      textLink="Аккаунт"
      {...restProps}
    >
      {children}
    </CustomLink>
  )
}