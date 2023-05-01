import { useState } from 'react';
import "./style.scss";
import CustomLink from '../../common/CustomLink';

export default function MoviesCard({
  card,

}) {

  const [isLike, setIsLike] = useState(false);

  const handleLikeClick = () => {
    if (isLike) {
      setIsLike(false);
    } else {
      setIsLike(true);
    }
  }

  const secondsToHm = (d) => {
    d = Number(d);
    const h = Math.floor(d / 60);
    const m = Math.floor(d % 60);
    const hDisplay = h > 0 ? h + "ч" : "";
    const mDisplay = m > 0 ? m + "м" : "";
    return hDisplay + " " + mDisplay;
  }

  const cardLikeClassName = `card__heart ${isLike ? "card__heart_active" : ""}`;

  return (
    <li className="card">
      <div className="card__container-info">
        <p className="card__name">{card.nameRU}</p>
        <p className="card__duration">{secondsToHm(card.duration)}</p>
        <button className={cardLikeClassName} type="button" aria-label="Лайк" onClick={handleLikeClick} />
      </div>
      <CustomLink
        linkTo={card.trailerLink}
        textLink=""
        className="card__link_img"
        >
        <img className="card__photo" src={card.thumbnail} alt={card.nameRU} />
      </CustomLink>
    </li >
  );
}
