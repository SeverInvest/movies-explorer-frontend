import CustomLink from "../../common/CustomLink"
import { CurrentUserContext } from "../../../context/CurrentUserContext";
import CustomForm from "../../common/CustomForm";
import useFormAndValidation from "../../../hooks/useFormAndValidation";
import Validation from "../../common/Validation";
import CustomInput from "../../common/CustomInput";
import Logo from "../../common/Logo";
import { useEffect, useContext } from 'react';
// import { useNavigate } from "react-router-dom";
import "./style.scss";

export default function Login(
  { handleLogin, errorMessage, setErrorMessage }
) {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, errors, resetForm, setIsValid, isValid } = useFormAndValidation();
  // const navigate = useNavigate();
  // const [errorMessage, setErrorMessage] = useState("");

  function handleSubmit(evt) {
    evt.preventDefault();
    // TODO: 
    // вызывается функция API (аргументом передать setErrorMessage)
    // changeButtonText(true);
    // 
    // onUpdateUser({
    //   name: values.name,
    //   about: values.description,
    // });
    if (!isValid) {
      return;
    };
    // navigate("/movies");
    handleLogin(values);
  }

  useEffect(() => {
    resetForm();
    // TODO: сброс стейтов до дефолтного состояния
    setIsValid(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  // при изменении полей формы - сбрасывается ошибка, пришедшая из API
  function handleChangeAndClearErrorMessage(e) {
    setErrorMessage("");
    handleChange(e);
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
                  onChange={handleChangeAndClearErrorMessage}
                  name="email"
                  type="email"
                  autoFocus
                  error={errors.email}
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