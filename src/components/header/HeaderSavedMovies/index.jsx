import CustomLink from "../../common/CustomLink";

export default function HeaderSavedMovies(
  {
    option, 
    sideBar = false, 
    ...restProps
  }
) {
  const classNameText = `${sideBar ? "side-bar__text" : "header__text"}`;
  const classNameLink = `${sideBar ? "side-bar__link" : "header__link-movies"}`;

  return (
    <>
      {(option === "saved-movies") ?
        <p className={classNameText}> Избранное </p>
        :
        <CustomLink
          className={classNameLink}
          linkTo="/movies"
          textLink="Избранное"
          {...restProps}
        />
      }
    </>
  )
};
