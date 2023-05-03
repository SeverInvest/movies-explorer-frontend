import Promo from "../Promo";
import AboutProject from "../AboutProject";
import Techs from "../Techs";
import AboutMe from "../AboutMe";
import Portfolio from "../Portfolio";
import Footer from "../../common/Footer";

export default function Main() {
  return (
    <>
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
