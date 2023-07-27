import CustomLink from "../../common/CustomLink";

export default function HeaderVideos(
  {
    option, 
    sideBar = false,
    ...restProps
  }
) {
  const classNameText = `${sideBar ? "side-bar__text" : "header__text"}`;
  const classNameLink = `${sideBar ? "side-bar__link" : "header__link-videos"}`;

  return (
    <>
      {(option === "videos") ?
        <p className={classNameText}> Видео </p>
        :
        <CustomLink
          className={classNameLink}
          linkTo="/videos"
          textLink="Видео"
          {...restProps}
        />
      }
    </>
  )
};
