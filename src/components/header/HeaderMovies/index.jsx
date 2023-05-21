import CustomLink from "../../common/CustomLink";

export default function HeaderMovies(
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
      {(option === "movies") ?
        <p className={classNameText}> Фильмы </p>
        :
        <CustomLink
          className={classNameLink}
          linkTo="/movies"
          textLink="Фильмы"
          {...restProps}
        />
      }
    </>
  )
};
