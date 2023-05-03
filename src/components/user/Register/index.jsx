import CustomLink from "../../common/CustomLink"
import { CurrentUserContext } from "../../../context/CurrentUserContext";
import CustomForm from "../../common/CustomForm";
import useFormAndValidation from "../../../hooks/useFormAndValidation";
import Validation from "../../common/Validation";
import CustomInput from "../../common/CustomInput";
import { useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import "./style.scss";

export default function Register(

) {
  const currentUser = useContext(CurrentUserContext);
  const { handleChange, errors, resetForm, setIsValid } = useFormAndValidation();
  const navigate = useNavigate();

  function handleSubmit(evt) {
    // TODO: 
    // changeButtonText(true);
    evt.preventDefault();
    // onUpdateUser({
    //   name: values.name,
    //   about: values.description,
    // });
    navigate("/signin");
  }

  useEffect(() => {
    resetForm();
    // TODO: сброс стейтов до дефолтного состояния
    setIsValid(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);


  return (
    <section className="register_bg">
      <div className="register">
        <div className="register__header">
          <h2 className="register__title">Добро пожаловать!</h2>
        </div>
        <div className="register__form__container">
          <CustomForm
            nameForm="form-register"
            isEnabled={true}
            buttonText="Зарегистрироваться"
            onSubmit={handleSubmit}
            blue={true}
          >
            <div className="register__form__inputs">
              <CustomInput
                textLabel="Имя"
                onChange={handleChange}
                name="name"
                type="text"
                autoFocus
                minLength="2"
                maxLength="30"
                error={errors.name}
              />
              <Validation
                errorMessage={errors.name}
              />
              <CustomInput
                textLabel="E-mail"
                onChange={handleChange}
                name="email"
                type="email"
                error={errors.email}
              />
              <Validation
                errorMessage={errors.email}
              />
              <CustomInput
                textLabel="Пароль"
                onChange={handleChange}
                name="password"
                type="password"
                minLength="8"
                error={errors.password}
              />
              <Validation
                errorMessage={errors.password}
              />
            </div>
            
          </CustomForm>
        </div>
        <div className="register__footer">
          <p className="register__text">Уже зарегистрированы? &nbsp;</p>
          <CustomLink
            className="register__link_blue"
            linkTo="/signin"
            textLink="Войти"
          />
        </div>
      </div>
    </section>
  );
}