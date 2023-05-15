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
// import mainApi from "../../../utils/MainApi";

export default function SavedMovies({
  loggedIn,
  handleGetSavedMovies,
  savedMovies
}) {
  const { pagination } = usePagination();

  const [isVisibleButton, setIsVisibleButton] = useState(false);
  const [cardsCount, setCardsCount] = useState(0);
  const [cardsCountVisible, setCardsCountVisible] = useState(pagination);
  const [cardsFinded, setCardsFinded] = useState([]);
  const [cardsFindedVisible, setCardsFindedVisible] = useState([]);
  const [isPreloaderVisible, setIsPreloaderVisible] = useState(false);
  const [isSuccessfulSearch, setIsSuccessfulSearch] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(false);
  const [isToggleSwitch, setIsToggleSwitch] = useState(false);
  const [isSubmit, setIsSubmit] = useState(true);
  const [searchText, setSearchText] = useState("");
  // const [savedCards, setSavedCards] = useState([]);
  const [errorMessageMovies, setErrorMessgeMovies] = useState("");

  useEffect(() => {
    handleGetSavedMovies()
  }, [])

  // async function getSavedCards() {
  //   try {
  //     setIsPreloaderVisible(true);
  //     setErrorMessgeMovies("");
  //     const data = await mainApi.getAllSavedMovies();
  //     setSavedCards(data);
  //     setIsPreloaderVisible(false);
  //   } catch (error) {
  //     console.log(error);
  //     setIsPreloaderVisible(false);
  //     setErrorMessgeMovies(error.message);
  //   }
  // };

  const handleSearch = (() => {
    const _arg1Filter = ((itemName, searchText) => {
      return searchText ? itemName.toLowerCase().includes(searchText.toLowerCase()) : true
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
    setIsPreloaderVisible(false);
  });

  const handleButtonMore = () => {
    setCardsCountVisible(cardsCountVisible + pagination);
  }

  // const handleSubmit = ((data) => {
  //   setSearchText(data.name);
  //   setIsPreloaderVisible(true);
  //   setIsSubmit(!isSubmit);
  //   setIsFirstLoad(false)
  // });

  // const handleToggleSwitch = ((data) => {
  //   setSearchText(data.name);
  //   setIsToggleSwitch(!isToggleSwitch);
  // });

  useEffect(() => {

    handleSearch();

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
              !isSuccessfulSearch &&
              <p className="saved-movies__unsuccess-search"> Ничего не найдено </p>
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
              option="saved-movies"
              cards={cardsFindedVisible}
              isVisibleButton={isVisibleButton}
            />
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
