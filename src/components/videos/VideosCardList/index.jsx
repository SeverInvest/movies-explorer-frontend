import VideosCard from "../VideosCard";
import "./style.scss";

export default function VideosCardList({
  cards = [],
  handleDeleteVideo=null,
}) {
  return (
    <section aria-label="Раздел с карточками фильмов" className="cards">
      <ul className="cards__list">
        {!!cards && cards.map((card) => (
          <VideosCard
            key={card}
            card={card}
            handleDeleteVideo={handleDeleteVideo}
          />
        ))}
      </ul>
    </section>
  );
}
