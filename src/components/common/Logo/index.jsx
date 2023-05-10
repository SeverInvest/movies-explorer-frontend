import "./style.scss";
import images from "../../../images";
import CustomLink from "../CustomLink";

export default function Logo() {
    return (
      <CustomLink
        linkTo="/"
        className="logo"
      >
        <img src={images.logo} alt="логотип" className="logo__img" />
      </CustomLink>
    )
  };
