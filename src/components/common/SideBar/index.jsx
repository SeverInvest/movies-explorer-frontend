import "./style.scss";
import CustomLink from "../../common/CustomLink";
import CustomButton from "../../common/CustomButton";
import HeaderMovies from "../HeaderMovies";
import HeaderSavedMovies from "../HeaderSavedMovies";
import HeaderAccount from "../HeaderAccount";
import images from "../../../images";
import { useEffect } from 'react';


export default function SideBar({
  option = "",
  handleHamburgerOff,
  isOpen,
}) {

  const onClose = (() => {
    handleHamburgerOff();
  })

  function escFunction(evt) {
    if (evt.key === "Escape") {
      onClose()
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", escFunction);
    return () => {
      document.removeEventListener("keydown", escFunction);
    };
    // eslint-disable-next-line
  }, []);

  function clickPass(evt) {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  }

  return (
    <section className={`side-bar ${isOpen ? "side-bar_visible" : ""}`} onClick={clickPass}>
      <nav className="side-bar__menu">
        <CustomButton
          type="button"
          className="side-bar__button-close"
          onClick={onClose}
          aria-label="убрать сайдбар"
        >
          <img src={images.button_close} alt="убрать сайдбар" className="side-bar__icon-close" />
        </CustomButton>
        <div className="side-bar__group-menu">
          <CustomLink
            className="side-bar__link"
            linkTo="/"
            textLink="Главная"
          />
          <HeaderMovies option={option} sideBar={true} onClick={onClose}/>
          <HeaderSavedMovies option={option} sideBar={true} onClick={onClose}/>
        </div>
          <HeaderAccount />
      </nav>
    </section>
  );
}
