import { Helmet } from "react-helmet";
import About from "../components/home/About";
import Banner from "../components/home/Banner";
import Contact from "../components/home/Contact";
import Faq from "../components/home/Faq";
import JobOpens from "../components/home/JobOpens";
import OurGames from "../components/home/OurGames";
import OurServices from "../components/home/OurServices";
import Working from "../components/home/Working";

function Home() {
  return(
    <>
    <Helmet>
    <title>Welcome to Shadowstrike</title>
    <meta name="description" content="Games Applications"></meta>
    </Helmet>
    <Banner />
    <About />
    <OurGames />
    <OurServices />
    <JobOpens />
    <Working />
    <Faq />
    <Contact />
    </>
  );
}

export default Home;
