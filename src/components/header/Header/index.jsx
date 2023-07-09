import "./style.scss";
import CustomLink from "../../common/CustomLink";
import { useState, useEffect } from 'react';
import { useResize } from "../../../hooks/useResize";
import SideBar from '../../common/SideBar';
import Logo from '../../common/Logo';
import MenuOrBurger from '../MenuOrBurger';
import { useSelector } from 'react-redux';

export default function Header({
  // loggedIn = false,
  option, //main, movies, saved-movies, profile
}) {
  const isLogggedIn = useSelector(state => state.user.isLoggedIn);
  const [hamburgerOn, setHamburgerOn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { typeScreen } = useResize();

  useEffect(() => {
    if (typeScreen !== "desktop" && hamburgerOn) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
      setHamburgerOn(false);
    }
  }, [typeScreen, hamburgerOn]);

  return (
    <header className={`header ${option === "main" ? "header_background-light" : "header_background-dark"}`}>
      <SideBar option={option} handleHamburgerOff={(() => setHamburgerOn(false))} isOpen={isOpen} />
      <div className="header__container">
        <Logo />
        <>
          {(isLogggedIn) ?
            <>
              <MenuOrBurger option={option} typeScreen={typeScreen} setHamburgerOn={setHamburgerOn} />
            </>
            :
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
          }
        </>
      </div>
    </header>
  )
}
