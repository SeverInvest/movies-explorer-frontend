import "./style.scss";
import CustomLink from "../../common/CustomLink"

function Footer() {
  return (
    <footer className="footer_bg">
      <div className="footer">
        <div className="footer__header">
          <p className="footer__header__text">
            Учебный проект Яндекс.Практикум х BeatFilm.
          </p>
        </div>

        <div className="footer__footer">
          <p className="footer__footer__year">
            &copy; {new Date().getFullYear()}
          </p>
          <ul className="footer__footer__list-links">
            <li className="footer__footer__link">
              <CustomLink
                linkTo="https://practicum.yandex.ru/"
                textLink="Яндекс.Практикум"
                option="medium-normal"
              />
            </li>
            <li className="footer__footer__link">
              <CustomLink
                linkTo="https://github.com/"
                textLink="Github"
                option="medium-normal"
              />
            </li>
          </ul>
        </div>
      </div>
    </footer >
  );
}
export default Footer;