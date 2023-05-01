// import images from '../../../images';
import CustomLink from "../../common/CustomLink"
import images from "../../../images"
import "./style.scss";

export default function AboutMe() {
  return (
    <section className="about-me_bg">
      <div className="about-me">
        <div className="about-me__header">
          <h2 className="about-me__name">Студент</h2>
        </div>
        <div className="about-me__container">
          <div className="about-me__profile">
            <div className="about-me__profile__up">
              <h2 className="about-me__profile__my-name">
                Николай
              </h2>
              <p className="about-me__profile__my-position">
                Фронтенд-разработчик, 50 лет
              </p>
              <p className="about-me__profile__my-hystory">
                Мне 50 лет. У меня своя фирма, в которой работают больше 100 человек. <br/>
                На обучение программированию меня сподвигло два обстоятельства: <br/>
                - По работе появилась острая необходимость общаться с разработчиками на их сленге. Причем не просто разговаривать, но и разбираться во всех современных технологиях. <br/>
                - Младший сын начал изучать программирование (мне нельзя было упасть 😀) <br/>
                Живу в Ярославле. Женат. Трое детей. <br/> Моя история на дзене: 
                <CustomLink linkTo="https://dzen.ru/a/ZA9XNU-2z3QTK9tX" textLink=" как стать программистом в 50 лет" option="underlined" />
              </p>
            </div>
            <CustomLink
              linkTo="https://github.com/SeverInvest"
              textLink="Github"
              option="big-normal"
            />
          </div>
          <img src={images.me} className="about-me__profile__my-photo" alt="моя фотография" />
        </div>
      </div>
    </section>
  );
}
