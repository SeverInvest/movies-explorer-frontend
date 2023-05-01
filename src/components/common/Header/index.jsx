// import { Navigate } from 'react-router-dom';
import images from '../../../images';
import "./style.scss";
import CustomLink from "../CustomLink";

function Header() {

  return (
    <header className="header">
      <div className="header__container">
        <img src={images.logo} alt="логотип" className="header__logo" />
        <nav className="header__navigation_right">
          <CustomLink
            linkTo="/signup"
            textLink="Регистрация"
            option="normal"
          />
          <CustomLink
            linkTo="/signin"
            textLink="Войти"
            option="rect"
          />
        </nav>
      </div>
    </header>
  );
}
export default Header;