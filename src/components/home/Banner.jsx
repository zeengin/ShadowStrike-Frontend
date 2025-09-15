import { Link } from "react-router-dom";
import Slider from "react-slick";


import topBottom from "../../assets/icon/top-bottom.png";

// Game thumbnails
import fastFoodRush from "../../assets/games/fast-food-rush-xs.jpg";
import cookieClickerPro from "../../assets/games/Cookie-Clicker-Pro-Game-xs2.jpg";
import driftKing from "../../assets/games/Drift-King-xs.jpg";
import novaClicker from "../../assets/games/Nova-Clicker-x22.jpg";
import highwayTraffic from "../../assets/games/Highway-Traffic-2-xs.jpg";
import capybaraClickerPro from "../../assets/games/Capybara-Clicker-Pro-xs.jpg";

// Game data grouped per slide
const featuredGames = [
  [
    {
      name: "Fast Food Rush",
      link: "https://cloud.onlinegames.io/games/2025/unity/fast-food-rush/index-og.html",
      img: fastFoodRush,
    },
    {
      name: "Cookie Clicker Pro",
      link: "https://cloud.onlinegames.io/games/2025/unity/cookie-clicker-pro/index-og.html",
      img: cookieClickerPro,
    },
    {
      name: "Drift King",
      link: "https://www.onlinegames.io/games/2024/unity/drift-king/index.html",
      img: driftKing,
    },
    {
      name: "Nova Clicker",
      link: "https://cloud.onlinegames.io/games/2024/construct/314/nova-clicker/index-og.html",
      img: novaClicker,
    },
  ],
  [
    {
      name: "Highway Traffic",
      link: "https://www.onlinegames.io/games/2022/unity/highway-traffic/index.html",
      img: highwayTraffic,
    },
    {
      name: "Masked Special Forces",
      link: "https://www.onlinegames.io/games/2022/unity2/masked-special-forces/index.html",
      img: driftKing, // replace with actual image
    },
    {
      name: "Stack Fire Ball",
      link: "https://www.onlinegames.io/games/2021/unity/stack-fire-ball/index.html",
      img: novaClicker, // replace with actual image
    },
    {
      name: "GTA Simulator",
      link: "https://www.onlinegames.io/games/2023/unity2/gta-simulator/index.html",
      img: fastFoodRush, // replace with actual image
    },
  ],
  [
    {
      name: "Capybara Clicker Pro",
      link: "https://www.onlinegames.io/games/2023/q2/capybara-clicker-pro/index.html",
      img: capybaraClickerPro,
    },
    {
      name: "Real Flight Simulator",
      link: "https://www.onlinegames.io/games/2023/unity/real-flight-simulator/index.html",
      img: driftKing, // replace with actual image
    },
    {
      name: "Stickman GTA City",
      link: "https://cloud.onlinegames.io/games/2024/unity3/stickman-gta-city/index-og.html",
      img: cookieClickerPro, // replace with actual image
    },
    {
      name: "Cookie Clicker Pro",
      link: "https://cloud.onlinegames.io/games/2025/unity/cookie-clicker-pro/index-og.html",
      img: cookieClickerPro,
    },
  ],
];

function Banner() {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
  };

  return (
    <section className="banner-section index-one overflow-hidden">
      <div className="overlay overflow-hidden">
        <div className="banner-content position-relative">
          <div className="container">
            <div className="row justify-content-between justify-content-center align-items-center">
              {/* Left side content */}
              <div className="col-xl-6 col-lg-7">
                <div className="main-content">
                  <div className="mb-8">
                    <h5 className="visible-slowly-bottom sub-title">
                      <span>Building Gaming Worlds</span>
                    </h5>
                    <span className="display-one">
                      We Craft Games
                      <br />
                      <span className="typed d-inline-block">Entertainment</span>
                    </span>
                    <p className="fs-four">
                      Developing games that are imaginative, fun and bringing
                      colors to the gaming world
                    </p>
                  </div>
                  <div className="btn-area alt-bg">
                    <Link
                      to="/entertainment"
                      className="box-style btn-box d-center"
                    >
                      Explore Our Games
                    </Link>
                  </div>
                </div>
              </div>

              {/* Right side Featured Games */}
              <div className="col-xl-6 col-lg-5 col-md-7 col-sm-9 mt-10 mt-lg-0 col-10">
                <div className="top-area d-flex justify-content-end gap-4 mb-5 align-items-end">
                  <img src={topBottom} alt="Top Bottom" />
                  <h4 className="mb-1">Featured Games</h4>
                </div>

                <div className="game-carousel pb-20">
                  <Slider {...sliderSettings}>
                    {featuredGames.map((slide, idx) => (
                      <div key={idx} className="slide-area">
                        <div className="single-slider row p-3 p-sm-5">
                          {slide.map((game, gIdx) => (
                            <div key={gIdx} className="thumb-wrapper col-6">
                              <a
                                href={game.link}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <div className="thumb">
                                  <img
                                    src={game.img}
                                    className="border p-2 shadow rounded-4"
                                    alt={game.name}
                                  />
                                </div>
                                <div className="app-download-title pt-1 text-center">
                                  <h6>{game.name}</h6>
                                </div>
                              </a>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
              {/* End Right Side */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Banner;
