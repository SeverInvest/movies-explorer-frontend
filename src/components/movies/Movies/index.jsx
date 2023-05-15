// import listProjects from '../../../utils/list-projects';
import SearchForm from '../../movies/SearchForm';
import MoviesCardList from "../MoviesCardList";
// import cards from "../../../utils/cards";
import "./style.scss";
import CustomButton from "../../common/CustomButton";
import Preloader from "../Preloader";
import { useState, useEffect } from 'react';
import { usePagination } from "../../../hooks/usePagination";
import Header from '../../header/Header';
import Footer from '../../common/Footer';
// import moviesApi from "../../../utils/MoviesApi";

export default function Movies({ 
  loggedIn = false, 
  // handleGetSavedMovies, 
  savedMovies = [], 
  handleSaveMovie = null,
  handleDeleteMovie = null,
  errorMessageMovies = "",
  isGetInfoFromBD = false,
  movies = [],
  handleGetMovies = null,
  isFirstLoad = true,
  setIsFirstLoad = null,
  isPreloaderVisible = false,
  setIsPreloaderVisible = null,

 }) {
  const { pagination } = usePagination();
  const [isVisibleButton, setIsVisibleButton] = useState(false);
  const [cardsCount, setCardsCount] = useState(0);
  const [cardsCountVisible, setCardsCountVisible] = useState(pagination);
  const [cardsFinded, setCardsFinded] = useState([]);
  const [cardsFindedVisible, setCardsFindedVisible] = useState([]);
  // const [isPreloaderVisible, setIsPreloaderVisible] = useState(false);
  const [isSuccessfulSearch, setIsSuccessfulSearch] = useState(true);
  // const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isToggleSwitch, setIsToggleSwitch] = useState(false);
  const [isSubmit, setIsSubmit] = useState(true);
  const [searchText, setSearchText] = useState("");
  // const [cards, setCards] = useState([]);
  // const [isGetInfoFromBD, setIsGetInfoFromBD] = useState(false);
  // const [errorMessageMovies, setErrorMessgeMovies] = useState("");

  function handleSearch() {
    function _arg1Filter(itemName, searchText) {
      return itemName.toLowerCase().includes(searchText.toLowerCase());
    };
    function _arg2Filter(duration) {
      return isToggleSwitch ? duration <= 40 : true;
    };
    setCardsFinded(movies.filter(
      (item) => {
        return _arg1Filter(item.nameRU, searchText)
          && _arg2Filter(item.duration)
      }
    ));
    setIsPreloaderVisible(false);
  };

  const handleButtonMore = () => {
    setCardsCountVisible(cardsCountVisible + pagination);
  }

  useEffect(() => {
    setIsSubmit(!isSubmit);
    // eslint-disable-next-line
  }, [isGetInfoFromBD])

  useEffect(() => {
    if (!isFirstLoad) {
      handleGetMovies()
    };
    // eslint-disable-next-line
  }, [isFirstLoad])

  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line
  }, [isSubmit, isToggleSwitch])


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
      <Header loggedIn={loggedIn} option="movies" />
      <div className="movies">
        <section className="movies__section" aria-label="Фильмы">
          <div className="movies__container">
            <SearchForm
              setIsFirstLoad={setIsFirstLoad}
              setIsToggleSwitch={setIsToggleSwitch}
              setSearchText={setSearchText}
              isToggleSwitch={isToggleSwitch}
              setIsPreloaderVisible={setIsPreloaderVisible}
              isFirstLoad={isFirstLoad}
              setIsSubmit={setIsSubmit}
              isSubmit={isSubmit}
              isLoggedIn={true}
            />
            {
              isPreloaderVisible &&
              <Preloader />
            }
            {
              !isSuccessfulSearch && !isFirstLoad &&
              <p className="movies__unsuccess-search"> Ничего не найдено </p>
            }
            {
              !!errorMessageMovies &&
              <p className="movies__unsuccess-search">
                Во время запроса произошла ошибка. Возможно, проблема с
                соединением или сервер недоступен. Подождите немного и
                попробуйте ещё раз
              </p>
            }
            <MoviesCardList
              option="movies"
              cards={cardsFindedVisible}
              savedMovies={savedMovies}
              handleSaveMovie={handleSaveMovie}
              handleDeleteMovie={handleDeleteMovie}
            // isVisibleButton={isVisibleButton}
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
    </>
  );
}
