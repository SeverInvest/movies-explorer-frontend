import SearchForm from '../SearchForm';
import MoviesCardList from "../MoviesCardList";
import "./style.scss";
import CustomButton from "../../common/CustomButton";
import Preloader from "../Preloader";
import { useEffect } from 'react';
import { usePagination } from "../../../hooks/usePagination";
import Header from '../../header/Header';
import Footer from '../../common/Footer';
import mainApi from "../../../utils/MainApi";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { DURATION_FILM } from "../../../utils/constants";

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
  const [cardsCount, setCardsCount] = useLocalStorage("cardsCount", 0);
  const [cardsCountVisible, setCardsCountVisible] = useLocalStorage("cardsCountVisible", pagination);
  const [cardsFinded, setCardsFinded] = useLocalStorage("cardsFinded", []);
  const [cardsFindedVisible, setCardsFindedVisible] = useLocalStorage("cardsFindedVisible", []);
  const [searchText, setSearchText] = useLocalStorage("searchText", "");
  const [searchToggle, setSearchToggle] = useLocalStorage("searchToggle", false);
  const [isVisibleButton, setIsVisibleButton] = useLocalStorage("isVisibleButton", false);

  async function handleGetMovies() {
    try {
      setErrorMessageMovies("");
      const newVideos = await mainApi.getAllVideos();
      // const updateMovies = await newVideos.map((item) => {
      //   item.image = `https://api.nomoreparties.co/${item.image}`
      //   item.image.formats.thumbnail.url = `https://api.nomoreparties.co/${item.image.formats.thumbnail.url}`
      //   return { ...item }
      // })
      setMovies(newVideos);
      return (newVideos);
    } catch (error) {
      console.log(error);
      setIsPreloaderVisible(false);
      setErrorMessageMovies(error.message);
    }
  };

  function handleSearch(search, isToggle, info) {
    const _arg1Filter = (itemName) => {
      return !!search ? itemName.toLowerCase().includes(search.toLowerCase()) : false
    };
    function _arg2Filter(duration) {
      return isToggle ? duration <= DURATION_FILM : true;
    };
    setCardsFinded(info.filter(
      (item) => {
        return _arg1Filter(item.name)
          && _arg2Filter(item.duration)
      }
    ));
  };

  const handleButtonMore = () => {
    setCardsCountVisible(cardsCountVisible + pagination);
  }

  async function onSearch(search, isToggle) {
    setIsPreloaderVisible(true);
    setSearchText(search);
    setSearchToggle(isToggle);
    if (movies.length === 0) {
      const info = await handleGetMovies();
      handleSearch(search, isToggle, info);
    } else {
      handleSearch(search, isToggle, movies);
    }
    setIsPreloaderVisible(false);
  }

  useEffect(() => {
    setCardsCount(cardsFinded.length);
    setCardsCountVisible(pagination);
    // eslint-disable-next-line
  }, [cardsFinded, pagination]);

  useEffect(() => {
    if (cardsCount <= cardsCountVisible) {
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

  return (
    <>
      <Header loggedIn={loggedIn} option="movies" />
      <div className="movies">
        <section className="movies__section" aria-label="Фильмы">
          <div className="movies__container">
            <SearchForm
              disabledToggle={movies.length === 0}
              onSearch={onSearch}
              initialValues={{ search: searchText, isToggle: searchToggle }}
              isPreloaderVisible={isPreloaderVisible}
            />
            {
              isPreloaderVisible &&
              <Preloader />
            }
            {
              (cardsCount === 0 && movies.length !== 0) ?
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
