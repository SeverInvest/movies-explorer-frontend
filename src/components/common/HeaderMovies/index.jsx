import CustomLink from "../CustomLink";

export default function HeaderMovies({ option }) {
    return (
      <>
        {(option === "movies") ?
          <p className="menu__text"> Фильмы </p>
          :
          <CustomLink
            className="menu__link_movies"
            linkTo="/movies"
            textLink="Фильмы"
          />
        }
      </>
    )
  };