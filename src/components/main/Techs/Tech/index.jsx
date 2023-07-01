export default function Tech({ techName, children, ...restProps }) {
  return (
    <li className="techs__item">
      {children}
      <p className="techs__text">{techName}</p>
      </li>
  );
}