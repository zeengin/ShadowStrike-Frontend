import novaClicker from "../../assets/games/Nova-Clicker-x22.jpg";
import fastFoodRush from "../../assets/games/fast-food-rush-xs.jpg";
import cookieClickerPro from "../../assets/games/Cookie-Clicker-Pro-Game-xs2.jpg";
import stickman from "../../assets/games/Stack-Fire-Ball-Game-xs.jpg"
import drift from "../../assets/games/Drift-King-xs.jpg"
import highway from "../../assets/games/Highway-Traffic-2-xs.jpg"
import masked from "../../assets/games/Masked-Special-Forces-FPS-xs.jpg"
import { useUser } from "../../context/UserContext";
import toast, { Toaster } from "react-hot-toast";

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
    {
      id: 4,
      title: "Stickman GTA City",
      thumb: stickman,
      img: stickman,
      description:
        "You've been digging the internet for ages, looking for a free GTA game to play on your browser, only to end up with games that disappoint faster than a balloon losing air. You might have given up hope, reminiscing about the days of cruising through GTA San Andreas or Vice City with your bro. Think of how much you missed even hearing that iconic sound, the one that plays right as the screen fades to black with a bold 'Wasted!' slapped across it?",
      link: "https://cloud.onlinegames.io/games/2024/unity3/stickman-gta-city/index-og.html",
    },
    {
      id: 5,
      title: "Drift King",
      thumb: drift,
      img: drift,
      description:
        "Drift King stands out among online drift games, offering a unique experience where you can witness the smoke you leave behind from the rearview window. This game surrounds you in every realistic detail, from its premium 3D visuals to the choice of 10 sports cars and 6 maps. The comprehensive tuning options further enhance the game, making it a complete package for drifting enthusiasts.",
      link: "https://www.onlinegames.io/games/2024/unity/drift-king/index.html",
    },
    {
      id: 6,
      title: "Highway Traffic",
      thumb: highway,
      img: highway,
      description:
        `Highway Traffic game is centered around driving down the highway, dodging other cars, and avoiding accidents. It gets tricky because other vehicles are slowing down, speeding up or stopping abruptly, so you always have to keep your attention and be ready to make a quick maneuver. The longer you go without hitting other cars, the more points you collect and the more upgrades you can get. Highway Traffic gets challenging very quickly, so you must build up crazy driving skills to reach higher levels!`,
      link: "https://www.onlinegames.io/games/2022/unity/highway-traffic/index.html",
    },
    {
      id: 7,
      title: "Masked Special Forces",
      thumb: masked,
      img: masked,
      description:
        `Masked Special Forces is a multiplayer first-person shooter game with a myriad of customization options. The game puts you in the shoes of a commander in the battle arena. As a talented warrior, team up, strategize, and take down the opponents one by one. Access to an array of upgradable weapons, armory, kill messages, and victory dances on the main menu.`,
      link: "https://www.onlinegames.io/games/2022/unity2/masked-special-forces/index.html",
    },
  ];

  const { user, token, loading } = useUser();






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
                  <div className="col-md-6 col-lg-3" key={game.id}>
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
                           {user ? <a href={game.link} target="_blank" rel="noreferrer">
                              <h4 className="visible-slowly-bottom mb-1">
                                {game.title}
                              </h4>
                            </a> : 
                            <h4 onClick={() => {
                                toast.dismiss();
                                toast.error("Please register to play.");
                              }}
                               className="visible-slowly-bottom mb-1">
                                {game.title}
                              </h4>}
                          </div>
                        </div>

                        <p className="content_lines">{game.description}</p>

                        <div className="btn-area alt-bg mt-2">
                          {!user ?
                            <span
                              className="box-style btn-box d-center cursor-pointer"
                              onClick={() => {
                                toast.dismiss();
                                toast.error("Please register to play.");
                              }}
                              style={{cursor:"pointer"}}
                            >
                              Play Games
                            </span>
                            :
                            <a
                              href={game.link}
                              className="box-style btn-box d-center cursor-pointer"
                              target="_blank"
                              rel="noreferrer"
                              style={{cursor:"pointer"}}
                            >
                              Play Games
                            </a>}
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
       <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            zIndex:1000000000000000,
            background: "#1e1e1e",   // dark background
            color: "#fff",           // white text
            borderRadius: "8px",
            padding: "12px 16px",
            marginTop:"50px"
          },
          success: {
            style: { background: "#1f3d2b", color: "#b6f2c8" }, // greenish
            iconTheme: {
              primary: "#22c55e",
              secondary: "#fff",
            },
          },
          error: {
            style: { background: "#3d1f1f", color: "#f2b6b6" }, // reddish
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
          },
        }}
      />
    </section>
  );
}

export default OurGames;
