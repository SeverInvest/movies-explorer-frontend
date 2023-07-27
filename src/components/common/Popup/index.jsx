import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import "./style.scss";
import images from "../../../images";
import { actionCloseAllPopup } from "../../../store/slices/popupSlice";
import CustomButton from "../CustomButton";

export default function Popup(
  {
    children,
  }
) {

  const dispatch = useDispatch();

  function escFunction(evt) {
    if (evt.key === "Escape") {
      closePopup()
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", escFunction);
    return () => {
      document.removeEventListener("keydown", escFunction);
    };
    // eslint-disable-next-line
  }, []);

  function clickPass(evt) {
    if (evt.target === evt.currentTarget) {
      closePopup();

    }
  }

  function closePopup() {
    dispatch(actionCloseAllPopup());
  }

  return (
    <div className="popup" onClick={clickPass}>
      <div className="popup__container">
        <CustomButton
          type="button"
          className="popup__button-close"
          onClick={closePopup}
          aria-label="закрыть popup"
        >
          <img
            src={images.buttonCloseBlack}
            alt="закрыть popup"
            className="popup__icon-close"
          />
        </CustomButton>
        {children}

      </div>
    </div >

  );

}