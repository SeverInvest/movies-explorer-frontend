import "./style.scss";
import CustomLink from "../common/CustomLink";


function Page404() {

  return (
    <div className="page404">
      <div className="page404__container">
        <h1 className="page404__title">404</h1>
        <p className="page404__text">Страница не найдена</p>
        <CustomLink
          linkTo="/"
          textLink="Назад"
          className="page404__link"
        />
      </div>
    </div >

  );
}
export default Page404;