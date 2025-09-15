import { useEffect, useRef } from "react";
import aboutImg from "../../assets/about-block-bg.png";

function About() {
  const sectionRef = useRef(null);
  const animated = useRef(false);

  useEffect(() => {
    const animateCount = (el, finalValue, duration = 2000) => {
      let start = 0;
      const startTime = performance.now();

      const update = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1); // 0 → 1
        const value = Math.floor(progress * finalValue);

        el.innerHTML = value;

        if (progress < 1) {
          requestAnimationFrame(update);
        }
      };

      requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animated.current) {
            animated.current = true;

            // Animate counters
            const counters = entry.target.querySelectorAll("[data-counter-final]");
            counters.forEach((el) => {
              const finalValue = parseInt(el.getAttribute("data-counter-final"), 10);
              animateCount(el, finalValue, 2000);
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="about-block pt-120 pb-120">
      <div className="container">
        <div className="row justify-content-between align-items-center">
          {/* Left image */}
          <div className="col-xxl-6 col-lg-6 order-1 order-lg-0">
            <div className="sec-img mw-100 position-relative d-center">
              <img src={aboutImg} alt="About Shadowstrike" />
              <div className="experience p-2 p-lg-4 position-absolute bottom-0 end-0">
                <div className="experience-wrap p-3 px-lg-5 py-lg-8 d-inline-flex d-center gap-3">
                  <div className="counters d-center">
                    <span
                      className="fs-three heading"
                      data-counter-final="10"
                    >
                      0
                    </span>
                    <span className="fs-three heading symbol">+</span>
                  </div>
                  <span className="w-25 d-inline-block">Years Of Experience</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right text & counters */}
          <div className="col-xxl-5 col-lg-6">
            <div className="section-text">
              <h4 className="sub-title">
                Welcome to <span>Shadowstrike</span> Studios
              </h4>
              <span className="fs-two heading mb-6">
                Bringing people together through <span>the power of play</span>
              </span>
              <p>
                As Game Shadowstrike, we continue to open doors to new worlds every day
                and we are working excitedly for creating new games and unique ideas!
              </p>
            </div>

            <div className="row">
              <div className="col-sm-6">
                <div className="counter-item mb-8 pb-4">
                  <div className="counters mb-3 d-flex align-items-center">
                    <span
                      className="fs-three heading"
                      data-counter-final="500"
                    >
                      0
                    </span>
                    <span className="fs-three heading">M</span>
                    <span className="fs-three heading symbol">+</span>
                  </div>
                  <span className="name-area fs-seven">
                    Downloads, or 6% of the world’s population.
                  </span>
                </div>
              </div>

              
             {/* Counter 2 */}
              <div className="col-sm-6">
                <div className="counter-item mb-8 pb-4">
                  <div className="counters mb-3 d-flex align-items-center">
                    <span
                      className="odometer fs-three heading"
                      data-counter-final="2"
                    >
                      0
                    </span>
                    <span className="fs-three heading">M</span>
                    <span className="fs-three heading symbol">+</span>
                  </div>
                  <span className="name-area fs-seven">
                    Our games have over 20 million unique daily users.
                  </span>
                </div>
              </div>

              {/* Counter 3 */}
              <div className="col-sm-6">
                <div className="counter-item mb-8 pb-4">
                  <div className="counters mb-3 d-flex align-items-center">
                    <span
                      className="odometer fs-three heading"
                      data-counter-final="52"
                    >
                      0
                    </span>
                    <span className="fs-three heading symbol">+</span>
                  </div>
                  <span className="name-area fs-seven">
                    Experts collaborating to blow your mind in one place.
                  </span>
                </div>
              </div>

              {/* Counter 4 */}
              <div className="col-sm-6">
                <div className="counter-item mb-8 pb-4">
                  <div className="counters mb-3 d-flex align-items-center">
                    <span
                      className="odometer fs-three heading"
                      data-counter-final="4"
                    >
                      0
                    </span>
                    <span className="fs-three heading">k</span>
                    <span className="fs-three heading symbol">+</span>
                  </div>
                  <span className="name-area fs-seven">
                    The Shadowstrike Studio is launching with 4K+ Games.
                  </span>
                </div>
              </div>
            </div>

            <div className="btn-area alt-bg mt-2">
              <a href="/entertainment" className="box-style btn-box d-center">
                Explore Our Games
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
