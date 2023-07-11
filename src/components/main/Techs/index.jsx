import "./style.scss";
import { TECHS_ITEMS } from "../../../utils/constants";
import Tech from "./Tech";

export default function Techs() {
  return (
    <section className="techs" aria-label="Используемые технологии">
      <div className="techs__section">
        <div className="techs__header">
          <h2 className="techs__name">Технологии</h2>
        </div>
        <div className="techs__container">
          <h2 className="techs__container-header">
            {TECHS_ITEMS.length} технологий
          </h2>
          <p className="techs__container-text">
            На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
          </p>
        </div>
        <ul className="techs__list">
          {TECHS_ITEMS.map((item) => (
            <Tech
              techName={item.techName} techLink={item.techLink} key={item.techName}
            >
              <item.techImage color="white" size="30px"/>
            </Tech>
          ))}
        </ul>
      </div>
    </section>
  );
}
