import MoviesCard from "../MoviesCard";
import "./style.scss";

export default function MoviesCardList({
  cards, isVisibleButton, option
}) {

  return (
    <section aria-label="Раздел с карточками фильмов" className="cards">
      <ul className="cards__list">
        {cards.map((card) => (
          <MoviesCard
            key={card._id}
            card={card}
            option={option}
          />
        ))}
      </ul>
    </section>
  );
}
