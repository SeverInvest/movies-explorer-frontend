import listProjects from '../../../utils/list-projects';
import Project from '../Project';
import "./style.scss";

export default function Portfolio() {
  return (
    <section className="portfolio_bg" aria-label="Портфолио">
      <div className="portfolio">
        <div className="portfolio__header">
          Портфолио
        </div>
        <ul className="portfolio__list-projects">
          {listProjects.map((project) => (
            <Project
              key={project._id}
              project={project}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
