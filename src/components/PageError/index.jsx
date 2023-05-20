import "./style.scss";
import CustomButton from "../common/CustomButton";

import { useNavigate } from 'react-router-dom';

export default function PageError({
  errorStatus = "404",
  errorMessage = "Страница по указанному маршруту не найдена.",
  linkTo = "/"
}) {

  const navigate = useNavigate();

  return (
    <div className="page-error">
      <div className="page-error__container">
        <div></div>
        <div className="page-error__info">
          <h1 className="page-error__title">{errorStatus}</h1>
          <p className="page-error__text">{errorMessage}</p>
        </div>

        <CustomButton
          text="Назад"
          onClick={() => navigate(-1)}
          className="page-error__button"
          ariaLabel="Назад"
        />

      </div>
    </div >

  );
}
