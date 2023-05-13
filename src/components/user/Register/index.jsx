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

export default function Register(
  { handleRegister, errorMessage, setErrorMessage }
) {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, errors, resetForm, setIsValid, isValid } = useFormAndValidation();
  // const navigate = useNavigate();
  // const [errorMessage, setErrorMessage] = useState("");
  // const [isEnable, setIsEnable] = useState(false);

  function handleSubmit(evt) {
    // TODO: 
    // вызывается функция API (аргументом передать setErrorMessage)
    // changeButtonText(true);
    evt.preventDefault();
    if (!isValid) {
      return;
    };
    // onUpdateUser({
    //   name: values.name,
    //   about: values.description,
    // });
    handleRegister(values);
    // navigate("/signin");
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

  // function handleCheckValidation(e) {
  //   const regex = new RegExp(/^(?!\s)[-A-Za-zА-Яа-яЁё\s]+$/);
  //   if (regex.test(e.target.value)) {
  //     handleChangeAndClearErrorMessage(e)
  //   } else {
  //     if (e.target.value[0] === " ") {
  //       setErrors({ ...errors, name: "Имя не может начинаться с пробела" });
  //     } else {
  //       setErrors({ ...errors, name: "Это обязательное поле. Только латиница, кириллица, пробел или дефис" });
  //     }
  //     setIsValid(false);
  //   }
  // }

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
                  onChange={handleChangeAndClearErrorMessage}
                  name="name"
                  type="text"
                  autoFocus
                  minLength="2"
                  maxLength="30"
                  pattern="^(?! )[-A-Za-zА-Яа-яЁё ]+$"
                  error={errors.name}
                />
                <Validation
                  errorMessage={errors.name}
                />
                <CustomInput
                  textLabel="E-mail"
                  onChange={handleChangeAndClearErrorMessage}
                  name="email"
                  type="email"
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