import React from "react";

const Working = () => {
  return (
    <section className="how-it-works pt-120 pb-120">
      <div className="container">
        <div className="row justify-content-center section-text">
          <div className="col-lg-6 text-center">
            <span className="fs-two heading mb-4">
              Our Game <span>Development</span>
            </span>
          </div>
        </div>

        <div className="row cus-mar">
          {/* Mobile Game Development */}
          <div className="col-sm-6 col-xl-4 position-relative d-center">
            <div className="single-box box-style box-first d-grid align-items-center text-center p-5 px-xl-8 py-xl-10">
              <div className="icon-box d-center m-auto">
                <i className="material-symbols-outlined fs-two">developer_mode</i>
              </div>
              <div className="title-area">
                <h4 className="mt-6 mb-3">Mobile Game Development</h4>
                <p>
                  Shadowstrike specializes in developing games for various mobile
                  operating systems, including Android, iOS and Microsoft. With our
                  extensive expertise and abundant resources, we create and develop
                  high-quality mobile games.
                </p>
              </div>
            </div>
          </div>

          {/* Desktop Game Development */}
          <div className="col-sm-6 col-xl-4 position-relative d-center">
            <div className="single-box box-style box-first d-grid align-items-center text-center p-5 px-xl-8 py-xl-10">
              <div className="icon-box d-center m-auto">
                <i className="material-symbols-outlined fs-two">web</i>
              </div>
              <div className="title-area">
                <h4 className="mt-6 mb-3">Desktop Game Development</h4>
                <p>
                  Shadowstrike provides expert desktop game development services by
                  leveraging our rich experience to create engaging games for desktop
                  platforms. Our dedicated team specializes in creating immersive
                  gameplay mechanics, visually stunning graphics and realistic audio
                  effects.
                </p>
              </div>
            </div>
          </div>

          {/* Web App Game Development */}
          <div className="col-sm-6 col-xl-4 position-relative d-center">
            <div className="single-box box-style box-first d-grid align-items-center text-center p-5 px-xl-8 py-xl-10">
              <div className="icon-box d-center m-auto">
                <i className="material-symbols-outlined fs-two">devices</i>
              </div>
              <div className="title-area">
                <h4 className="mt-6 mb-3">Web App Game Development</h4>
                <p>
                  At Shadowstrike, we create captivating web app games that keep
                  players engaged and coming back for more. We’ll bring your web app
                  game ideas to life and keep players entertained for hours.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Working;
