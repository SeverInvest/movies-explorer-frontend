// import images from '../../../images';
import CustomButton from "../../common/CustomButton";
import CustomSwitch from "../../common/CustomSwitch";
import useFormAndValidation from "../../../hooks/useFormAndValidation";
import "./style.scss";
import images from "../../../images";
import { useState, useEffect } from 'react';

export default function SearchForm({
  onSubmit,
  isLoggedIn = true,
}) {
  const { values, handleChange, resetForm } = useFormAndValidation();
  const [isToggleSwitch, setIsToggleSwitch] = useState(false);
  const [imgTumbler, setImgTumbler] = useState(images.smalltumboff)

  const handleSubmit = ((e) => {
    e.preventDefault();
    onSubmit({
      name: values.name,
    });
  });

  const handleToggleSwitch = (() => {
    if (isToggleSwitch) {
      setIsToggleSwitch(false);
      setImgTumbler(images.smalltumboff);
    } else {
      setIsToggleSwitch(true);
      setImgTumbler(images.smalltumbon);
    }
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
      onSubmit={handleSubmit}
    >
      <div className="search-form__container">
        <input
          className="search-form__input"
          placeholder="Фильм"
          onChange={handleChange}
          name="name"
          id="search-form__input"
        />
        <CustomButton
          type="submit"
          text="Поиск"
          option="search"
          ariaLabel="поиск фильма"
        />
      </div>
      <CustomSwitch
        onToggleSwitch={handleToggleSwitch}
        imgTumbler={imgTumbler}
        text="Короткометражки"
      />
    </form>
  );
}
