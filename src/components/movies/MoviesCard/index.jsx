import { useState, useEffect } from 'react';
import "./style.scss";
import CustomLink from '../../common/CustomLink';

export default function MoviesCard({
  card,
  option,
  savedMovies,
  handleSaveMovie = null,
  handleDeleteMovie = null,
}) {

  const getLike = () => savedMovies.some(item => item.movieId === card._id);
  const getMovieId = () => savedMovies.find(item => item.movieId === card._id);
  const [isLike, setIsLike] = useState(getLike());

  useEffect(() => {
    setIsLike(getLike())
    // eslint-disable-next-line
  }, [savedMovies])

  const handleLikeClick = () => {
    if (isLike) {
      handleDeleteMovie(getMovieId()._id);
      setIsLike(false);

    } else {
      handleSaveMovie({
        language: card.language,
        director: card.director,
        duration: card.duration,
        year: card.year,
        description: card.description,
        image: card.image,
        trailerLink: card.trailerLink,
        movieId: card._id,
        name: card.name
      })
      setIsLike(true);
    }
  }

  const handleDeleteClick = () => {
    handleDeleteMovie(card._id);
  }

  const secondsToHm = (d) => {
    d = Number(d);
    const h = Math.floor(d / 60);
    const m = Math.floor(d % 60);
    const hDisplay = h > 0 ? h + "ч" : "";
    const mDisplay = m > 0 ? m + "м" : "";
    return hDisplay + " " + mDisplay;
  }

  const cardLikeClassName = `card__button card__button_heart ${isLike ? "card__button_heart_active" : ""}`;

  return (
    <li className="card">
      <div className="card__container">
        <div className="card__info">
          <p className="card__name">{card.name}</p>
          <p className="card__duration">{secondsToHm(card.duration)}</p>
        </div>
        {
          option === "movies" ?
            <button className={cardLikeClassName} type="button" aria-label="Лайк" onClick={handleLikeClick} />
            :
            <button className="card__button card__button_delete" type="button" aria-label="Удалить фильм" onClick={handleDeleteClick} />
        }
      </div>
      <CustomLink
        linkTo={card.trailerLink}
        textLink=""
        className="card__link-img"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          className="card__photo"
          src={card.image}
          alt={card.name} />
      </CustomLink>
    </li >
  );
}
