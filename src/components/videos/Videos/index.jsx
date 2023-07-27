import SearchForm from '../SearchForm';
import VideosCardList from "../VideosCardList";
import "./style.scss";
import CustomButton from "../../common/CustomButton";
import Preloader from "../../common/Preloader";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { usePagination } from "../../../hooks/usePagination";
import Header from '../../header/Header';
import Footer from '../../common/Footer';
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { CONSTANTS } from "../../../utils";
import { fetchVideosAndUsers } from "../../../services/fetch";
import PopupForm from "../PopupForm";
import PopupAlarm from "../../common/PopupAlarm";
import { actionVisiblePopupForm } from "../../../store/slices/popupSlice";
import { durationToMinutes } from "../../../utils";
import { removeVideo } from "../../../services/fetch";

export default function Videos() {

  const dispatch = useDispatch();
  const videos = useSelector(state => state.videos.videos); // все видео
  const videosKeys = useSelector(state => state.videos.keys); // id всех видео
  const videosCountKeys = useSelector(state => state.videos.countKeys); //количество видео всего в БД
  const videosIsLoading = useSelector(state => state.videos.isLoading); // загрузка (включение прелоадера)
  const videosError = useSelector(state => state.videos.error); // ошибка при импорте из БД

  const userVideos = useSelector(state => state.user.videos); // все избранные видео текущего пользователя

  const isVisiblePopupForm = useSelector(state => state.popup.isVisiblePopupForm);
  const isVisiblePopupAlarm = useSelector(state => state.popup.isVisiblePopupAlarm);
  const messageAlarm = useSelector(state => state.popup.messageAlarm);

  const { pagination } = usePagination();

  const [cardsCount, setCardsCount] = useLocalStorage("cardsCount", 0); // количество найденных видео
  const [cardsCountVisible, setCardsCountVisible] = useLocalStorage("cardsCountVisible", pagination); //кол-во отображаемых видео на экране
  const [cardsFinded, setCardsFinded] = useLocalStorage("cardsFinded", []); // массив найденных видео
  const [cardsFindedVisible, setCardsFindedVisible] = useLocalStorage("cardsFindedVisible", []); // массив отображаемых видео на экране
  const [searchText, setSearchText] = useLocalStorage("searchText", "");
  const [searchToggleDuration, setSearchToggleDuration] = useLocalStorage("searchToggleDuration", false); // переключатель длительности 
  const [searchToggleLike, setSearchToggleLike] = useLocalStorage("searchToggleLike", false); // переключатель избранного
  const [isVisibleButton, setIsVisibleButton] = useLocalStorage("isVisibleButton", false); // кнопка "Ещё"

  async function handleSearch(search = searchText, isToggleDuration = searchToggleDuration, isToggleLike = searchToggleLike) {
    const _arg1Filter = (key) => {
      return !!search ? videos[key].nameVideo.toLowerCase().includes(search.toLowerCase()) : false
    };
    const _arg2Filter = (key) => {
      return isToggleDuration ? durationToMinutes(videos[key].duration) <= CONSTANTS.DURATION_FILM : true;
    };
    const _arg3Filter = (key) => {
      return isToggleLike ? userVideos.includes(key) : true;
    }
    if (search === "") {
      setCardsFinded(videosKeys.filter(
        (key) => {
          return _arg2Filter(key) && _arg3Filter(key);
        }
      ).sort((a, b) => {
        if (videos[a].publishedAtYoutube > videos[b].publishedAtYoutube) { return -1 };
        return 1;
      }));
    } else {
      setCardsFinded(videosKeys.filter(
        (key) => {
          return _arg1Filter(key)
            && _arg2Filter(key)
            && _arg3Filter(key);
        }
      ).sort((a, b) => {
        if (videos[a].publishedAtYoutube > videos[b].publishedAtYoutube) { return -1 };
        return 1;
      }));
    };
  };


  function handleDeleteVideo(card) {
    (async () => {
      await setCardsFinded(cardsFinded.filter((x) => x !== card));
      await setCardsCount(cardsCount - 1);
      await removeVideo(dispatch, card);
    }
    )();
  };

  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line
  }, [videos])

  const handleButtonMore = () => {
    setCardsCountVisible(cardsCountVisible + pagination);
  }

  function onSearch(search, isToggleDuration, isToggleLike) {
    setSearchText(search);
    setSearchToggleDuration(isToggleDuration);
    setSearchToggleLike(isToggleLike);
    handleSearch(search, isToggleDuration, isToggleLike);
  }

  function openPopup() {
    dispatch(actionVisiblePopupForm());
  }

  function updateListVideos() {
    (async () => {
      await fetchVideosAndUsers(dispatch);
      await handleSearch();
    }
    )();
  }

  // регулирует пагинацию
  useEffect(() => {
    setCardsCount(cardsFinded.length);
    setCardsCountVisible(pagination);
    // eslint-disable-next-line
  }, [cardsFinded, pagination]);

  // показывает/убирает кнопку "Еще"
  useEffect(() => {
    if (cardsCount <= cardsCountVisible) {
      setIsVisibleButton(false)
    } else {
      setIsVisibleButton(true)
    }
    // eslint-disable-next-line
  }, [cardsCount, cardsCountVisible, pagination]);

  // регулирует: сколько карточек нужно показывать.
  useEffect(() => {
    setCardsFindedVisible(cardsFinded.slice(0, cardsCountVisible));
    // eslint-disable-next-line
  }, [cardsCountVisible, cardsFinded]);

  return (
    <>
      <Header option="videos" />
      <div className="videos">
        {isVisiblePopupForm &&
          <PopupForm />
        }
        {isVisiblePopupAlarm &&
          <PopupAlarm
            success={videosError === ""}
            messageText={messageAlarm}
          />
        }
        <section className="videos__section" aria-label="">
          <div className="videos__container">
            <div className="videos__buttons">
              <CustomButton
                type="button"
                className="videos__button-open-popup"
                onClick={openPopup}
                aria-label="добавить"
                text={"Добавить"}
              />
              <CustomButton
                type="button"
                className="videos__button-open-popup"
                onClick={updateListVideos}
                aria-label="обновить"
                text={"Обновить"}
              />
            </div>
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
                <p className="videos__unsuccess-search"> Ничего не найдено </p>
                :
                !!videosError ?
                  <p className="videos__unsuccess-search">
                    Во время запроса произошла ошибка. Возможно, проблема с
                    соединением или сервер недоступен. Подождите немного и
                    попробуйте ещё раз
                  </p>
                  :
                  <VideosCardList
                    cards={cardsFindedVisible}
                    handleDeleteVideo={handleDeleteVideo}
                  />
            }
            {isVisibleButton &&
              <CustomButton
                type="button"
                text="Ещё"
                className="videos__more-button"
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
