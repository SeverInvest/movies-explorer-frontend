// import listProjects from '../../../utils/list-projects';
// import SearchForm from '../../movies/SearchForm';
import MoviesCard from "../MoviesCard";


import "./style.scss";

export default function MoviesCardList({
  cards, isVisibleButton, option
}) {



  return (
    <section aria-label="Раздел с карточками фильмов" className="cards">
      <ul className={`cards__list ${isVisibleButton ? "cards__list_visible" : "cards__list_unvisible"}`}>
        {cards.map((card) => (
          <MoviesCard
            key={card._id}
            card={card}
            option={option}
          // onCardClick={onCardClick}
          // onCardLike={onCardLike}
          // onCardDeleteConfirm={onCardDeleteConfirm}
          />
        ))}
      </ul>

    </section>
  );
}
