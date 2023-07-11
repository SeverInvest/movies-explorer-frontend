import "./style.scss";
import CustomLink from '../../common/CustomLink';
import { useDispatch, useSelector } from 'react-redux';
import { setLike, setDisike } from "../../../services/fetch";

export default function MoviesCard({
  card,
}) {

  const dispatch = useDispatch();
  const userVideos = useSelector(state => state.user.videos);
  const videos = useSelector(state => state.videos.videos);
  // const videosLike = useSelector(state => state.videos.videos.users);


  const handleLikeClick = () => {
    if (!userVideos.includes(card)) {
      handleLikeVideo({
        card,
      })
    } else {
      handleDislikeVideo({
        card,
      })
    }
  }

  async function handleLikeVideo({ card }) {
    try {
      setLike(dispatch, card)
    } catch (error) {
      console.log(error.message);
    }
  };

  async function handleDislikeVideo({ card }) {
    try {
      setDisike(dispatch, card)
    } catch (error) {
      console.log(error.message);
    }
  };

  const secondsToHm = (d) => {
    d = Number(d);
    const h = Math.floor(d / 60);
    const m = Math.floor(d % 60);
    const hDisplay = h > 0 ? h + "ч" : "";
    const mDisplay = m > 0 ? m + "м" : "";
    return hDisplay + " " + mDisplay;
  }

  const cardLikeClassName = `card__button card__button_heart ${userVideos.includes(card) ? "card__button_heart_active" : ""}`;

  return (
    <li className="card">
      <div className="card__container">
        <div className="card__info">
          <p className="card__name">{videos[card].nameVideo}</p>
          <p className="card__duration">{secondsToHm(videos[card].duration)}</p>
        </div>
        <div className="card__like-container">
          <button className={cardLikeClassName} type="button" aria-label="Лайк" onClick={handleLikeClick} />
          <p className="card__like-count">{videos[card].users.length}</p>
        </div>
      </div>
      <CustomLink
        linkTo={videos[card].videoLink}
        textLink=""
        className="card__link-img"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          className="card__photo"
          src={videos[card].imageLink}
          alt={videos[card].nameVideo} />
      </CustomLink>
    </li >
  );
}
