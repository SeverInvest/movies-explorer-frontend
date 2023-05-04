import images from "../../../images";
import CustomLink from "../CustomLink";

export default function Logo() {
    return (
      <CustomLink
        linkTo="/"
        className="menu__link_logo"
      >
        <img src={images.logo} alt="логотип" className="menu__logo" />
      </CustomLink>
    )
  };
