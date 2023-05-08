import "./style.scss"

export default function Techs() {
  return (
    <section className="techs_bg" aria-label="Используемые технологии">
      <div className="techs">
        <div className="techs__header">
          <h2 className="techs__name">Технологии</h2>
        </div>
        <div className="techs__container">
          <h2 className="techs__container__header">
            7 технологий
          </h2>
          <p className="techs__container__text">
            На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
          </p>
        </div>
          <ul className="techs__list">
            <li className="techs__item">HTML</li>
            <li className="techs__item">CSS</li>
            <li className="techs__item">JS</li>
            <li className="techs__item">React</li>
            <li className="techs__item">Git</li>
            <li className="techs__item">Express.js</li>
            <li className="techs__item">mongoDB</li>
          </ul>
      </div>
    </section>
  );
}
