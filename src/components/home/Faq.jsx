import React from "react";
import faqFrame from '../../assets/abs-items/faq-frame.png'

const Faq = () => {
  return (
    <section className="faqs-section position-relative">
      <div className="shape-area">
        <img src={faqFrame} className="shape-1" alt="icon" />
        <img src={faqFrame} className="shape-2" alt="icon" />
      </div>

      <div className="overlay pt-120 pb-120">
        <div className="container position-relative cus-z1">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-7">
              <div className="section-header text-center">
                <span className="fs-two heading mb-6">
                  Harness Our Mobile <span>Game Development Expertise</span>
                </span>
                <p>
                  Create a game to excite your users across all platforms. Our game development services
                  include concept enhancement, vision art, character design, animation, game mechanics,
                  programming, and testing. With the best game developers, we will make your gaming
                  desires a reality.
                </p>
              </div>
            </div>
          </div>

          <div className="row d-flex justify-content-between">
            <div className="col-xl-7 col-lg-7 mx-auto">
              <div className="accordion" id="accordionFaqs">

                {/* 2D/3D Game Development */}
                <div className="accordion-item">
                  <h5 className="accordion-header" id="headingOne">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="false"
                      aria-controls="collapseOne"
                    >
                      2D/3D Game Development
                    </button>
                  </h5>
                  <div
                    id="collapseOne"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionFaqs"
                  >
                    <div className="accordion-body">
                      <p>
                        Crafted with cutting-edge technology and developed by skilled game
                        developers, our 2D and 3D games become sensations immediately. Our 2D & 3D
                        game development services are composed of rich features and elements.
                      </p>
                    </div>
                  </div>
                </div>

                {/* AR/VR Game Development */}
                <div className="accordion-item">
                  <h5 className="accordion-header" id="headingTwo">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      AR/VR Game Development
                    </button>
                  </h5>
                  <div
                    id="collapseTwo"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingTwo"
                    data-bs-parent="#accordionFaqs"
                  >
                    <div className="accordion-body">
                      <p>
                        We build immersive AR & VR games, delivering players a compelling and
                        real-time playing experience. Our games leverage high-fidelity graphics,
                        interactive gameplay, and leading AR/VR frameworks, platforms, and devices.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Metaverse Game Development */}
                <div className="accordion-item">
                  <h5 className="accordion-header" id="headingThree">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseThree"
                      aria-expanded="false"
                      aria-controls="collapseThree"
                    >
                      Metaverse Game Development
                    </button>
                  </h5>
                  <div
                    id="collapseThree"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingThree"
                    data-bs-parent="#accordionFaqs"
                  >
                    <div className="accordion-body">
                      <p>
                        We deliver an immersive gaming experience with 3D virtual development for a
                        metaverse universe. We contain immersive metaverse games, offering
                        experiences that develop with their communities using top metaverse
                        features, such as interactivity, user-generated content, and social
                        connectivity.
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
