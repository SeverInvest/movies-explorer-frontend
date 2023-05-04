import CustomLink from "../CustomLink";

export default function HeaderSavedMovies({ option }) {
    return (
      <>
        {(option === "saved-movies") ?
          <p className="menu__text"> Сохранённые фильмы </p>
          :
          <CustomLink
            className="menu__link_movies"
            linkTo="/saved-movies"
            textLink="Сохранённые фильмы"
          />
        }
      </>
    )
  };