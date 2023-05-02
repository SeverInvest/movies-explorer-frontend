import { Route, Routes } from 'react-router-dom';
import images from '../../../images';
import "./style.scss";
import CustomLink from "../CustomLink";

function Header() {

  return (

    <Routes>

      <Route
        path="/"
        element={
          <header className="header header_background-light">
            <div className="header__container">
              <CustomLink
                linkTo="/"
                option="logo"
                className="header__link_logo"
              >
                <img src={images.logo} alt="логотип" className="header__logo" />
              </CustomLink>
              <nav className="header__navigation header__navigation_right">
                <CustomLink
                  linkTo="/signup"
                  textLink="Регистрация"
                  className="header__link_normal"
                />
                <CustomLink
                  linkTo="/signin"
                  textLink="Войти"
                  className="header__link_rect"
                />
              </nav>
            </div>
          </header>
        }
      />

      <Route
        path="/movies"
        element={
          <header className="header header_background-dark">
            <div className="header__container">
              <CustomLink
                linkTo="/"
                className="header__link_logo"
              >
                <img src={images.logo} alt="логотип" className="header__logo" />
              </CustomLink>

              <nav className="header__navigation header__navigation_middle">
                <p className="header__text-films"> Фильмы </p>
                <CustomLink
                  className="header__link_movies"
                  linkTo="/saved-movies"
                  textLink="Сохранённые фильмы"
                />
              </nav>

              <nav className="header__navigation header__navigation_right">
                <CustomLink
                  className="header__link_account"
                  linkTo="/profile"
                  textLink="Аккаунт"
                />
              </nav>
            </div>
          </header>
        }
      />

      <Route
        path="/saved-movies"
        element={
          <header className="header header_background-dark">
            <div className="header__container">
              <CustomLink
                linkTo="/"
                className="header__link_logo"
              >
                <img src={images.logo} alt="логотип" className="header__logo" />
              </CustomLink>

              <nav className="header__navigation header__navigation_middle">
                <CustomLink
                  className="header__link_movies"
                  linkTo="/movies"
                  textLink="Фильмы"
                />
                <p className="header__text-films"> Сохранённые фильмы </p>
              </nav>

              <nav className="header__navigation header__navigation_right">
                <CustomLink
                  className="header__link_account"
                  linkTo="/profile"
                  textLink="Аккаунт"
                />
              </nav>
            </div>
          </header>
        }
      />

      <Route
        path="/signup"
        element={
          <header className="header header_background-dark">
            <div className="header__container header__container_signup">
              <CustomLink
                linkTo="/"
                className="header__link_logo"
              >
                <img src={images.logo} alt="логотип" className="header__logo" />
              </CustomLink>
            </div>
          </header>
        }
      />

<Route
        path="/signin"
        element={
          <header className="header header_background-dark">
            <div className="header__container header__container_signup">
              <CustomLink
                linkTo="/"
                className="header__link_logo"
              >
                <img src={images.logo} alt="логотип" className="header__logo" />
              </CustomLink>
            </div>
          </header>
        }
      />


    </Routes >
  );
}
export default Header;