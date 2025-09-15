import React from "react";

const JobOpens = () => {
  return (
    <section className="job-opens features-games pt-120 pb-120">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="section-text text-center">
              <span className="fs-two heading mb-6 w-75 m-auto">
                From Concept to Console:
                <span>Game Development</span> Process We Follow
              </span>
              <p>
                We bear concurrently creativity, technology, and innovation to
                draft games that will leave you enchanted. From idealization to
                performance, we obey the accurate game development process.
              </p>
            </div>
          </div>
        </div>

        <div className="row cus-mar">
          {/* Project Requirement Analysis */}
          <div className="col-md-6">
            <div className="single-box flex-wrap box-style box-second p-3 p-md-6 d-flex gap-4 gap-md-6 justify-content-between">
              <div className="content-box d-flex flex-wrap gap-4 gap-md-6">
                <div className="icon-box d-inline-flex d-center">
                  <i className="material-symbols-outlined fs-three">newspaper</i>
                </div>
                <div className="info-box">
                  <a href="#">
                    <h5>Project Requirement Analysis</h5>
                  </a>
                  <span className="fs-seven mt-2">
                    We begin with an exciting conceptualization stage, where we
                    brainstorm, research, and explore market trends to come up
                    with a renowned game idea.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Concept Art */}
          <div className="col-md-6">
            <div className="single-box flex-wrap box-style box-second p-3 p-md-6 d-flex gap-4 gap-md-6 justify-content-between">
              <div className="content-box d-flex flex-wrap gap-4 gap-md-6">
                <div className="icon-box d-inline-flex d-center">
                  <i className="material-symbols-outlined fs-three">draw</i>
                </div>
                <div className="info-box">
                  <a href="#">
                    <h5>Concept Art</h5>
                  </a>
                  <span className="fs-seven mt-2">
                    Concept art is our second step, where our innovative team of
                    animators, rigging artists, modelers, and developers builds
                    the 2D and 3D art & graphics for the gaming equipment,
                    qualities, environments, support, and more.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Game Development */}
          <div className="col-md-6">
            <div className="single-box flex-wrap box-style box-second p-3 p-md-6 d-flex gap-4 gap-md-6 justify-content-between">
              <div className="content-box d-flex flex-wrap gap-4 gap-md-6">
                <div className="icon-box d-inline-flex d-center">
                  <i className="material-symbols-outlined fs-three">frame_source</i>
                </div>
                <div className="info-box">
                  <a href="#">
                    <h5>Game Development</h5>
                  </a>
                  <span className="fs-seven mt-2">
                    In the development stage, our skilled game developers will
                    leverage their knowledge, game development skills, and
                    ability to work with various technologies and tools to
                    develop the game only the way you have defined in the
                    project scope.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Testing and Automation */}
          <div className="col-md-6">
            <div className="single-box flex-wrap box-style box-second p-3 p-md-6 d-flex gap-4 gap-md-6 justify-content-between">
              <div className="content-box d-flex flex-wrap gap-4 gap-md-6">
                <div className="icon-box d-inline-flex d-center">
                  <i className="material-symbols-outlined fs-three">bug_report</i>
                </div>
                <div className="info-box">
                  <a href="#">
                    <h5>Testing and Automation</h5>
                  </a>
                  <span className="fs-seven mt-2">
                    Our QA team will test the entire game and will try to find
                    the bugs or defects that might have found their way during
                    the game development process. The QA engineers will test
                    the whole game before the game deployment phase.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Game Deployment */}
          <div className="col-md-6">
            <div className="single-box flex-wrap box-style box-second p-3 p-md-6 d-flex gap-4 gap-md-6 justify-content-between">
              <div className="content-box d-flex flex-wrap gap-4 gap-md-6">
                <div className="icon-box d-inline-flex d-center">
                  <i className="material-symbols-outlined fs-three">stadia_controller</i>
                </div>
                <div className="info-box">
                  <a href="#">
                    <h5>Game Deployment</h5>
                  </a>
                  <span className="fs-seven mt-2">
                    Do we help with the deployment process? Of course, yes.
                    Whether you need to release your gaming solution on the
                    Apple App Store, Google Play Store, or any other platform,
                    we are there for you. Our game developers provide the best
                    assistance to make your game available for your end users.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Support and Assistance */}
          <div className="col-md-6">
            <div className="single-box flex-wrap box-style box-second p-3 p-md-6 d-flex gap-4 gap-md-6 justify-content-between">
              <div className="content-box d-flex flex-wrap gap-4 gap-md-6">
                <div className="icon-box d-inline-flex d-center">
                  <i className="material-symbols-outlined fs-three">support_agent</i>
                </div>
                <div className="info-box">
                  <a href="#">
                    <h5>Support and Assistance</h5>
                  </a>
                  <span className="fs-seven mt-2">
                    Our game development team provides continuous maintenance
                    and support services to ensure that the game stays
                    up-to-date, functional, and appropriate to the target
                    audience. We observe user feedback and make updates and
                    improvements to the game as required, ensuring that your
                    game meets every industry standard and rule so you or your
                    game never meet any backlashes.
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default JobOpens;
