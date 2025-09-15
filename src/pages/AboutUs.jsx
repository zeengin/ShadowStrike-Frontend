import { Helmet } from "react-helmet";
import Team from "../components/about/Team";
import About from "../components/home/About";


function AboutUs() {
    return (
        <>
            <Helmet>
                <title>About us</title>
            </Helmet>
            <About />
            <Team />
        </>
    )
}

export default AboutUs