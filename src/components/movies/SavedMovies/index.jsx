import SearchForm from '../../movies/SearchForm';
import MoviesCardList from "../MoviesCardList";
import "./style.scss";
import CustomButton from "../../common/CustomButton";
import Preloader from "../Preloader";
import { useState, useEffect } from 'react';
import { usePagination } from "../../../hooks/usePagination";
import Header from '../../header/Header';
import Footer from '../../common/Footer';

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
  const [cardsFinded, setCardsFinded] = useState([]);
  const [cardsFindedVisible, setCardsFindedVisible] = useState([]);
  const [isPreloaderVisible, setIsPreloaderVisible] = useState(false);
  const [isSuccessfulSearch, setIsSuccessfulSearch] = useState(true);
  const [isToggleSwitch, setIsToggleSwitch] = useState(false);
  const [isSubmit, setIsSubmit] = useState(true);
  const [searchText, setSearchText] = useState("");


  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line 
  }, [savedMovies])

  const handleSearch = (() => {
    const _arg1Filter = ((itemName, searchText) => {
      return !!searchText ? itemName.toLowerCase().includes(searchText.toLowerCase()) : true
    });
    const _arg2Filter = ((duration) => {
      return isToggleSwitch ? duration <= 40 : true
    });
    setCardsFinded(savedMovies.filter(
      (item) => {
        return _arg1Filter(item.nameRU, searchText)
          && _arg2Filter(item.duration)
      }
    ));
  });

  const handleButtonMore = () => {
    setCardsCountVisible(cardsCountVisible + pagination);
  }

  useEffect(() => {
    setIsSuccessfulSearch(true);
    handleSearch();
    setIsPreloaderVisible(false);
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
    <>
      <Header loggedIn={loggedIn} option="saved-movies" />
      <div className="saved-movies">
        <section className="saved-movies__section" aria-label="Сохраненные фильмы">
          <div className="saved-movies__container">
            <SearchForm
              isLoggedIn={true}
              setIsToggleSwitch={setIsToggleSwitch}
              setSearchText={setSearchText}
              isToggleSwitch={isToggleSwitch}
              setIsPreloaderVisible={setIsPreloaderVisible}
              setIsSubmit={setIsSubmit}
              isSubmit={isSubmit}

              requiredSearchInput={false}
            />
            {
              isPreloaderVisible ?
                <Preloader />
                :
                !isSuccessfulSearch ?
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
