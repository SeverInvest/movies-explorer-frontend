import { Route, Routes } from 'react-router-dom';
import images from '../../../images';
import "./style.scss";
import CustomLink from "../CustomLink";
import { useState, useEffect } from 'react';
import { useResize } from "../../../hooks/useResize";
import CustomButton from '../CustomButton';


function Header() {

  const [hamburgerOn, setHamburgerOn] = useState(false);
  const [showHeaderUp, setShowHeaderUp] = useState(false);
  const { typeScreen } = useResize();

  function handleMenuBtnClick() {
    hamburgerOn ? setHamburgerOn(false) : setHamburgerOn(true);
  }

  useEffect(() => {
    if (typeScreen !== "desktop" && hamburgerOn) {
      setShowHeaderUp(true);
    } else {
      setShowHeaderUp(false);
    }
  }, [typeScreen, hamburgerOn]);

  // component Logo
  function Logo() {
    return (
      <CustomLink
        linkTo="/"
        className="header__link_logo"
      >
        <img src={images.logo} alt="логотип" className="header__logo" />
      </CustomLink>
    )
  };

  //Component HeaderMovies
  function HeaderMovies({ option }) {
    return (
      <>
        {(option === "movies") ?
          <p className="header__text-films"> Фильмы </p>
          :
          <CustomLink
            className="header__link_movies"
            linkTo="/movies"
            textLink="Фильмы"
          />
        }
      </>
    )
  };

  //Component HeaderSavedMovies
  function HeaderSavedMovies({ option }) {
    return (
      <>
        {(option === "saved-movies") ?
          <p className="header__text-films"> Сохранённые фильмы </p>
          :
          <CustomLink
            className="header__link_movies"
            linkTo="/saved-movies"
            textLink="Сохранённые фильмы"
          />
        }
      </>
    )
  };

  // Component Верхнее меню (открывется по бургеру)
  function HeaderUpMenu({
    option,
  }) {
    return (
      <>
        {showHeaderUp &&

          <nav className="header__nav-top">
            <CustomLink
              className="header__link_movies"
              linkTo="/"
              textLink="Главная"
            />
            <HeaderMovies option={option} />
            <HeaderSavedMovies option={option} />
            {(option === "profile") ?
              <p className="header__text-films"> Аккаунт </p>
              :
              <CustomLink
                className="header__link_movies"
                linkTo="/profile"
                textLink="Аккаунт"
              />
            }
          </nav>
        }
      </>
    )
  };

  // Компонент Меню или бургер
  function MenuOrBurger({
    option,
  }) {
    // console.log(option);
    return (
      <>
        {(typeScreen === "desktop") ?
          <>
            <nav className="header__navigation header__navigation_middle">
              <HeaderMovies option={option} />
              <HeaderSavedMovies option={option} />
            </nav>

            <nav className="header__navigation">
              <CustomLink
                className="header__link_account"
                linkTo="/profile"
                textLink="Аккаунт"
              />
            </nav>
          </>
          :
          <CustomButton
            className="header__nav-btn"
            type="button"
            onClick={handleMenuBtnClick}
          >
            {hamburgerOn ?
              <img
                src={images.icon_delete}
                alt="закрыть верхнее меню"
                className="header__nav-btn-img"
              />
              :
              <img
                src={images.burger}
                alt="открыть верхнее меню"
                className="header__nav-btn-img"
              />
            }
          </CustomButton>
        }
      </>
    )
  };

  return (

    <Routes>

      <Route
        path="/"
        element={
          <header className="header header_background-light">
            <div className="header__container">
              <Logo />
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
            <HeaderUpMenu option="movies" />
            <div className="header__container">
              <Logo />
              <MenuOrBurger option="movies" />
            </div>
          </header>
        }
      />

      <Route
        path="/saved-movies"
        element={
          <header className="header header_background-dark">
            <HeaderUpMenu option="saved-movies" />
            <div className="header__container">
              <Logo />
              <MenuOrBurger option="saved-movies" />
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

      <Route
        path="/profile"
        element={
          <header className="header header_background-dark">
            <HeaderUpMenu option="profile" />
            <div className="header__container">
              <Logo />
              <MenuOrBurger option="profile" />
            </div>
          </header>
        }
      />

    </Routes >
  )
};
export default Header;