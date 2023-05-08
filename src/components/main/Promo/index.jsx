import images from '../../../images';
import "./style.scss"

export default function Promo() {
  return (
    <section className="promo_bg">
      <div className="promo">
        <div>
          <h1 className="promo__name-project">
            Учебный проект студента факультета Веб-разработки.
          </h1>
        </div>
        <div className="promo__container">
          <img src={images.pictureMain} className="promo__abstraction" alt="абстрактная картинка" />
        </div>
      </div>
    </section>
  );
}
