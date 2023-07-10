import MoviesCard from "../MoviesCard";
import "./style.scss";

export default function MoviesCardList({
  cards = [],
}) {
  return (
    <section aria-label="Раздел с карточками фильмов" className="cards">
      <ul className="cards__list">
        {cards.map((card) => (
          <MoviesCard
            key={card}
            card={card}
          />
        ))}
      </ul>
    </section>
  );
}
