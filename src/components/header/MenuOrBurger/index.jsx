import images from "../../../images";
import CustomButton from '../../common/CustomButton';
import HeaderVideos from '../HeaderVideos';
import HeaderUsers from '../HeaderUsers';
import HeaderAccount from "../HeaderAccount";

export default function MenuOrBurger({
    option, typeScreen, setHamburgerOn
  }) {

    return (
      <>
        {(typeScreen === "desktop") ?
          <>
            <nav className="header__navigation header__navigation_middle">
              <HeaderVideos option={option} />
              <HeaderUsers option={option} />
            </nav>

            <nav className="header__navigation">
              <HeaderAccount />
            </nav>
          </>
          :
          <CustomButton
            className={`header__nav-btn ${option === "main" ? "header__nav-btn_main" : ""}`}
            type="button"
            onClick={(() => setHamburgerOn(true))}
          >
            <img
              src={images.burger}
              alt="открыть сайдбар"
              className="header__nav-btn-img"
            />
          </CustomButton>
        }
      </>
    )
  };
