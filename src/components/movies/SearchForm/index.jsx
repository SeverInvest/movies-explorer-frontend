// import images from '../../../images';
import CustomButton from "../../common/CustomButton";
import CustomSwitch from "../../common/CustomSwitch";
import useFormAndValidation from "../../../hooks/useFormAndValidation";
import "./style.scss";
import { useEffect } from 'react';

export default function SearchForm({
  handleSubmit,
  isLoggedIn = true,
  onToggleSwitch
}) {
  const { values, handleChange, resetForm } = useFormAndValidation();

  const onSubmit = ((e) => {
    e.preventDefault();
    handleSubmit({
      name: values.name,
    });
  });

  const handleToggle = (() => {
    onToggleSwitch({
      name: values.name,
    });
  });

  useEffect(() => {
    if (isLoggedIn) {
      resetForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  return (
    <form
      method="post"
      className="search-form"
      name="search-form"
      id="search-form"
      onSubmit={onSubmit}
    >
      <div className="search-form__container">
        <input
          className="search-form__input"
          placeholder="Фильм"
          onChange={handleChange}
          name="name"
          id="search-form__input"
          autoFocus
          autoComplete="off"
          required
        />
        <CustomButton
          type="submit"
          text="Поиск"
          className="search-form__search-button"
          ariaLabel="поиск фильма"
        />
      </div>
      <CustomSwitch
        onToggle={handleToggle}
        isDefaultOn={false}
        text="Короткометражки"
        className="search-form__switch-text"
      />
    </form>
  );
}
