import CustomLink from "../../common/CustomLink"
import { CurrentUserContext } from "../../../context/CurrentUserContext";
import CustomForm from "../../common/CustomForm";
import useFormAndValidation from "../../../hooks/useFormAndValidation";
import Validation from "../../common/Validation";
import CustomInput from "../../common/CustomInput";
import { useEffect, useContext } from 'react';
import "./style.scss";

export default function Profile(

) {
  const { values, handleChange, errors, isValid, resetForm, setValues, setIsValid } = useFormAndValidation();
  const currentUser = useContext(CurrentUserContext);

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
    <section className="profile_bg">
      <div className="profile">
        <div className="profile__header">
          <h2 className="profile__title">Привет, {currentUser.userName}!</h2>
        </div>
        <div className="profile__form__container">
          <CustomForm
            // className="register__form"
            nameForm="form-profile"
            isEnabled={true}
            buttonText="Редактировать"
            onSubmit={handleSubmit}
            blue={false}
            option="profile"
          >
            <div className="profile__form__inputs">
              <CustomInput
                textLabel="Имя"
                onChange={handleChange}
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
                onChange={handleChange}
                name="email"
                type="email"
                error={errors.email}
                option="profile"
              />
              <Validation
                errorMessage={errors.email}
              />
            </div>

          </CustomForm>
        </div>
        <div className="profile__footer">
          <CustomLink
            className="profile__link_red"
            linkTo="/signin"
            textLink="Выйти из аккаунта"
          />
        </div>
      </div>
    </section>
  );
}