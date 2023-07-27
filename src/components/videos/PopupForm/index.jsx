import "./style.scss";
import CustomInput from "../../common/CustomInput";
import Validation from "../../common/Validation";
import CustomForm from "../../common/CustomForm";
import useFormAndValidation from "../../../hooks/useFormAndValidation";
import { useDispatch, useSelector } from 'react-redux';
import { createVideo } from "../../../services/fetch";
import Popup from "../../common/Popup";
import { actionCloseAllPopup } from "../../../store/slices/popupSlice";

export default function PopupForm() {
  const { values, handleChange, errors, setErrors, setIsValid, isValid } = useFormAndValidation();
  const dispatch = useDispatch();
  const isPreloaderVisible = useSelector(state => state.videos.isLoading);

  async function handleSubmit(evt) {
    evt.preventDefault();
    if (!isValid) {
      return;
    };
    dispatch(actionCloseAllPopup())
    await createVideo(dispatch, values.videoLink);
  }

  function handleChangeVideo(e) {
    const regex = new RegExp(/^https:\/\/youtu.be\/[\w-]{11}$/)
    if (regex.test(e.target.value)) {
      setErrors("");
      handleChange(e);
    } else {
      setIsValid(false);
      setErrors({ ...errors, videoLink: "Проверьте правильность ввода ссылки" })
    }
  }

  return (
    <Popup >
      <h2 className="popup__title">
        Добавить видео
      </h2>
      <p className="popup__warning">
        Вставьте ссылку на видео в поле 👇
      </p>
      <p className="popup__warning">
        Ссылка должна иметь вид https://youtu.be/index_video
      </p>
      <CustomForm
        nameForm="addVideo"
        isValid={true}
        buttonText="Добавить"
        onSubmit={handleSubmit}
        blue={true}
        className="popup__form"
      >
        <CustomInput
          name="videoLink"
          type="url"
          error={errors.videoLink}
          autoFocus
          autocomplete="off"
          onChange={handleChangeVideo}
          disabled={isPreloaderVisible}
        />
        <Validation
          errorMessage={errors.videoLink}
          classNameValidation="popup__validation"
        />
      </CustomForm>

    </Popup >

  );
}