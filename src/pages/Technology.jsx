import React from 'react'
import texh01 from '../assets/tech01.png'
import angular from '../assets/technologies/angular.png'
import html from '../assets/technologies/html.png'
import react from '../assets/technologies/react.png'
import python from '../assets/technologies/python.png'
import java from '../assets/technologies/java.png'
import nodeJs from '../assets/technologies/node-js.png'
import php from '../assets/technologies/php.png'
import swift from '../assets/technologies/swift.png'
import android from '../assets/technologies/android.png'
import kotlin from '../assets/technologies/kotlin.png'
import flutter from '../assets/technologies/flutter.png'

const Technology = () => {
    return (
        <>
            <section className="about-block pt-120 pb-120">
                <div className="container">
                    <div className="row justify-content-between align-items-center">
                        <div className="col-xxl-6 col-lg-7">
                            <div className="section-text">
                                <span className="fs-two heading mb-6"><span>Technologies</span> and <span>Platforms</span> That We
                                    Work With</span>
                                <p>Shadowstrike is a one-stop solution for all your web requirements. Through our constant delivery
                                    of
                                    efficient and world-class digital projects, we have become one of the top Mobile App &amp;
                                    software service providers in worldwide. We provide quick solutions to businesses' on-demand
                                    needs, and that's why clients prefer us. From digital consultancy to AI-oriented app, IoT,
                                    and web solutions, we have built up expertise in the following Services.</p>
                            </div>
                        </div>
                        <div className="col-xxl-6 col-lg-8 order-1 order-lg-0">
                            <div className="sec-img mw-100 position-relative d-center">
                                <img src={texh01} alt="sec-img" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="our-games team-members overflow-hidden pt-120 pb-120">
                <div className="container singletab">
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <div className="section-text text-center">
                                <span className="fs-two heading mb-6">All <span>Technology</span></span>
                                <p>Our projects feature unique mechanics, fine-tuned game play, and eye-catching visual
                                    style.Over 100 million people play our games every month</p>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-lg-12 text-center">
                            <ul className="nav tablinks technologies_tabs flex-wrap d-center mb-6 mb-sm-10 d-inline-flex gap-4 p-3 tab-area">
                                <li className="nav-item">
                                    <button className="nav-link active">
                                        Web Front End
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link">
                                        Back End
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link">
                                        Mobile Technology
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link">
                                        DevOps
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link">
                                        Game Development
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link">
                                        Database
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-lg-12">
                            <div className="tabcontents">
                                <div className="tabitem active">
                                    <div className="row cus-mar">
                                        <div className="col-lg-6">
                                            <div className="section-text">
                                                <h4 className="sub-title">Development</h4>
                                                <span className="fs-two heading mb-6">Web Front End</span>
                                                <p>Our web front-end development services redefine digital experiences by
                                                    seamlessly integrating creativity and functionality. Leveraging cutting-edge
                                                    technologies and industry best practices, our team develops visually
                                                    stunning and user-friendly interfaces that mesmerize audiences and enhance
                                                    user engagement. From responsive design to intuitive navigation, we
                                                    prioritize user experience to ensure that our client's websites are complete
                                                    and exceed the expectations of modern online users. Trust us to transform
                                                    your ideas into captivating web experiences that leave a lasting impression.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 my-auto">
                                            <div className="technology_icon">
                                                <img src={angular} alt />
                                                <span>Angular JS</span>
                                            </div>
                                            <div className="technology_icon">
                                                <img src={html} alt />
                                                <span>HTML 5</span>
                                            </div>
                                            <div className="technology_icon">
                                                <img src={react} alt />
                                                <span>React Js</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tabitem">
                                    <div className="row cus-mar">
                                        <div className="row cus-mar">
                                            <div className="col-lg-6">
                                                <div className="section-text">
                                                    <h4 className="sub-title">Development</h4>
                                                    <span className="fs-two heading mb-6">Back End Technologies</span>
                                                    <p>Back-end development services play a crucial role in powering the
                                                        functionality of websites and applications, serving as the engine that
                                                        drives the seamless operation of digital platforms. From managing
                                                        databases and server-side logic to ensuring data security and
                                                        scalability, our back-end developers work diligently to create robust
                                                        and efficient systems. With a dedicated team of seasoned developers, we
                                                        leverage cutting-edge technologies to ensure optimal performance,
                                                        security, and flexibility, positioning ourselves as the go-to partner
                                                        for businesses seeking a reliable and efficient back-end infrastructure.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 my-auto">
                                                <div className="technology_icon">
                                                    <img src={python} alt />
                                                    <span>Python</span>
                                                </div>
                                                <div className="technology_icon">
                                                    <img src={java} alt />
                                                    <span>Java</span>
                                                </div>
                                                <div className="technology_icon">
                                                    <img src={nodeJs} alt />
                                                    <span>Node Js</span>
                                                </div>
                                                <div className="technology_icon">
                                                    <img src={php} alt />
                                                    <span>PHP</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tabitem">
                                    <div className="row cus-mar">
                                        <div className="row cus-mar">
                                            <div className="col-lg-6">
                                                <div className="section-text">
                                                    <h4 className="sub-title">Development</h4>
                                                    <span className="fs-two heading mb-6">Mobile Technology</span>
                                                    <p>Mobile technology app development services play a pivotal role in the
                                                        ever-evolving digital landscape, enabling businesses to reach their
                                                        audiences seamlessly through smartphones and tablets. Our skilled mobile
                                                        app developers leverage cutting-edge technologies to create
                                                        user-friendly interfaces and robust functionalities, ensuring a
                                                        competitive edge in the app market. With a focus on user experience and
                                                        functionality, our mobile technology app development services empower
                                                        your businesses to engage and connect with your target audience in the
                                                        mobile-first era.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 my-auto">
                                                <div className="technology_icon">
                                                    <img src={swift} alt />
                                                    <span>Swift</span>
                                                </div>
                                                <div className="technology_icon">
                                                    <img src={java} alt />
                                                    <span>JAVA</span>
                                                </div>
                                                <div className="technology_icon">
                                                    <img src={android} alt />
                                                    <span>Android</span>
                                                </div>
                                                <div className="technology_icon">
                                                    <img src={kotlin} alt />
                                                    <span>kotlin</span>
                                                </div>
                                                <div className="technology_icon">
                                                    <img src={flutter} alt />
                                                    <span>Flutter</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tabitem">
                                    <div className="row cus-mar">
                                        <div className="row cus-mar">
                                            <div className="col-lg-6">
                                                <div className="section-text">
                                                    <h4 className="sub-title">Web and App</h4>
                                                    <span className="fs-two heading mb-6">DevOps</span>
                                                    <p>DevOps is a methodology that aims to improve the collaboration between
                                                        software developers and IT operations professionals. Its vision is also
                                                        to enhance the efficiency of software delivery and infrastructure
                                                        management. With a commitment to streamlining workflows, improving
                                                        collaboration, and automating processes, our DevOps Solutions empower
                                                        organizations to achieve continuous integration and delivery. Leveraging
                                                        cutting-edge technologies and a team of seasoned experts, we ensure
                                                        seamless integration, rapid deployment, and efficient management of
                                                        software development lifecycles, ultimately accelerating innovation and
                                                        improving overall business agility.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 my-auto">
                                                <div className="technology_icon">
                                                    <img src="assets/images/technologies/microservice.png" alt />
                                                    <span>Microservice</span>
                                                </div>
                                                <div className="technology_icon">
                                                    <img src="assets/images/technologies/github.png" alt />
                                                    <span>Git/Github</span>
                                                </div>
                                                <div className="technology_icon">
                                                    <img src="assets/images/technologies/aws.png" alt />
                                                    <span>AWS</span>
                                                </div>
                                                <div className="technology_icon">
                                                    <img src="assets/images/technologies/kubernetes.png" alt />
                                                    <span>Kubernetes</span>
                                                </div>
                                                <div className="technology_icon">
                                                    <img src="assets/images/technologies/docker.png" alt />
                                                    <span>Docker</span>
                                                </div>
                                                <div className="technology_icon">
                                                    <img src="assets/images/technologies/jenkins.png" alt />
                                                    <span>Jenkins</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tabitem">
                                    <div className="row cus-mar">
                                        <div className="row cus-mar">
                                            <div className="col-lg-6">
                                                <div className="section-text">
                                                    <h4 className="sub-title">Game Development</h4>
                                                    <span className="fs-two heading mb-6">Game Development</span>
                                                    <p>Shadowstrike is a cutting-edge game development company that stands at the
                                                        forefront of the gaming industry. Renowned for our innovative approach
                                                        and commitment to quality, we offer a progressive and end-to-end game
                                                        development service that fulfills all modern-day game app requirements
                                                        from the player's perspective. With a talented team of developers,
                                                        designers, and creatives, the company pushes the boundaries of
                                                        technology to create memorable games that resonate with players
                                                        worldwide. Our skilled developers, well-versed in state-of-the-art game
                                                        engines and technologies, create immersive gaming adventures that
                                                        connect with players.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 my-auto">
                                                <div className="technology_icon">
                                                    <img src="assets/images/technologies/unity_brands.png" alt />
                                                    <span>Unity</span>
                                                </div>
                                                <div className="technology_icon">
                                                    <img src="assets/images/technologies/SmartFoxServer.png" alt />
                                                    <span>SmartFoxServer</span>
                                                </div>
                                                <div className="technology_icon">
                                                    <img src="assets/images/technologies/Unreal_Engine.png" alt />
                                                    <span>Unreal Engine</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tabitem">
                                    <div className="row cus-mar">
                                        <div className="row cus-mar">
                                            <div className="col-lg-6">
                                                <div className="section-text">
                                                    <h4 className="sub-title">Database</h4>
                                                    <span className="fs-two heading mb-6">Database</span>
                                                    <p>Database Development is a well-established process of creating a user interface data application. This application is operated in to modify, download, and upload data from any centralized database access. With a team of skilled developers and data architects, we offer tailored services ranging from database design and optimization to migration and maintenance. Our commitment to cutting-edge technologies ensures clients benefit from scalable, efficient, and secure database systems, empowering organizations to harness the full potential of their data for strategic decision-making and improved operational efficiency.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 my-auto">
                                                <div className="technology_icon">
                                                    <img src="assets/images/technologies/mysql.png" alt />
                                                    <span>MySQL</span>
                                                </div>
                                                <div className="technology_icon">
                                                    <img src="assets/images/technologies/postgresql.png" alt />
                                                    <span>PostgreSQL</span>
                                                </div>
                                                <div className="technology_icon">
                                                    <img src="assets/images/technologies/mongodb.png" alt />
                                                    <span>MongoDB</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>

    )
}

export default Technology