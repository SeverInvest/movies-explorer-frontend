import CustomLink from "../CustomLink";

export default function Header() {
  return (
    <CustomLink
      className="menu__link_account"
      linkTo="/profile"
      textLink="Аккаунт"
    />
  )
}