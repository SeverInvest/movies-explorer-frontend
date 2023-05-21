import CustomButton from "../../common/CustomButton";
import CustomSwitch from "../../common/CustomSwitch";
import useFormAndValidation from "../../../hooks/useFormAndValidation";
import "./style.scss";
import Validation from "../../common/Validation";

export default function SearchForm({
  initialValues = {},
  onSearch,
  disabledToggle = false,
  isPreloaderVisible = false
}) {
  const { values, errors, setErrors, handleChange, setValues } = useFormAndValidation({ initialValues });

  const onSubmit =  async (e) => {
    e.preventDefault();
    if (values.search) {
      await onSearch(values.search, values.isToggle);
    } else {
      setErrors({ ...errors, search: "Нужно заполнить поле поиска" });
    }

  };

const setIsToggle = async (newIsToggle) => {
  setValues({ ...values,  isToggle: newIsToggle });
  await onSearch(values.search, newIsToggle);
}

  return (
    <form
      method="post"
      className="search-form"
      name="search-form"
      id="search-form"
      onSubmit={onSubmit}
      noValidate
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
          value={values.search || ""}
          required
          disabled={isPreloaderVisible}
        />
        <CustomButton
          type="submit"
          text="Поиск"
          className="search-form__search-button"
          ariaLabel="поиск фильма"
        />
      </div>
      <CustomSwitch
        setIsToggle={setIsToggle}
        isToggle={values.isToggle || false}
        text="Короткометражки"
        className="search-form__switch-text"
        disabled={disabledToggle}
      />
      <Validation
        errorMessage={errors.search}
      />
    </form>
  );
}
