// import images from '../../../images';
import CustomButton from "../../common/CustomButton";
import CustomSwitch from "../../common/CustomSwitch";
import useFormAndValidation from "../../../hooks/useFormAndValidation";
import "./style.scss";
import images from "../../../images";
import { useState, useEffect } from 'react';

export default function SearchForm({
  handleSubmit,
  isLoggedIn = true,
  onToggleSwitch
}) {
  const { values, handleChange, resetForm } = useFormAndValidation();
  const [imgTumbler, setImgTumbler] = useState(images.smalltumboff)

  const onSubmit = ((e) => {
    e.preventDefault();
    handleSubmit({
      name: values.name,
    });
  });

  const handleToggle = (() => {
    if (imgTumbler === images.smalltumbon) {
      setImgTumbler(images.smalltumboff);
    } else {
      setImgTumbler(images.smalltumbon);
    }
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
        />
        <CustomButton
          type="submit"
          text="Поиск"
          option="search"
          ariaLabel="поиск фильма"
        />
      </div>
      <CustomSwitch
        onToggle={handleToggle}
        imgTumbler={imgTumbler}
        text="Короткометражки"
      />
    </form>
  );
}
