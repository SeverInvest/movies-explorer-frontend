import CustomButton from "../../common/CustomButton";
import CustomSwitch from "../../common/CustomSwitch";
import useFormAndValidation from "../../../hooks/useFormAndValidation";
import "./style.scss";
// import { useEffect } from 'react';

export default function SearchForm({
  isLoggedIn = true,
  requiredSearchInput = false,
  initialValues = {},
  setSearchText = null,
  isGetInfoFromBD = true,
  setIsGetInfoFromBD = null,
  setIsToggleSwitch,
  isToggleSwitch,
  setIsPreloaderVisible,
  option = "",
  setIsSubmit,
  isSubmit,


}) {
  const { values, handleChange } = useFormAndValidation({initialValues});
  console.log("xxx", values);
  const onSubmit = ((e) => {
    e.preventDefault();
    // console.log("сработал сабмит поиска")
    setIsPreloaderVisible(true);
    setSearchText(values.search);
    if (option === "movies" && !isGetInfoFromBD) {
      setIsGetInfoFromBD(true)
    }
    setIsSubmit(!isSubmit);
  });

  const handleToggle = (() => {
    console.log("handleToggle", values);
    setIsPreloaderVisible(true);
    setSearchText(values.search);
    setIsToggleSwitch(!isToggleSwitch);
  });

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     resetForm();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isLoggedIn]);

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
          value={values.search}
          required={requiredSearchInput}
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
        isDefaultOn={isToggleSwitch}
        text="Короткометражки"
        className="search-form__switch-text"
        disabled={!isGetInfoFromBD}
      />
    </form>
  );
}
