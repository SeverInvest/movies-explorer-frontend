import CustomLink from "../../common/CustomLink"
import { CurrentUserContext } from "../../../context/CurrentUserContext";
import CustomForm from "../../common/CustomForm";
import useFormAndValidation from "../../../hooks/useFormAndValidation";
import Validation from "../../common/Validation";
import CustomInput from "../../common/CustomInput";
import Logo from "../../common/Logo";
import { useEffect, useContext } from 'react';
import "./style.scss";
import Preloader from "../../movies/Preloader";

export default function Login(
  { 
    handleLogin = null, 
    errorMessage = "", 
    setErrorMessage = null,
    setIsPreloaderVisible = null,
    isPreloaderVisible = false
  }
) {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, errors, setErrors, resetForm, setIsValid, isValid } = useFormAndValidation();

  function handleSubmit(evt) {
    evt.preventDefault();
    setIsPreloaderVisible(true);
    if (!isValid) {
      return;
    };
    handleLogin(values);
  }

  useEffect(() => {
    resetForm();
    setIsValid(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  // при изменении полей формы - сбрасывается ошибка, пришедшая из API
  function handleChangeAndClearErrorMessage(e) {
    setErrorMessage("");
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

  return (
    <section className="login" aria-label="Форма авторизации">
      <div className="login__container">
        <div className="register__menu">
          <Logo />
        </div>
        <div className="login__info">
          <div className="login__header">
            <h2 className="login__title">Рады видеть!</h2>
          </div>
          <div className="login__form">
          {
              isPreloaderVisible &&
              <Preloader />
            }
            <CustomForm
              nameForm="form-login"
              isValid={isValid}
              buttonText="Войти"
              onSubmit={handleSubmit}
              blue={true}
              option="login"
            >
              <div className="login__inputs">
                <CustomInput
                  textLabel="E-mail"
                  onChange={handleChangeEmail}
                  name="email"
                  type="email"
                  autoFocus
                  error={errors.email}
                  disabled={isPreloaderVisible}
                />
                <Validation
                  errorMessage={errors.email}
                />
                <CustomInput
                  textLabel="Пароль"
                  onChange={handleChangeAndClearErrorMessage}
                  name="password"
                  type="password"
                  minLength="8"
                  error={errors.password}
                  disabled={isPreloaderVisible}
                />
                <Validation
                  errorMessage={errors.password}
                />
              </div>
              <div className="login__error-message">
                <Validation
                  errorMessage={errorMessage}
                />
              </div>
            </CustomForm>
          </div>
          <div className="login__footer">
            <p className="login__text">Еще на зарегистрированы? &nbsp;</p>
            <CustomLink
              className="login__link-blue"
              linkTo="/signup"
              textLink="Регистрация"
            />
          </div>
        </div>
      </div>
    </section >
  );
}