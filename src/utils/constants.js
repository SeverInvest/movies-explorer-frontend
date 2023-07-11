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
  SiGit
} from "react-icons/si";
import { FaYandex } from "react-icons/fa6";

export const SCREEN_MOB = 480;
export const SCREEN_TAB = 768;
export const SCREEN_DES = 1280;
export const DURATION_FILM = 40; // 40 minutes
export const PAGINATION_MIN = 5;
export const PAGINATION_MAX = 7;
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
]

