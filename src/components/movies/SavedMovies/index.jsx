import SearchForm from '../SearchForm';
import MoviesCardList from "../MoviesCardList";
import "./style.scss";
import CustomButton from "../../common/CustomButton";
import Preloader from "../Preloader";
import { useState, useEffect } from 'react';
import { usePagination } from "../../../hooks/usePagination";
import Header from '../../header/Header';
import Footer from '../../common/Footer';
import { DURATION_FILM } from "../../../utils/constants";

export default function SavedMovies({
  loggedIn = false,
  handleDeleteMovie = null,
  savedMovies = [],
  errorMessageSavedMovies = "",
}) {
  const { pagination } = usePagination();

  const [isVisibleButton, setIsVisibleButton] = useState(false);
  const [cardsCount, setCardsCount] = useState(0);
  const [cardsCountVisible, setCardsCountVisible] = useState(pagination);
  const [cardsFinded, setCardsFinded] = useState(savedMovies);
  const [cardsFindedVisible, setCardsFindedVisible] = useState([]);
  const [isPreloaderVisible, setIsPreloaderVisible] = useState(false);

  function handleSearch(search, isToggle) {
    function _arg1Filter(itemName) {
      return !!search ? itemName.toLowerCase().includes(search.toLowerCase()) : false
    };
    function _arg2Filter(duration) {
      return isToggle ? duration <= DURATION_FILM : true;
    };
    setCardsFinded(savedMovies.filter(
      (item) => {
        return _arg1Filter(item.nameRU)
          && _arg2Filter(item.duration)
      }
    ));
  };

  const handleButtonMore = () => {
    setCardsCountVisible(cardsCountVisible + pagination);
  };

  async function onSearch(search, isToggle) {
    setIsPreloaderVisible(true);
    handleSearch(search, isToggle);
    setIsPreloaderVisible(false);
  };

  useEffect(() => {
    setCardsCount(cardsFinded.length);
    setCardsCountVisible(pagination);
  }, [cardsFinded, pagination]);

  useEffect(() => {
    if (cardsCount <= pagination || cardsCount <= cardsCountVisible) {
      setIsVisibleButton(false)
    } else {
      setIsVisibleButton(true)
    };
  }, [cardsCount, cardsCountVisible, pagination]);

  useEffect(() => {
    setCardsFindedVisible(cardsFinded.slice(0, cardsCountVisible));
  }, [cardsCountVisible, cardsFinded]);

  useEffect(() => {
    setCardsFinded(savedMovies);
    // eslint-disable-next-line 
  }, [savedMovies])

  return (
    <>
      <Header loggedIn={loggedIn} option="saved-movies" />
      <div className="saved-movies">
        <section className="saved-movies__section" aria-label="Сохраненные фильмы">
          <div className="saved-movies__container">
            <SearchForm
              onSearch={onSearch}
              isPreloaderVisible={isPreloaderVisible}
            />
            {
              isPreloaderVisible &&
              <Preloader />
            }
            {
              cardsCount === 0 ?
                <p className="saved-movies__unsuccess-search"> Ничего не найдено </p>
                :
                !!errorMessageSavedMovies ?
                  <p className="movies__unsuccess-search">
                    Во время запроса произошла ошибка. Возможно, проблема с
                    соединением или сервер недоступен. Подождите немного и
                    попробуйте ещё раз
                  </p>
                  :
                  <MoviesCardList
                    option="saved-movies"
                    cards={cardsFindedVisible}
                    savedMovies={savedMovies}
                    handleDeleteMovie={handleDeleteMovie}
                  />
            }
            {isVisibleButton &&
              <CustomButton
                type="button"
                text="Ещё"
                className="saved-movies__more-button"
                onClick={handleButtonMore}
              />
            }
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}
