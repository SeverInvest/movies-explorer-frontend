import CustomLink from "../../common/CustomLink";

export default function HeaderHabr(
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
      {(option === "habr") ?
        <p className={classNameText}> Хабр.карьера </p>
        :
        <CustomLink
          className={classNameLink}
          linkTo="/habr"
          textLink="Хабр.карьера"
          {...restProps}
        />
      }
    </>
  )
};