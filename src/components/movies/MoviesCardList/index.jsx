import MoviesCard from "../MoviesCard";
import "./style.scss";

export default function MoviesCardList({
  cards = [], 
  // option = "", 
  // savedMovies = [], 
  // handleLikeVideo = null, 
  // handleDislikeVideo = null
}) {
  return (
    <section aria-label="Раздел с карточками фильмов" className="cards">
      <ul className="cards__list">
        {cards.map((card) => (
          <MoviesCard
            key={card}
            card={card}
            // option={option}
            // savedMovies={savedMovies}
            // handleLikeVideo={handleLikeVideo}
            // handleDislikeVideo={handleDislikeVideo}
          />
        ))}
      </ul>
    </section>
  );
}
