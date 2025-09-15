"use client";
import React, { useEffect } from "react";
import $ from "jquery";
import "slick-carousel";

const OurServices = () => {


    useEffect(() => {
       $(".services-carousel").not('.slick-initialized').slick({
      infinite: true,
      autoplay: true,
      centerMode: false,
      centerPadding: "0",
      focusOnSelect: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      arrows: true,
      prevArrow: "<button type='button' aria-label='Slide Prev' class='arafat-prev box-style top-right pull-left'><i class=\"material-symbols-outlined mat-icon\"  aria-hidden='true'>arrow_right_alt</i> <span class='bg-obj'></span> </button>",
      nextArrow: "<button type='button' aria-label='Slide Next' class='arafat-next box-style top-right pull-right'><i class=\"material-symbols-outlined mat-icon\"  aria-hidden='true'>arrow_right_alt</i> <span class='bg-obj'></span> </button>",
      dots: false,
      dotsClass: 'section-dots',
      customPaging: function (slider, i) {
        var slideNumber = (i + 1),
          totalSlides = slider.slideCount;
        return '<a class="dot" role="button" title="' + slideNumber + ' of ' + totalSlides + '"><span class="string">' + slideNumber + '/' + totalSlides + '</span></a>';
      },
      responsive: [
        {
          breakpoint: 1400,
          settings: {
            slidesToShow: 3,
          }
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 2,
            arrows: false,
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            arrows: false,
          }
        }
      ]
    });

    }, []);

    return (
        <section className="our-services pt-120 pb-120">
            <div className="container">
                <div className="row align-items-center section-text">
                    <div className="col-lg-6">
                        <span className="fs-two heading">
                            Types and Genres We Cover <span>Under Mobile Game Development</span>
                        </span>
                    </div>
                    <div className="col-lg-5">
                        <p>
                            Shadowstrike is a leading Mobile Game Development Company that offers all-around game design
                            and development for every type of video game. Over the years, we have delivered outstanding
                            games that fit into diverse platforms and gaming genres. Let's examine the various game
                            development solutions.
                        </p>
                    </div>
                </div>

                <div className="services-carousel">
                    {/* Slide 1 */}
                    <div className="slide-area">
                        <div className="single-slider box-style box-first p-5 px-xl-8 py-xl-10">
                            <div className="icon-box d-center">
                                <i className="material-symbols-outlined fs-two">sports_esports</i>
                            </div>
                            <div className="title-area">
                                <h5 className="mt-6 mb-3">Software Development</h5>
                                <p>
                                    Software development is the process of designing, creating, testing, and maintaining software
                                    applications to solve problems or meet user needs. It involves steps like planning, coding,
                                    testing, deployment, and updates, using methods such as Agile, Scrum, or Waterfall.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Slide 2 */}
                    <div className="slide-area">
                        <div className="single-slider box-style box-first p-5 px-xl-8 py-xl-10">
                            <div className="icon-box d-center">
                                <i className="fa-solid fa-person-running fs-two"></i>
                            </div>
                            <div className="title-area">
                                <h5 className="mt-6 mb-3">Web Development</h5>
                                <p>
                                    Web development is the process of building and maintaining websites or web applications,
                                    covering everything from front-end (design and user interface) to back-end (server, database,
                                    and functionality).
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Slide 3 */}
                    <div className="slide-area">
                        <div className="single-slider box-style box-first p-5 px-xl-8 py-xl-10">
                            <div className="icon-box d-center">
                                <i className="material-symbols-outlined fs-two">golf_course</i>
                            </div>
                            <div className="title-area">
                                <h5 className="mt-6 mb-3">AI Development</h5>
                                <p>
                                    AI development is the process of creating systems and applications that can simulate human
                                    intelligence, such as learning, reasoning, problem-solving, and decision-making.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Slide 4 */}
                    <div className="slide-area">
                        <div className="single-slider box-style box-first p-5 px-xl-8 py-xl-10">
                            <div className="icon-box d-center">
                                <i className="material-symbols-outlined fs-two">ads_click</i>
                            </div>
                            <div className="title-area">
                                <h5 className="mt-6 mb-3">Digital Marketing</h5>
                                <p>
                                    Digital marketing is the use of online channels, platforms, and strategies to promote products
                                    or services, reach target audiences, and drive sales or engagement.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Slide 5 */}
                    <div className="slide-area">
                        <div className="single-slider box-style box-first p-5 px-xl-8 py-xl-10">
                            <div className="icon-box d-center">
                                <i className="material-symbols-outlined fs-two">sports_esports</i>
                            </div>
                            <div className="title-area">
                                <h5 className="mt-6 mb-3">Mobile App Development</h5>
                                <p>
                                    Mobile app development is the process of designing, building, and maintaining applications for
                                    mobile devices like smartphones and tablets, using platforms such as Android, iOS, or
                                    cross-platform frameworks.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Slide 6 */}
                    <div className="slide-area">
                        <div className="single-slider box-style box-first p-5 px-xl-8 py-xl-10">
                            <div className="icon-box d-center">
                                <i className="material-symbols-outlined fs-two">sports_esports</i>
                            </div>
                            <div className="title-area">
                                <h5 className="mt-6 mb-3">Custom Web Design</h5>
                                <p>
                                    Custom web design is the process of creating a unique, tailored website specifically designed
                                    to match a brand’s identity, goals, and user needs, rather than using pre-made templates.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Slide 7 */}
                    <div className="slide-area">
                        <div className="single-slider box-style box-first p-5 px-xl-8 py-xl-10">
                            <div className="icon-box d-center">
                                <i className="material-symbols-outlined fs-two">sports_esports</i>
                            </div>
                            <div className="title-area">
                                <h5 className="mt-6 mb-3">Game Development</h5>
                                <p>
                                    Game development is the process of designing, creating, and programming video games,
                                    combining art, storytelling, sound, and coding to deliver interactive entertainment across
                                    platforms like PC, consoles, and mobile.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Slide 8 */}
                    <div className="slide-area">
                        <div className="single-slider box-style box-first p-5 px-xl-8 py-xl-10">
                            <div className="icon-box d-center">
                                <i className="material-symbols-outlined fs-two">sports_esports</i>
                            </div>
                            <div className="title-area">
                                <h5 className="mt-6 mb-3">IT Support and Services</h5>
                                <p>
                                    IT support and services involve managing, maintaining, and troubleshooting technology systems
                                    such as computers, networks, and software to ensure smooth business operations.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OurServices;
