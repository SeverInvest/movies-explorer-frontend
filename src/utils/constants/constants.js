// иконки тенологий
import {
  SiMongodb,
  SiMongoose,
  SiGithub,
  SiExpress,
  SiJavascript,
  SiRedux,
  SiCss3,
  SiHtml5,
  SiSass,
  SiNodedotjs,
  SiReact,
  SiAxios,
  SiMocha,
  SiDotenv,
  SiJsonwebtokens,
  SiGit,
  SiYoutube
} from "react-icons/si";
import { FaYandex } from "react-icons/fa6";

export const CONSTANTS = {
  SCREEN_MOB: 480,
  SCREEN_TAB: 768,
  SCREEN_DES: 1280,
  DURATION_FILM: 40, // 40 minutes
  PAGINATION_MIN: 5,
  PAGINATION_MAX: 7,
}

export const TECHS_ITEMS = [
  { techName: "HTML5", techImage: SiHtml5, techLink: "https://www.w3.org" },
  { techName: "CSS", techImage: SiCss3, techLink: "https://www.w3.org/Style/CSS/specs.en.html" },
  { techName: "Sass", techImage: SiSass, techLink: "https://sass-lang.su/documentation" },
  { techName: "JS", techImage: SiJavascript, techLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
  { techName: "Node.js", techImage: SiNodedotjs, techLink: "https://nodejs.org/ru/docs" },
  { techName: "Express.js", techImage: SiExpress, techLink: "https://expressjs.com/en/api.html" },
  { techName: "REACT", techImage: SiReact, techLink: "https://react.dev/blog/2023/03/16/introducing-react-dev" },
  { techName: "MongoDB", techImage: SiMongodb, techLink: "https://www.mongodb.com/docs/manual/" },
  { techName: "Mongoose", techImage: SiMongoose, techLink: "https://mongoosejs.com/docs/guide.html" },
  { techName: "Git", techImage: SiGit, techLink: "https://github.com/git-guides" },
  { techName: "Github", techImage: SiGithub, techLink: "https://github.com/" },
  { techName: "Yandex.cloud", techImage: FaYandex, techLink: "https://cloud.yandex.ru/" },
  { techName: "Redux", techImage: SiRedux, techLink: "https://redux.js.org/" },
  { techName: "Axios", techImage: SiAxios, techLink: "https://axios-http.com/docs/intro" },
  { techName: "Mocha", techImage: SiMocha, techLink: "https://mochajs.org/api/mocha" },
  { techName: "Dotenv", techImage: SiDotenv, techLink: "https://www.dotenv.org/docs/" },
  { techName: "Webtokens", techImage: SiJsonwebtokens, techLink: "https://www.npmjs.com/package/jsonwebtoken" },
  { techName: "Youtube API", techImage: SiYoutube, techLink: "https://developers.google.com/youtube/v3?hl=ru" },
]
