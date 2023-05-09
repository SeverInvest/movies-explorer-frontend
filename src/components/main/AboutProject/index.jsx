// import images from '../../../images';

import "./style.scss";

export default function AboutProject() {
  return (
    <section className="about-project" aria-label="О проекте">
      <div className="about-project__section">
        <div className="about-project__header">
          <h2 className="about-project__name">О проекте</h2>
        </div>
        <div className="about-project__table-up">
          <div className="about-project__table-up-column">
            <h2 className="about-project__table-up-header">Дипломный проект включал 5 этапов</h2>
            <p className="about-project__table-up-text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
          </div>
          <div className="about-project__table-up-column">
            <h2 className="about-project__table-up-header">На выполнение диплома ушло 5 недель</h2>
            <p className="about-project__table-up-text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
          </div>
        </div>
        <div className="about-project__table-down">
          <h2 className="about-project__table-down-header about-project__table-down-header_left">1 неделя</h2>
          <h2 className="about-project__table-down-header about-project__table-down-header_right">4 недели</h2>
          <p className="about-project__table-down-text">Back-end</p>
          <p className="about-project__table-down-text">Front-end</p>

        </div>
      </div>
    </section>
  );
}
