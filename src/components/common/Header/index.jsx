import { Route, Routes } from 'react-router-dom';
import images from "../../../images";
import "./style.scss";
import CustomLink from "../CustomLink";
import { useState, useEffect } from 'react';
import { useResize } from "../../../hooks/useResize";
import CustomButton from '../CustomButton';
import HeaderMovies from '../HeaderMovies';
import HeaderSavedMovies from '../HeaderSavedMovies';
import HeaderAccount from "../HeaderAccount";
import SideBar from '../SideBar';
import Logo from '../Logo';

function Header() {

  const [hamburgerOn, setHamburgerOn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { typeScreen } = useResize();

  function handleHamburgerOn() {
    setHamburgerOn(true);
  }

  function handleHamburgerOff() {
    setHamburgerOn(false);
  }


  useEffect(() => {
    if (typeScreen !== "desktop" && hamburgerOn) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
      setHamburgerOn(false);
    }
  }, [typeScreen, hamburgerOn]);

  // Компонент: Меню-или-бургер
  function MenuOrBurger({
    option,
  }) {
    return (
      <>
        {(typeScreen === "desktop") ?
          <>
            <nav className="header__navigation header__navigation_middle">
              <HeaderMovies option={option} />
              <HeaderSavedMovies option={option} />
            </nav>

            <nav className="header__navigation">
              <HeaderAccount />
            </nav>
          </>
          :
          <CustomButton
            className="header__nav-btn"
            type="button"
            onClick={handleHamburgerOn}
          >
            <img
              src={images.burger}
              alt="открыть сайдбар"
              className="header__nav-btn-img"
            />
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
                  className="header__link header__link_normal"
                />
                <CustomLink
                  linkTo="/signin"
                  textLink="Войти"
                  className="header__link header__link_rect"
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
            <SideBar option="movies" handleHamburgerOff={handleHamburgerOff} isOpen={isOpen}/>
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
            <SideBar option="saved-movies" handleHamburgerOff={handleHamburgerOff} isOpen={isOpen}/>
            <div className="header__container">
              <Logo />
              <MenuOrBurger option="saved-movies" />
            </div>
          </header>
        }
      />

      <Route
        path="/profile"
        element={
          <header className="header header_background-dark">
            <SideBar option="profile" handleHamburgerOff={handleHamburgerOff} isOpen={isOpen}/>
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