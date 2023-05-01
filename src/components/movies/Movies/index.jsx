// import listProjects from '../../../utils/list-projects';
import SearchForm from '../../movies/SearchForm';
import MoviesCardList from "../MoviesCardList";
import cards from "../../../utils/cards";
import "./style.scss";
import CustomButton from "../../common/CustomButton";
import Preloader from "../Preloader";
import { useState, useEffect } from 'react';


export default function Movies() {
  const [pagination, setPagination] = useState(7);
  const [isVisibleButton, setIsVisibleButton] = useState(false);
  const [cardsCount, setCardsCount] = useState(0);
  const [cardsCountVisible, setCardsCountVisible] = useState(pagination);
  const [cardsFinded, setCardsFinded] = useState([]);
  const [cardsFindedVisible, setCardsFindedVisible] = useState([]);
  const [isPreloaderVisible, setIsPreloaderVisible] = useState(false);

  const onSubmit = ((data) => {
    setIsPreloaderVisible(true);
    setCardsFinded(cards.filter((item) => item.nameRU.includes(data.name)));
    setIsPreloaderVisible(false);
  });

  useEffect(() => {
    setCardsCount(cardsFinded.length);
    setCardsCountVisible(pagination);
  }, [cardsFinded, pagination]);

  useEffect(() => {
    if (cardsCount <= pagination || cardsCount <= cardsCountVisible) {
      setIsVisibleButton(false)
    } else {
      setIsVisibleButton(true)
    }
  }, [cardsCount, cardsCountVisible, pagination]);

  const handleButtonMore = () => {
    setCardsCountVisible(cardsCountVisible + pagination);
  }

  useEffect(() => {
    setCardsFindedVisible(cardsFinded.slice(0, cardsCountVisible));
  }, [cardsCountVisible, cardsFinded]);

  console.log("cardsCount", cardsCount);
  console.log("cardsCountVisible", cardsCountVisible);

  return (
    <section className="movies_bg">
      <div className="movies">
        {
        isPreloaderVisible &&
        <Preloader />
        }
        <SearchForm
          onSubmit={onSubmit}
          isLoggedIn={true}
        />
        <MoviesCardList cards={cardsFindedVisible} />
        {isVisibleButton &&
          <CustomButton
            type="button"
            text="Ещё"
            option="more"
            onClick={handleButtonMore}
          />
        }
      </div>
    </section>
  );
}
