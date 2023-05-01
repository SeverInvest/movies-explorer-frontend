import CustomLink from "../../common/CustomLink";
import "./style.scss";

export default function Project( { project }) {

  return (
    <li className='project'>
        <CustomLink
          linkTo={project.link_to_github}
          textLink={project.name}
          option='big'
        />
        <CustomLink
          linkTo={project.link_to_server || project.link_to_github}
          textLink='↗'
          option='arrow'
        />
    </li>
  );
}
