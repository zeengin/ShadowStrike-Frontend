import React, { useEffect } from "react";
import $ from "jquery";
import "slick-carousel";
import member1 from "../../assets/team-members-1.png"
import member2 from "../../assets/team-members-2.png"
import member3 from "../../assets/team-members-3.png"
import member4 from "../../assets/team-members-4.png"
import member5 from "../../assets/team-members-5.png"
import member6 from "../../assets/team-members-6.png"


const Team = () => {

  useEffect(() => {
    // team-carousel
    const slidesShowTeam = 4;
    $(".team-carousel").not('.slick-initialized').slick({
      infinite: false,
      autoplay: false,
      centerMode: false,
      centerPadding: "60px",
      focusOnSelect: false,
      speed: 500,
      slidesToShow: slidesShowTeam,
      slidesToScroll: 1,
      arrows: false,
      prevArrow: "<button type='button' aria-label='Slide Prev' class='arafat-prev box-style pull-left'><i class=\"material-symbols-outlined mat-icon\"  aria-hidden='true'>arrow_right_alt</i> <span class='bg-obj'></span> </button>",
      nextArrow: "<button type='button' aria-label='Slide Next' class='arafat-next box-style pull-right'><i class=\"material-symbols-outlined mat-icon\"  aria-hidden='true'>arrow_right_alt</i> <span class='bg-obj'></span> </button>",
      dots: false,
      dotsClass: 'section-dots',
      customPaging: function (slider, i) {
        var slideNumber = (i + 1),
          totalSlides = slider.slideCount;
        return '<a class="dot" role="button" title="' + slideNumber + ' of ' + totalSlides + '"><span class="string">' + slideNumber + '/' + totalSlides + '</span></a>';
      },
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 3,
          }
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 3,
            centerPadding: "30px",
            infinite: true,
            autoplay: true,
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            arrows: false,
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            arrows: false,
          }
        },
      ]
    });
    const teamSlider = $(".team-carousel");
    var scrollCount = null;
    var scroll = null;
    teamSlider.on('wheel', function (e) {
      e.preventDefault();
      clearTimeout(scroll);
      scroll = setTimeout(function () { scrollCount = 0; }, 200);
      if (scrollCount) return 0;
      scrollCount = 1;
      const delta = e.originalEvent.deltaY;
      const sliderElement = $(this);
      const slideCount = sliderElement.slick('getSlick').slideCount;
      const currentSlide = sliderElement.slick('slickCurrentSlide');
      const isLastSlide = currentSlide === slideCount - slidesShowTeam;
      const isFirstSlide = currentSlide === 0;
      if (isLastSlide && delta > 0) {
        window.scrollBy(0, 100);
      } else if (isFirstSlide && delta < 0) {
        window.scrollBy(0, -100);
      } else {
        if (delta < 0) {
          sliderElement.slick('slickPrev');
        } else {
          sliderElement.slick('slickNext');
        }
      }
    });
  }, [])

  return (
    <section className="team-members pb-120 bg-transparent">
      {/* Section Header */}
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="section-header text-center">
              <h4 className="sub-title">
                We Have A Passion For <span>Games!</span>
              </h4>
              <span className="fs-two heading mb-6">
                Our team is next-level. And we're <span>proud of it.</span>
              </span>
              <p>
                Our dynamic team blends tech-savvy developers, imaginative artists, analytical minds,
                and visionary product managers. Driven to innovate, we bring excitement to every
                project
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Carousel */}
      <div className="container-fluid">
        <div className="team-carousel">

          {/* Slide 1 */}
          <div className="slide-area">
            <div className="single-slider">
              <div className="thumb">
                <img src={member1} alt="Jane Cooper" />
              </div>
              <div className="title-area">
                <h4 className="pt-8 pb-2">
                  <a href="index.html">Jane Cooper</a>
                </h4>
                <span className="designation">Animator</span>
              </div>
            </div>
          </div>

          {/* Slide 2 */}
          <div className="slide-area">
            <div className="single-slider">
              <div className="thumb">
                <img src={member2} alt="Esther Howard" />
              </div>
              <div className="title-area">
                <h4 className="pt-8 pb-2">
                  <a href="index.html">Esther Howard</a>
                </h4>
                <span className="designation">Artist</span>
              </div>
            </div>
          </div>

          {/* Slide 3 */}
          <div className="slide-area">
            <div className="single-slider">
              <div className="thumb">
                <img src={member3} alt="Dianne Russell" />
              </div>
              <div className="title-area">
                <h4 className="pt-8 pb-2">
                  <a href="index.html">Dianne Russell</a>
                </h4>
                <span className="designation">Animator</span>
              </div>
            </div>
          </div>

          {/* Slide 4 */}
          <div className="slide-area">
            <div className="single-slider">
              <div className="thumb">
                <img src={member4} alt="Marvin McKinney" />
              </div>
              <div className="title-area">
                <h4 className="pt-8 pb-2">
                  <a href="index.html">Marvin McKinney</a>
                </h4>
                <span className="designation">Brand & Culture Manager</span>
              </div>
            </div>
          </div>

          {/* Slide 5 */}
          <div className="slide-area">
            <div className="single-slider">
              <div className="thumb">
                <img src={member5} alt="Kristin Watson" />
              </div>
              <div className="title-area">
                <h4 className="pt-8 pb-2">
                  <a href="index.html">Kristin Watson</a>
                </h4>
                <span className="designation">Developer</span>
              </div>
            </div>
          </div>

          {/* Slide 6 */}
          <div className="slide-area">
            <div className="single-slider">
              <div className="thumb">
                <img src={member6} alt="Bessie Cooper" />
              </div>
              <div className="title-area">
                <h4 className="pt-8 pb-2">
                  <a href="index.html">Bessie Cooper</a>
                </h4>
                <span className="designation">Artist</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Team;
