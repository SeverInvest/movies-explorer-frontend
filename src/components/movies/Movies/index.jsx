// import listProjects from '../../../utils/list-projects';
import SearchForm from '../../movies/SearchForm';
import MoviesCardList from "../MoviesCardList";
import cards from "../../../utils/cards";
import "./style.scss";
import CustomButton from "../../common/CustomButton";
import Preloader from "../Preloader";
import { useState, useEffect } from 'react';
import { usePagination } from "../../../hooks/usePagination";
import Footer from '../../common/Footer';

export default function Movies() {
  const { pagination } = usePagination();

  const [isVisibleButton, setIsVisibleButton] = useState(false);
  const [cardsCount, setCardsCount] = useState(0);
  const [cardsCountVisible, setCardsCountVisible] = useState(pagination);
  const [cardsFinded, setCardsFinded] = useState([]);
  const [cardsFindedVisible, setCardsFindedVisible] = useState([]);
  const [isPreloaderVisible, setIsPreloaderVisible] = useState(false);
  const [isSuccessfulSearch, setIsSuccessfulSearch] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isToggleSwitch, setIsToggleSwitch] = useState(false);
  const [isSubmit, setIsSubmit] = useState(true);
  const [searchText, setSearchText] = useState("");

  const handleSearch = (() => {
    const _arg1Filter = ((itemName, searchText) => {
      return searchText ? itemName.toLowerCase().includes(searchText.toLowerCase()) : true
    });
    const _arg2Filter = ((duration) => {
      return isToggleSwitch ? duration <= 40 : true
    });
    setCardsFinded(cards.filter(
      (item) => {
        return _arg1Filter(item.nameRU, searchText)
          && _arg2Filter(item.duration)
      }
    ));
    setIsPreloaderVisible(false);
  });

  const handleButtonMore = () => {
    setCardsCountVisible(cardsCountVisible + pagination);
  }

  const handleSubmit = ((data) => {
    setSearchText(data.name);
    setIsPreloaderVisible(true);
    setIsSubmit(!isSubmit);
    setIsFirstLoad(false)
  });

  const handleToggleSwitch = ((data) => {
    setSearchText(data.name);
    setIsToggleSwitch(!isToggleSwitch);
  });

  useEffect(() => {
    if (!isFirstLoad) {
      handleSearch();
    };
    // eslint-disable-next-line
  }, [isSubmit, isToggleSwitch]);

  useEffect(() => {
    setCardsCount(cardsFinded.length);
    if (cardsFinded.length === 0) {
      setIsSuccessfulSearch(false)
    } else {
      setIsSuccessfulSearch(true)
    }
    setCardsCountVisible(pagination);
  }, [cardsFinded, pagination]);

  useEffect(() => {
    if (cardsCount <= pagination || cardsCount <= cardsCountVisible) {
      setIsVisibleButton(false)
    } else {
      setIsVisibleButton(true)
    }
  }, [cardsCount, cardsCountVisible, pagination]);

  useEffect(() => {
    setCardsFindedVisible(cardsFinded.slice(0, cardsCountVisible));
  }, [cardsCountVisible, cardsFinded]);

  return (
    <div className="movies__common">
    <section className="movies_bg">
      <div className="movies">
        <SearchForm
          handleSubmit={handleSubmit}
          isLoggedIn={true}
          onToggleSwitch={handleToggleSwitch}
        />
        {
          isPreloaderVisible &&
          <Preloader />
        }
        {
          !isSuccessfulSearch && !isFirstLoad &&
          <p className="movies__unsuccess-search"> Ничего не найдено </p>
        }
        <MoviesCardList
          option="movies"
          cards={cardsFindedVisible}
          isVisibleButton={isVisibleButton}
        />
        {isVisibleButton &&
          <CustomButton
            type="button"
            text="Ещё"
            className="movies__more-button"
            onClick={handleButtonMore}
          />
        }
      </div>
    </section>
    <Footer />
    </div>
  );
}
