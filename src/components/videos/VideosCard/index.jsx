import "./style.scss";
import CustomLink from '../../common/CustomLink';
import CustomButton from '../../common/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { setLike, setDisike, updateVideo } from "../../../services/fetch";
import { CiGlobe, CiRedo, CiClock2, CiUser, CiCalendarDate, CiRead, CiHeart } from "react-icons/ci";
import { SiYoutube } from "react-icons/si";
import { IoIosHeart, IoIosTrash, IoMdContact, IoIosInformationCircleOutline } from "react-icons/io";
import { verifyDate } from "../../../utils";
import { verifyDuration } from "../../../utils";
import Tooltip from "../../common/Tooltip";

export default function VideosCard({
  card, handleDeleteVideo = null,
}) {
  const dispatch = useDispatch();
  const userVideos = useSelector(state => state.user.videos);
  const videos = useSelector(state => state.videos.videos);
  const userLiked = userVideos.includes(card);
  const userId = useSelector(state => state.user.userId);
  const cardOwner = videos[card].owner;
  const userRoles = useSelector(state => state.user.userRoles);
  const isOwner = userId === cardOwner;
  const isAdmin = userRoles.includes("ADMIN");
  const users = useSelector(state => state.users.users);
  const ownerId = videos[card].owner || null;
  const ownerName = users[ownerId].name;

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

  async function handleUpdateVideo() {
    try {
      updateVideo(dispatch, card)
    } catch (error) {
      console.log(error);
    }
  }

  const ButtonLike = () => (
    <CustomButton className="card__button" type="button" aria-label="Лайк" onClick={handleLikeClick} >
      {userLiked ?
        <IoIosHeart color="#72dc89" size="22px" />
        :
        <IoIosHeart color="gray" size="22px" />
      }
    </CustomButton>
  );

  const Refresh = () => (
    <CustomButton className="card__button" type="button" aria-label="Обновить" onClick={handleUpdateVideo}  >
      <CiRedo color="gray" size="22px" />
    </CustomButton>
  )

  const ICONS_ATTRIBUTES = [
    { attrImage: CiUser, attrName: "author", attrValue: videos[card].author },
    { attrImage: CiGlobe, attrName: "language", attrValue: videos[card].language },
    { attrImage: IoMdContact, attrName: "owner", attrValue: ownerName },
    { attrImage: SiYoutube, attrName: "atYoutube", attrValue: verifyDate(videos[card].publishedAtYoutube) },
    { attrImage: CiRead, attrName: "countOfViews", attrValue: videos[card].viewCountYoutube },
    { attrImage: CiCalendarDate, attrName: "atThis", attrValue: verifyDate(videos[card].publishedAtThis) },
    { attrImage: CiClock2, attrName: "duratuion", attrValue: verifyDuration(videos[card].duration) },
    { attrImage: CiHeart, attrName: "countOfLikes", attrValue: videos[card].likeCountYoutube },
    { attrImage: Refresh, attrName: "refresh", attrValue: "обновить" },
  ]

  return (
    <li className="card">

      <div className="card__container">
        <div className="card__like-and-name-container">
          <div className="card__attribute-container">
            <ButtonLike />
            <p className="card__text-attribute">
              {!!videos[card].users ? videos[card].users.length : ""}
            </p>
          </div>
          <p className="card__name">{videos[card].nameVideo}</p>
        </div>
        <ul className="card__attributes">
          {ICONS_ATTRIBUTES.map((item) => (
            <li
              key={item.attrName}
              className="card__attribute-container"
            >
              <item.attrImage color="gray" size="22px" className="card__icon-attribute" />
              <p className="card__text-attribute">
                {item.attrValue}
              </p>
            </li>
          ))}
        </ul>
      </div>
      {(isOwner || isAdmin) &&
        <CustomButton
          className="card__remove-button"
          onClick={() => handleDeleteVideo(card)}
          aria-label="Удаление карточки">
          <IoIosTrash color="#72dc89" size="22px" />
        </CustomButton>
      }
      <Tooltip
        text={videos[card].description}
        className="card__tooltip"
      >
        <IoIosInformationCircleOutline color="#72dc89" size="22px"/>
      </Tooltip>
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
