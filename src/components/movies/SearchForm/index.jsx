// import images from '../../../images';
import CustomButton from "../../common/CustomButton";
import CustomSwitch from "../../common/CustomSwitch";
import useFormAndValidation from "../../../hooks/useFormAndValidation";
import "./style.scss";
import { useEffect } from 'react';

export default function SearchForm({
  isLoggedIn = true,
  setIsFirstLoad,
  setIsToggleSwitch,
  setSearchText,
  isToggleSwitch,
  setIsPreloaderVisible,
  isFirstLoad,
  setIsSubmit,
  isSubmit
}) {
  const { values, handleChange, resetForm } = useFormAndValidation();

  const onSubmit = ((e) => {
    e.preventDefault();
    setIsPreloaderVisible(true);
    setSearchText(values.search);
    if (isFirstLoad) {
      setIsFirstLoad(false);
    } else {
      setIsSubmit(!isSubmit);
    }
  });

  const handleToggle = (() => {
    setIsPreloaderVisible(true);
    setSearchText(values.search);
    setIsToggleSwitch(!isToggleSwitch);
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
          name="search"
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
        disabled={isFirstLoad}
      />
    </form>
  );
}
