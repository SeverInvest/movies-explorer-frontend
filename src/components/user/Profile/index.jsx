import CustomLink from "../../common/CustomLink"
// import CustomButton from "../../common/CustomButton"
import { CurrentUserContext } from "../../../context/CurrentUserContext";
import CustomForm from "../../common/CustomForm";
import useFormAndValidation from "../../../hooks/useFormAndValidation";
import Validation from "../../common/Validation";
import CustomInput from "../../common/CustomInput";
import { useEffect, useContext } from 'react';
import Header from '../../header/Header';
// import { useNavigate } from "react-router-dom";
import "./style.scss";

export default function Profile(
  { handleChangeUserInfo, errorMessage, setErrorMessage, loggedIn, onClick }
) {
  const { values, handleChange, errors, resetForm, setIsValid, isValid } = useFormAndValidation();
  const currentUser = useContext(CurrentUserContext);
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
    // navigate("/movies");
    handleChangeUserInfo(values);
  }

  useEffect(() => {
    // TODO: сброс стейтов до дефолтного состояния
    resetForm(
      {
        name: currentUser.userName,
        email: currentUser.userEmail
      }
    );
    setIsValid(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);


  useEffect(() => {
    if (values.name === currentUser.userName && values.email === currentUser.userEmail) {
      setIsValid(false);
    }
  }, [values, currentUser, setIsValid])

  // при изменении полей формы - сбрасывается ошибка, пришедшая из API
  function handleChangeAndClearErrorMessage(e) {
    setErrorMessage("");
    handleChange(e);
  }

  return (
    <>
    <Header loggedIn={loggedIn} option="profile" />
    <section className="profile" aria-label="Форма изменения личных данных">
      <div className="profile__container">
        <div className="profile__info">
          <div className="profile__header">
            <h2 className="profile__title">Привет, {currentUser.userName}!</h2>
          </div>
          <div className="profile__form">
            <CustomForm
              nameForm="form-profile"
              buttonText="Редактировать"
              onSubmit={handleSubmit}
              isValid={isValid}
              blue={true}
              option="profile"
            >
              <div className="profile__inputs">
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
                  option="profile"
                  value={values.name || ""}
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
                  option="profile"
                  value={values.email || ""}
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
            // text="Выйти из аккаунта"
            onClick={onClick}
          />
        </div>
      </div>
    </section>
    </>
  );
}