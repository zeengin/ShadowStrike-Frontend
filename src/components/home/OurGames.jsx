import novaClicker from "../../assets/games/Nova-Clicker-x22.jpg";
import fastFoodRush from "../../assets/games/fast-food-rush-xs.jpg";
import cookieClickerPro from "../../assets/games/Cookie-Clicker-Pro-Game-xs2.jpg";

function OurGames() {
  const games = [
    {
      id: 1,
      title: "Nova Clicker",
      thumb: novaClicker,
      img: novaClicker,
      description:
        "Nova Clicker is an online idle game which starts you off with a single, smiley Nova, its name is FreezeNova. A simple tap or click on FreezeNova produces your first handful of stars. But don't be fooled, this clicker game quickly grows beyond basic tapping. Soon, you'll be managing an entire universe of quirky characters and powerful upgrades, all designed to make you the ultimate star tycoon.",
      link: "https://cloud.onlinegames.io/games/2024/construct/314/nova-clicker/index-og.html",
    },
    {
      id: 2,
      title: "Fast Food Rush",
      thumb: fastFoodRush,
      img: fastFoodRush,
      description:
        "You're at Burger King, sinking your teeth into a juicy cheeseburger and finishing it off in about 15 minutes flat. But just this once, before you head out, pause and take a quick look around. Employees are rushing nonstop, flipping sizzling patties, taking orders at the counter, pouring ice-cold drinks, and wiping down tables. At this point, running your own burger joint might seem pretty appealing, at least to some people.",
      link: "https://cloud.onlinegames.io/games/2025/unity/fast-food-rush/index-og.html",
    },
    {
      id: 3,
      title: "Cookie Clicker Pro",
      thumb: cookieClickerPro,
      img: cookieClickerPro,
      description:
        "Love cookies? Want to create the biggest cookie empire the internet has ever seen? Then Cookie Clicker Pro is exactly your game! It's a simple, addictively fun incremental game, packed with sweet strategies.",
      link: "https://cloud.onlinegames.io/games/2025/unity/cookie-clicker-pro/index-og.html",
    },
  ];

  return (
    <section className="our-games team-members index-two overflow-hidden pt-120 pb-120">
      <div className="container singletab">
        {/* Section Heading */}
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="section-text text-center">
              <h4 className="sub-title">
                Crafting Unforgettable <span>Gaming Experiences</span>
              </h4>
              <span className="fs-two heading mb-6">
                Our Games are <span>Vibrant</span> Worlds With
                <span>Charming</span> Characters
              </span>
              <p>
                Our projects feature unique mechanics, fine-tuned game play, and
                eye-catching visual style. Over 100 million people play our
                games every month
              </p>
            </div>
          </div>
        </div>

        {/* Games Grid */}
        <div className="row justify-content-center">
          <div className="col-lg-12">
            <div className="tabitem active">
              <div className="row cus-mar">
                {games.map((game) => (
                  <div className="col-md-6 col-lg-4" key={game.id}>
                    <div className="single-box">
                      {/* Game Thumbnail */}
                      <div className="position-relative d-center">
                        <img
                          src={game.thumb}
                          className="w-100 thumb-img"
                          alt={game.title}
                        />
                      </div>

                      {/* Game Info */}
                      <div className="info-area position-relative p-3 p-lg-5">
                        <div className="d-flex align-items-center gap-2 gap-sm-4 mb-3">
                          <div className="img-area">
                            <img
                              src={game.img}
                              className="rounded-4"
                              width="130"
                              alt={game.title}
                            />
                          </div>
                          <div className="info-area">
                            <a href={game.link} target="_blank" rel="noreferrer">
                              <h4 className="visible-slowly-bottom mb-1">
                                {game.title}
                              </h4>
                            </a>
                          </div>
                        </div>

                        <p className="content_lines">{game.description}</p>

                        <div className="btn-area alt-bg mt-2">
                          <a
                            href={game.link}
                            className="box-style btn-box d-center"
                            target="_blank"
                            rel="noreferrer"
                          >
                            Play Games
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OurGames;
