import CustomLink from "../../common/CustomLink"
import { CurrentUserContext } from "../../../context/CurrentUserContext";
import CustomForm from "../../common/CustomForm";
import useFormAndValidation from "../../../hooks/useFormAndValidation";
import Validation from "../../common/Validation";
import CustomInput from "../../common/CustomInput";
import { useEffect, useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./style.scss";

export default function Profile(

) {
  const { handleChange, errors, resetForm } = useFormAndValidation();
  const currentUser = useContext(CurrentUserContext);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

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
    navigate("/movies");
  }

  useEffect(() => {
 // TODO: сброс стейтов до дефолтного состояния
    // resetForm(
    //   {
    //     name: { currentUser.name },
    //     email: { currentUser.email }
    //   }
    // );
    resetForm();

    // setIsValid(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  // при изменении полей формы - сбрасывается ошибка, пришедшая из API
  function handleChangeAndClearErrorMessage(e) {
    setErrorMessage("");
    handleChange(e);
  }

  return (
    <section className="profile" aria-label="Форма изменения личных данных">
      <div className="profile__container">
        <div className="profile__info">
          <div className="profile__header">
            <h2 className="profile__title">Привет, {currentUser.userName}!</h2>
          </div>
          <div className="profile__form">
            <CustomForm
              nameForm="form-profile"
              isEnabled={true}
              buttonText="Редактировать"
              onSubmit={handleSubmit}
              blue={false}
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
                  error={errors.name}
                  option="profile"
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
            linkTo="/signin"
            textLink="Выйти из аккаунта"
          />
        </div>
      </div>
    </section>
  );
}