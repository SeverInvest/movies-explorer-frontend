import "./style.scss";
import Popup from "../Popup";
import images from "../../../images";
import CustomButton from "../CustomButton";
import { useDispatch } from 'react-redux';
import { actionCloseAllPopup, actionResetMessageAlarm } from "../../../store/slices/popupSlice";
import { actionFetchVideosError } from "../../../store/slices/videosSlice";

export default function PopupAlarm({
  messageText = "",
  success = true,
}
) {

  const dispatch = useDispatch();
  const classNames = ["popup-alarm__message"];
  classNames.push(success ? "popup-alarm__message_green" : "popup-alarm__message_red");

  const onClick = () => {
    dispatch(actionCloseAllPopup());
    dispatch(actionResetMessageAlarm());
    dispatch(actionFetchVideosError(""));
  }
  
  return (
    <Popup>
      <div className="popup-alarm">
        {success ?
          <img src={images.successful} alt="успешно" />
          :
          <img src={images.unsuccessful} alt="ошибка" />
        }
        <h3 className={classNames.join(" ")} >
          {messageText}
        </h3>
        <CustomButton
          onClick={onClick}
          className="popup-alarm__button"
          text="Закрыть"
          ariaLabel="Закрыть попап"
        >
        </CustomButton>
      </div>
    </Popup>
  )
}