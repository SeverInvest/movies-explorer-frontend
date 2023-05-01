// import images from '../../../images';

import "./style.scss";

export default function AboutProject() {
  return (
    <section className="about-project_bg">
      <div className="about-project">
        <div className="about-project__header">
          <h2 className="about-project__name">О проекте</h2>
        </div>
        <div className="about-project__table-up">
          <h2 className="about-project__table-up__header">Дипломный проект включал 5 этапов</h2>
          <h2 className="about-project__table-up__header">На выполнение диплома ушло 5 недель</h2>
          <p className="about-project__table-up__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
          <p className="about-project__table-up__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
        <div className="about-project__table-down">
          <h2 className="about-project__table-down__header about-project__table-down__header_left">1 неделя</h2>
          <h2 className="about-project__table-down__header about-project__table-down__header_right">4 недели</h2>
          <p className="about-project__table-down__text">Back-end</p>
          <p className="about-project__table-down__text">Front-end</p>

        </div>
      </div>
    </section>
  );
}
