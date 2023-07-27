import CustomLink from "../../common/CustomLink";

export default function HeaderUsers(
  {
    option, 
    sideBar = false,
    ...restProps
  }
) {
  const classNameText = `${sideBar ? "side-bar__text" : "header__text"}`;
  const classNameLink = `${sideBar ? "side-bar__link" : "header__link-videos"}`;

  return (
    <>
      {(option === "users") ?
        <p className={classNameText}> Пользователи </p>
        :
        <CustomLink
          className={classNameLink}
          linkTo="/users"
          textLink="Пользователи"
          {...restProps}
        />
      }
    </>
  )
};