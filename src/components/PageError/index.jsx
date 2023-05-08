import "./style.scss";
import CustomLink from "../common/CustomLink";

export default function PageError({
  errorStatus = "404",
  errorMessage = "Страница по указанному маршруту не найдена.",
  linkTo="/"
}) {

  return (
    <div className="page-error">
      <div className="page-error__container">
      <div></div>
        <div className="page-error__info">
          <h1 className="page-error__title">{errorStatus}</h1>
          <p className="page-error__text">{errorMessage}</p>
        </div>
        <CustomLink
          linkTo={linkTo}
          textLink="Назад"
          className="page-error__link"
        />
      </div>
    </div >

  );
}
