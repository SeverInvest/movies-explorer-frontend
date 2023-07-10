import CustomLink from "../../common/CustomLink"
import { useDispatch, useSelector } from 'react-redux';
import CustomForm from "../../common/CustomForm";
import useFormAndValidation from "../../../hooks/useFormAndValidation";
import Validation from "../../common/Validation";
import CustomInput from "../../common/CustomInput";
import Logo from "../../common/Logo";
import { useEffect } from 'react';
import { register, login, me } from "../../../services/fetch";
import "./style.scss";
import Preloader from "../../movies/Preloader";
import { useNavigate } from 'react-router-dom';
import { fetchUserError } from "../../../store/slices/userSlice";

export default function Register() {

  const { values, handleChange, errors, setErrors, resetForm, setIsValid, isValid } = useFormAndValidation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const errorMessage = useSelector(state => state.user.error);
  const isPreloaderVisible = useSelector(state => state.user.isLoading);
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);

  async function handleSubmit(evt) {
    evt.preventDefault();
    if (!isValid) {
      return;
    };
    const resRegister = await register(dispatch, values.name, values.email, values.password);
    console.log(resRegister);
    const resLogin = await login(dispatch, values.email, values.password);
    console.log(resLogin)
    localStorage.setItem("jwt", resLogin.data.token);
    await me(dispatch);
    navigate("/videos", { replace: true });
  }

  useEffect(() => {
    resetForm();
    setIsValid(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  // при изменении полей формы - сбрасывается ошибка, пришедшая из API
  function handleChangeAndClearErrorMessage(e) {
    dispatch(fetchUserError(""));
    setErrors("");
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

  return (
    <section className="register" aria-label="Форма регистрации">
      <div className="register__container">
        <div className="register__menu">
          <Logo />
        </div>
        <div className="register__info">
          <div className="register__header">
            <h2 className="register__title">Добро пожаловать!</h2>
          </div>
          <div className="register__form">
            {
              isPreloaderVisible &&
              <Preloader />
            }
            <CustomForm
              nameForm="form-register"
              isValid={isValid}
              buttonText="Зарегистрироваться"
              onSubmit={handleSubmit}
              blue={true}
            >
              <div className="register__inputs">
                <CustomInput
                  textLabel="Имя"
                  onChange={handleChangeName}
                  name="name"
                  type="text"
                  autoFocus
                  minLength="2"
                  maxLength="30"
                  error={errors.name}
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
                />
                <Validation
                  errorMessage={errors.password}
                />
              </div>
              <div className="register__error-message">
                <Validation
                  errorMessage={errorMessage}
                />
              </div>
            </CustomForm>
          </div>
          <div className="register__footer">
            <p className="register__text">Уже зарегистрированы? &nbsp;</p>
            <CustomLink
              className="register__link-blue"
              linkTo="/signin"
              textLink="Войти"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
