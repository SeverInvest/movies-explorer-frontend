import CustomLink from "../../common/CustomLink"
import images from "../../../images"
import "./style.scss";

export default function AboutMe() {
  return (
    <section className="about-me" aria-label="Обо мне">
      <div className="about-me__section">
        <div className="about-me__header">
          <h2 className="about-me__name">Студент</h2>
        </div>
        <div className="about-me__container">
          <div className="about-me__profile">
            <div className="about-me__info">
              <h2 className="about-me__my-name">
                Николай
              </h2>
              <p className="about-me__my-position">
                Фронтенд-разработчик, 50 лет
              </p>
              <p className="about-me__my-hystory">
                Мне 50 лет. У меня своя фирма, в которой работают больше 100 человек. <br/>
                На обучение программированию меня сподвигло два обстоятельства: <br/>
                - По работе появилась острая необходимость разбираться во всех современных технологиях IT (web-разработка). <br/>
                - Младший сын начал изучать программирование 😀 <br/>
                Живу в Ярославле. Женат. Трое детей. <br/> Моя история на дзене: 
                <CustomLink 
                linkTo="https://dzen.ru/a/ZA9XNU-2z3QTK9tX" 
                textLink=" как стать программистом в 50 лет" 
                className="about-me__link about-me__link_underlined" 
                target="_blank" 
                rel="noopener noreferrer"
                />
              </p>
            </div>
            <CustomLink
              linkTo="https://github.com/SeverInvest"
              textLink="Github"
              className="about-me__link about-me__link_big-normal"
              target="_blank" 
              rel="noopener noreferrer"
            />
          </div>
          <img src={images.me} className="about-me__my-photo" alt="моя фотография" />
        </div>
      </div>
    </section>
  );
}
