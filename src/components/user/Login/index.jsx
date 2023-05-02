import CustomLink from "../../common/CustomLink"
import { CurrentUserContext } from "../../../context/CurrentUserContext";
import CustomForm from "../../common/CustomForm";
import useFormAndValidation from "../../../hooks/useFormAndValidation";
import Validation from "../../common/Validation";
import CustomInput from "../../common/CustomInput";
import { useEffect, useContext } from 'react';
import "./style.scss";

export default function Login(

) {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, resetForm, setValues, setIsValid } = useFormAndValidation();

  function handleSubmit(evt) {
    // changeButtonText(true);
    // evt.preventDefault();
    // onUpdateUser({
    //   name: values.name,
    //   about: values.description,
    // });
  }

  useEffect(() => {
    resetForm();
    // setValues({ "name": currentUser.name, "description": currentUser.about });
    setIsValid(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);


  return (
    <section className="logn_bg">
      <div className="login">
        <div className="login__header">
          <h2 className="login__title">Добро пожаловать!</h2>
        </div>
        <div className="login__form__container">
          <CustomForm
            // className="register__form"
            nameForm="form-login"
            isEnabled={true}
            buttonText="Войти"
            onSubmit={handleSubmit}
            blue={true}
            option="login"
          >
            <div className="login__form__inputs">
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
        <div className="login__footer">
          <p className="login__text">Еще на зарегистрированы? &nbsp;</p>
          <CustomLink
            className="login__link_blue"
            linkTo="/signup"
            textLink="Регистрация"
          />
        </div>
      </div>
    </section>
  );
}