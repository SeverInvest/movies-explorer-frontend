import CustomButton from "../../common/CustomButton";
import CustomSwitch from "../../common/CustomSwitch";
import useFormAndValidation from "../../../hooks/useFormAndValidation";
import "./style.scss";

export default function SearchForm({
  initialValues = {},
  onSearch,
}) {
  const { values, handleChange, setValues } = useFormAndValidation({ initialValues });

  const onSubmit = async (e) => {
    e.preventDefault();
    await onSearch(values.search, values.isToggleDuration, values.isToggleLike);
  }

  const setIsToggleDuration = async (newIsToggleDuration) => {
    setValues({ ...values, isToggleDuration: newIsToggleDuration });
    await onSearch(values.search, newIsToggleDuration, values.isToggleLike);
  }

  const setIsToggleLike = async (newIsToggleLike) => {
    setValues({ ...values, isToggleLike: newIsToggleLike });
    await onSearch(values.search, values.isToggleDuration, newIsToggleLike);
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
          placeholder="Видео"
          onChange={handleChange}
          name="search"
          id="search-form__input"
          autoFocus
          autoComplete="off"
          value={values.search || ""}
        />
        <CustomButton
          type="submit"
          text="Поиск"
          className="search-form__search-button"
          ariaLabel="поиск фильма"
        />
      </div>
      <CustomSwitch
        name="isToggleDuration"
        setToggle={setIsToggleDuration}
        isToggle={values.isToggleDuration || false}
        text="До 40 минут"
        className="search-form__switch-text"
      />
      <CustomSwitch
        name="isToggleLike"
        setToggle={setIsToggleLike}
        isToggle={values.isToggleLike || false}
        text="Избранное"
        className="search-form__switch-text"
      />

    </form>
  );
}
