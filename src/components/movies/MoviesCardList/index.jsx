import MoviesCard from "../MoviesCard";
import "./style.scss";

export default function MoviesCardList({
  cards = [], 
  option = "", 
  savedMovies = [], 
  handleSaveMovie = null, 
  handleDeleteMovie = null
}) {
  return (
    <section aria-label="Раздел с карточками фильмов" className="cards">
      <ul className="cards__list">
        {cards.map((card) => (
          <MoviesCard
            // key={option==="movies" ? card.id : card._id}
            key={card._id}
            card={card}
            option={option}
            savedMovies={savedMovies}
            handleSaveMovie={handleSaveMovie}
            handleDeleteMovie={handleDeleteMovie}
          />
        ))}
      </ul>
    </section>
  );
}
