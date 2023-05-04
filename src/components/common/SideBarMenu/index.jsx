import CustomLink from "../CustomLink";
import HeaderMovies from "../HeaderMovies";
import HeaderSavedMovies from "../HeaderSavedMovies";

export default function SideBarMenu({
    option,
    showHeaderUp,
  }) {
    return (
      <>
        {showHeaderUp &&
          <nav className="menu__nav-top">
            <CustomLink
              className="menu__link_movies"
              linkTo="/"
              textLink="Главная"
            />
            <HeaderMovies option={option} />
            <HeaderSavedMovies option={option} />
            {(option === "profile") ?
              <p className="menu__text"> Аккаунт </p>
              :
              <CustomLink
                className="menu__link_movies"
                linkTo="/profile"
                textLink="Аккаунт"
              />
            }
          </nav>
        }
      </>
    )
  };