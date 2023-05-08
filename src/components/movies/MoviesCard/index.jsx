import { useState } from 'react';
import "./style.scss";
import CustomLink from '../../common/CustomLink';

export default function MoviesCard({
  card,
  option,
}) {

  const [isLike, setIsLike] = useState(false);

  const handleLikeClick = () => {
    if (isLike) {
      setIsLike(false);
    } else {
      setIsLike(true);
    }
  }

  const handleDeleteClick = () => {

  }


  const secondsToHm = (d) => {
    d = Number(d);
    const h = Math.floor(d / 60);
    const m = Math.floor(d % 60);
    const hDisplay = h > 0 ? h + "ч" : "";
    const mDisplay = m > 0 ? m + "м" : "";
    return hDisplay + " " + mDisplay;
  }

  const cardLikeClassName = `card__button card__button__heart ${isLike ? "card__button__heart_active" : ""}`;

  return (
    <li className="card">
      <div className="card__container">
        <div className="card__container__info">
          <p className="card__name">{card.nameRU}</p>
          <p className="card__duration">{secondsToHm(card.duration)}</p>
        </div>
        {
          option === "movies" ?
            <button className={cardLikeClassName} type="button" aria-label="Лайк" onClick={handleLikeClick} />
            :
            <button className="card__button card__button__delete" type="button" aria-label="Удалить фильм" onClick={handleDeleteClick} />
        }
      </div>
      <CustomLink
        linkTo={card.trailerLink}
        textLink=""
        className="card__link__img"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img className="card__photo" src={card.thumbnail} alt={card.nameRU} />
      </CustomLink>
    </li >
  );
}
