import CustomLink from "../../common/CustomLink"
import CustomForm from "../../common/CustomForm";
import useFormAndValidation from "../../../hooks/useFormAndValidation";
import Validation from "../../common/Validation";
import CustomInput from "../../common/CustomInput";
import { useEffect, useState } from 'react';
import Header from '../../header/Header';
import "./style.scss";
import { useSelector, useDispatch } from 'react-redux';
import { setChangeUser } from "../../../services/fetch";
import Preloader from "../../common/Preloader";
import { fetchUserError, resetUser } from "../../../store/slices/userSlice";
import { actionResetVideos } from "../../../store/slices/videosSlice";
import { actionResetPopup } from "../../../store/slices/popupSlice";
import { actionResetUsers } from "../../../store/slices/usersSlice";

export default function Profile() {
  const dispatch = useDispatch();
  const { values, handleChange, errors, setErrors, resetForm, setIsValid, isValid } = useFormAndValidation();
  const [hasChanged, setHasChanged] = useState(false);
  const userName = useSelector(state => state.user.userName);
  const userEmail = useSelector(state => state.user.userEmail);
  const isPreloaderVisible = useSelector(state => state.user.isLoading);
  const errorMessage = useSelector(state => state.user.error);

  async function handleSubmit(evt) {
    evt.preventDefault();
    setChangeUser(dispatch, values.name, values.email)
  }

  function handleSignOut() {
    dispatch(resetUser());
    dispatch(actionResetVideos());
    dispatch(actionResetPopup());
    dispatch(actionResetUsers());
    localStorage.clear();
  };

  useEffect(() => {
    resetForm(
      {
        name: userName,
        email: userEmail
      }
    );
    setIsValid(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userName, userEmail]);


  useEffect(() => {
    if (values.name === userName && values.email === userEmail) {
      setIsValid(false);
    }
    // eslint-disable-next-line 
  }, [values])

  // при изменении полей формы - сбрасывается ошибка, пришедшая из API
  function handleChangeAndClearErrorMessage(e) {
    dispatch(fetchUserError(""));
    handleChange(e);
  }

  function handleChangeEmail(e) {
    const regex = new RegExp(/^\S+@\S+\.\S+$/)
    if (regex.test(e.target.value)) {
      handleChangeAndClearErrorMessage(e);
    } else {
      setIsValid(false);
      setErrors({ ...errors, email: "Проверьте правильность ввода электронной почты" })
    }
  }

  function handleChangeName(e) {
    const regex = new RegExp(/^(?! )[-A-Za-zА-Яа-яЁё ]+$/)
    if (regex.test(e.target.value)) {
      handleChangeAndClearErrorMessage(e);
    } else {
      setIsValid(false);
      setErrors({ ...errors, name: "Длина поля от 2 до 30 символов и только буквы, пробел и дефис" })
    }
  }

  useEffect(() => {
    setHasChanged(true);
  }, [values])

  return (
    <>
      <Header option="profile" />
      <section className="profile" aria-label="Форма изменения личных данных">
        <div className="profile__container">
          <div className="profile__info">
            <div className="profile__header">
              <h2 className="profile__title">Привет, {userName}!</h2>
            </div>
            <div className="profile__form">
              {
                isPreloaderVisible &&
                <Preloader />
              }
              <CustomForm
                nameForm="form-profile"
                buttonText="Редактировать"
                onSubmit={handleSubmit}
                isValid={isValid}
                buttonDisabled={!isValid || !hasChanged}
                blue={true}
                option="profile"
              >
                <div className="profile__inputs">
                  <CustomInput
                    textLabel="Имя"
                    onChange={handleChangeName}
                    name="name"
                    type="text"
                    autoFocus
                    minLength="2"
                    maxLength="30"
                    error={errors.name}
                    option="profile"
                    value={values.name || ""}
                    disabled={isPreloaderVisible}
                  />
                  <Validation
                    errorMessage={errors.name}
                  />
                  <CustomInput
                    textLabel="E-mail"
                    onChange={handleChangeEmail}
                    name="email"
                    type="email"
                    error={errors.email}
                    option="profile"
                    value={values.email || ""}
                    disabled={isPreloaderVisible}
                  />
                  <Validation
                    errorMessage={errors.email}
                  />
                </div>
                <div className="profile__error-message">
                  <Validation
                    errorMessage={errorMessage}
                  />
                </div>
              </CustomForm>
            </div>
          </div>
          <div className="profile__footer">
            <CustomLink
              className="profile__link-red"
              linkTo="/"
              textLink="Выйти из аккаунта"
              onClick={handleSignOut}
            />
          </div>
        </div>
      </section>
    </>
  );
}
