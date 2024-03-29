import "./style.scss";
import CustomLink from "../../common/CustomLink";
import CustomButton from "../../common/CustomButton";
import HeaderVideos from "../../header/HeaderVideos";
import HeaderUsers from "../../header/HeaderUsers";
import HeaderHabr from "../../header/HeaderHabr";
import HeaderAccount from "../../header/HeaderAccount";
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
    <section className={`side-bar ${isOpen ? "side-bar_visible" : ""}`} onClick={clickPass} aria-label="Боковое меню">
      <nav className="side-bar__menu">
        <CustomButton
          type="button"
          className="side-bar__button-close"
          onClick={onClose}
          aria-label="убрать сайдбар"
        >
          <img src={images.buttonClose} alt="убрать сайдбар" className="side-bar__icon-close" />
        </CustomButton>
        <div className="side-bar__group-menu">
          {(option === "main") ?
            <p className="side-bar__text"> Главная </p>
            :
            <CustomLink
              className="side-bar__link"
              linkTo="/"
              textLink="Главная"
              onClick={onClose}
            />
          }
          <HeaderVideos option={option} sideBar={true} onClick={onClose} />
          <HeaderUsers option={option} sideBar={true} onClick={onClose} />
          <HeaderHabr option={option} sideBar={true} onClick={onClose} />
        </div>
        <HeaderAccount onClick={onClose} />
      </nav>
    </section>
  );
}
