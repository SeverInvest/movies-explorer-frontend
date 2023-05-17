import SearchForm from '../../movies/SearchForm';
import MoviesCardList from "../MoviesCardList";
import "./style.scss";
import CustomButton from "../../common/CustomButton";
import Preloader from "../Preloader";
import { useEffect } from 'react';
import { usePagination } from "../../../hooks/usePagination";
import Header from '../../header/Header';
import Footer from '../../common/Footer';
import moviesApi from "../../../utils/MoviesApi";
import { useLocalStorage } from "../../../hooks/useLocalStorage";

export default function Movies({
  loggedIn = false,
  movies = [],
  savedMovies = [],
  errorMessageMovies = "",
  handleSaveMovie = null,
  handleDeleteMovie = null,
  setErrorMessageMovies = null,
  setMovies = null,

}) {

  const { pagination } = usePagination();

  const [isPreloaderVisible, setIsPreloaderVisible] = useLocalStorage("isPreloaderVisible", false); // прелоадер

  const [isGetInfoFromBD, setIsGetInfoFromBD] = useLocalStorage("isGetInfoFromBD", false); // получена ли информация из БД

  const [cardsCount, setCardsCount] = useLocalStorage("cardsCount", 0);
  const [cardsCountVisible, setCardsCountVisible] = useLocalStorage("cardsCountVisible", pagination);
  const [cardsFinded, setCardsFinded] = useLocalStorage("cardsFinded", []);
  const [cardsFindedVisible, setCardsFindedVisible] = useLocalStorage("cardsFindedVisible", []);
  const [isSuccessfulSearch, setIsSuccessfulSearch] = useLocalStorage("isSuccessfulSearch", true);
  const [isToggleSwitch, setIsToggleSwitch] = useLocalStorage("isToggleSwitch", false);
  const [isSubmit, setIsSubmit] = useLocalStorage("isSubmit", true);
  const [searchText, setSearchText] = useLocalStorage("searchText", "");

  const [isVisibleButton, setIsVisibleButton] = useLocalStorage("isVisibleButton", false);
  async function handleGetMovies() {
    try {
      setErrorMessageMovies("");
      const movies = await moviesApi.getAllMovies();
      const updateMovies = movies.map((item) => {
        item.image.url = `https://api.nomoreparties.co/${item.image.url}`
        item.image.formats.thumbnail.url = `https://api.nomoreparties.co/${item.image.formats.thumbnail.url}`
        return { ...item }
      })
      setMovies(updateMovies);
      setIsSubmit(!isSubmit);
    } catch (error) {
      console.log(error);
      setIsGetInfoFromBD(false);
      setIsPreloaderVisible(false);
      setErrorMessageMovies(error.message);
    }
  };

  function handleSearch() {
    function _arg1Filter(itemName) {
      return !!searchText ? itemName.toLowerCase().includes(searchText.toLowerCase()) : false
    };
    function _arg2Filter(duration) {
      return isToggleSwitch ? duration <= 40 : true;
    };
    setCardsFinded(movies.filter(
      (item) => {
        return _arg1Filter(item.nameRU)
          && _arg2Filter(item.duration)
      }
    ));
  };

  const handleButtonMore = () => {
    setCardsCountVisible(cardsCountVisible + pagination);
  }

  useEffect(() => {
    if (!!movies.length) {
      setIsSuccessfulSearch(true);
      handleSearch();
      setIsPreloaderVisible(false);
    }
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
    // eslint-disable-next-line
  }, [cardsFinded, pagination]);

  useEffect(() => {
    if (cardsCount <= pagination || cardsCount <= cardsCountVisible) {
      setIsVisibleButton(false)
    } else {
      setIsVisibleButton(true)
    }
    // eslint-disable-next-line
  }, [cardsCount, cardsCountVisible, pagination]);

  useEffect(() => {
    setCardsFindedVisible(cardsFinded.slice(0, cardsCountVisible));
    // eslint-disable-next-line
  }, [cardsCountVisible, cardsFinded]);

  useEffect(() => {
    if (isGetInfoFromBD) {
      handleGetMovies();
    }
    // eslint-disable-next-line
  }, [isGetInfoFromBD])

  return (
    <>
      <Header loggedIn={loggedIn} option="movies" />
      <div className="movies">
        <section className="movies__section" aria-label="Фильмы">
          <div className="movies__container">
            <SearchForm
              option="movies"
              isGetInfoFromBD={isGetInfoFromBD}
              setIsGetInfoFromBD={setIsGetInfoFromBD}
              setIsToggleSwitch={setIsToggleSwitch}
              setSearchText={setSearchText}
              isToggleSwitch={isToggleSwitch}
              setIsPreloaderVisible={setIsPreloaderVisible}
              setIsSubmit={setIsSubmit}
              isSubmit={isSubmit}
              isLoggedIn={true}
              requiredSearchInput={true}
              handleGetMovies={handleGetMovies}
              initialValues={{ search: searchText }}
            />
            {
              isPreloaderVisible ?
                <Preloader />
                :
                (!isSuccessfulSearch && !movies.length) ?
                  <p className="movies__unsuccess-search"> Ничего не найдено </p>
                  :
                  !!errorMessageMovies ?
                    <p className="movies__unsuccess-search">
                      Во время запроса произошла ошибка. Возможно, проблема с
                      соединением или сервер недоступен. Подождите немного и
                      попробуйте ещё раз
                    </p>
                    :

                    <MoviesCardList
                      option="movies"
                      cards={cardsFindedVisible}
                      savedMovies={savedMovies}
                      handleSaveMovie={handleSaveMovie}
                      handleDeleteMovie={handleDeleteMovie}
                    />
            }
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
