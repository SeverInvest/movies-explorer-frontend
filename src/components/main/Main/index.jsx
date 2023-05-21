import Promo from "../Promo";
import AboutProject from "../AboutProject";
import Techs from "../Techs";
import AboutMe from "../AboutMe";
import Portfolio from "../Portfolio";
import Header from "../../header/Header";
import Footer from "../../common/Footer";

export default function Main({loggedIn}) {
  return (
    <>
    <Header loggedIn={loggedIn} option="main" />
    <main>
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
    </main>
    <Footer />
    </>

  );
}
