import CustomLink from "../../../common/CustomLink";

export default function Tech({ techName, techLink, children, ...restProps }) {
  return (
    <li >
      <CustomLink linkTo={techLink} className="techs__item">
      {children}
      <p className="techs__text">{techName}</p>
      </CustomLink>
      </li>
  );
}