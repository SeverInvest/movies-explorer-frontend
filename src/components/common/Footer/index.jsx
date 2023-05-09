import "./style.scss";
import CustomLink from "../../common/CustomLink"

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__section">
        <div className="footer__group-header">
          <p className="footer__text">
            Учебный проект Яндекс.Практикум х BeatFilm.
          </p>
        </div>
        <div className="footer__group-footer">
          <p className="footer__year">
            &copy; {new Date().getFullYear()}
          </p>
          <ul className="footer__list-links">
            <li>
              <CustomLink
                linkTo="https://practicum.yandex.ru/"
                textLink="Яндекс.Практикум"
                className="footer__link"
                target="_blank"
                rel="noopener noreferrer"
              />
            </li>
            <li>
              <CustomLink
                linkTo="https://github.com/"
                textLink="Github"
                className="footer__link"
                target="_blank"
                rel="noopener noreferrer"
              />
            </li>
          </ul>
        </div>
      </div>
    </footer >
  );
}
