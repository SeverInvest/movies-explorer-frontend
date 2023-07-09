import SearchForm from '../SearchForm';
import MoviesCardList from "../MoviesCardList";
import "./style.scss";
import CustomButton from "../../common/CustomButton";
import Preloader from "../Preloader";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { usePagination } from "../../../hooks/usePagination";
import Header from '../../header/Header';
import Footer from '../../common/Footer';
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { DURATION_FILM } from "../../../utils/constants";
import { fetchVideos } from "../../../services/fetch";

export default function Movies() {

  const dispatch = useDispatch();
  const videos = useSelector(state => state.videos.videos);
  const videosKeys = useSelector(state => state.videos.keys);
  const videosCountKeys = useSelector(state => state.videos.countKeys);
  const videosIsLoading = useSelector(state => state.videos.isLoading);
  const videosError = useSelector(state => state.videos.error);
  // const isLogggedIn = useSelector(state => state.user.isLogggedIn);

  const { pagination } = usePagination();

  const [cardsCount, setCardsCount] = useLocalStorage("cardsCount", 0);
  const [cardsCountVisible, setCardsCountVisible] = useLocalStorage("cardsCountVisible", pagination);
  const [cardsFinded, setCardsFinded] = useLocalStorage("cardsFinded", []);
  const [cardsFindedVisible, setCardsFindedVisible] = useLocalStorage("cardsFindedVisible", []);
  const [searchText, setSearchText] = useLocalStorage("searchText", "");
  const [searchToggle, setSearchToggle] = useLocalStorage("searchToggle", false);
  const [isVisibleButton, setIsVisibleButton] = useLocalStorage("isVisibleButton", false);

  useEffect(() => {
    fetchVideos(dispatch);
  }, [dispatch]);

  function handleSearch(search = "", isToggle = false) {
    const _arg1Filter = (key) => {
      return !!search ? videos[key].nameVideo.toLowerCase().includes(search.toLowerCase()) : false
    };
    const _arg2Filter = (key) => {
      return isToggle ? videos[key].duration <= DURATION_FILM : true;
    };
    if (search === "") {
      setCardsFinded(videosKeys.filter(
        (key) => {
          return _arg2Filter(key)
        }
      ));
    } else {
      setCardsFinded(videosKeys.filter(
        (key) => {
          return _arg1Filter(key)
            && _arg2Filter(key)
        }
      ));
    };
  };

  useEffect(() => { handleSearch() }, []);

  const handleButtonMore = () => {
    setCardsCountVisible(cardsCountVisible + pagination);
  }

  function onSearch(search, isToggle) {
    setSearchText(search);
    setSearchToggle(isToggle);
    handleSearch(search, isToggle, videos);
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
      <Header option="movies" />
      <div className="movies">
        <section className="movies__section" aria-label="Фильмы">
          <div className="movies__container">
            <SearchForm
              // disabledToggle={videosCountKeys === 0}
              onSearch={onSearch}
              initialValues={{ search: searchText, isToggle: searchToggle }}

            />
            {
              videosIsLoading &&
              <Preloader />
            }
            {
              (cardsCount === 0 && videosCountKeys !== 0) ?
                <p className="movies__unsuccess-search"> Ничего не найдено </p>
                :
                !!videosError ?
                  <p className="movies__unsuccess-search">
                    Во время запроса произошла ошибка. Возможно, проблема с
                    соединением или сервер недоступен. Подождите немного и
                    попробуйте ещё раз
                  </p>
                  :
                  <MoviesCardList
                    // option="movies"
                    cards={cardsFindedVisible}
                    // savedMovies={savedMovies}
                    // handleLikeVideo={handleLikeVideo}
                    // handleDislikeVideo={handleDislikeVideo}
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
