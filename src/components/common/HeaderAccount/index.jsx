import CustomLink from "../CustomLink";

export default function HeaderAccount() {
  return (
    <CustomLink
      className="menu__link_account"
      linkTo="/profile"
      textLink="Аккаунт"
    />
  )
}