import SearchForm from '../SearchForm';
import MoviesCardList from "../MoviesCardList";
import "./style.scss";
import CustomButton from "../../common/CustomButton";
import Preloader from "../Preloader";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { usePagination } from "../../../hooks/usePagination";
import Header from '../../header/Header';
import Footer from '../../common/Footer';
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { DURATION_FILM } from "../../../utils/constants";
import { fetchVideos } from "../../../services/fetch";

export default function Movies() {

  const dispatch = useDispatch();
  const videos = useSelector(state => state.videos.videos); // массив всех видео
  const videosKeys = useSelector(state => state.videos.keys); // id всех видео
  const videosCountKeys = useSelector(state => state.videos.countKeys); //количество видео всего в БД
  const videosIsLoading = useSelector(state => state.videos.isLoading); // загрузка (включение прелоадера)
  const videosError = useSelector(state => state.videos.error); // ошибка при импорте из БД
  const videosIsImported = useSelector(state => state.videos.isImported); // импорт из БД завершен.
  const userVideos = useSelector(state => state.user.videos); // все избранные видео текущего пользователя

  const { pagination } = usePagination();

  const [cardsCount, setCardsCount] = useLocalStorage("cardsCount", 0); // количество найденных видео
  const [cardsCountVisible, setCardsCountVisible] = useLocalStorage("cardsCountVisible", pagination); //кол-во отображаемых видео на экране
  const [cardsFinded, setCardsFinded] = useLocalStorage("cardsFinded", []); // массив найденных видео
  const [cardsFindedVisible, setCardsFindedVisible] = useLocalStorage("cardsFindedVisible", []); // массив отображаемых видео на экране
  const [searchText, setSearchText] = useLocalStorage("searchText", "");
  const [searchToggleDuration, setSearchToggleDuration] = useLocalStorage("searchToggleDuration", false); // переключатель длительности 
  const [searchToggleLike, setSearchToggleLike] = useLocalStorage("searchToggleLike", false); // переключатель избранного
  const [isVisibleButton, setIsVisibleButton] = useLocalStorage("isVisibleButton", false); // кнопка "Ещё"

  useEffect(() => {
    if (videosCountKeys === 0) {
      fetchVideos(dispatch);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (videosIsImported) {
      handleSearch(searchText, searchToggleDuration, searchToggleLike);
    };
    // eslint-disable-next-line
  }, [videosIsImported]);


  async function handleSearch(search = "", isToggleDuration = false, isToggleLike = false) {
    const _arg1Filter = (key) => {
      return !!search ? videos[key].nameVideo.toLowerCase().includes(search.toLowerCase()) : false
    };
    const _arg2Filter = (key) => {
      return isToggleDuration ? videos[key].duration <= DURATION_FILM : true;
    };
    const _arg3Filter = (key) => {
      return isToggleLike ? userVideos.includes(key) : true;
    }
    if (search === "") {
      setCardsFinded(videosKeys.filter(
        (key) => {
          return _arg2Filter(key) && _arg3Filter(key);
        }
      ));
    } else {
      setCardsFinded(videosKeys.filter(
        (key) => {
          return _arg1Filter(key)
            && _arg2Filter(key)
            && _arg3Filter(key);
        }
      ));
    };
  };

  const handleButtonMore = () => {
    setCardsCountVisible(cardsCountVisible + pagination);
  }

  function onSearch(search, isToggleDuration, isToggleLike) {
    setSearchText(search);
    setSearchToggleDuration(isToggleDuration);
    setSearchToggleLike(isToggleLike);
    handleSearch(search, isToggleDuration, isToggleLike, videos);
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
              onSearch={onSearch}
              initialValues={{
                search: searchText,
                isToggleDuration: searchToggleDuration,
                isToggleLike: searchToggleLike,
              }}

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
                    cards={cardsFindedVisible}
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
