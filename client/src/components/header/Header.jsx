import React, { useState } from "react";
import headerCSS from "./Header.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import Nav from "@Nav";
import Searchtrem from "../Search/Searchtrem";
import "swiper/swiper-bundle.css";
import { Autoplay, Parallax } from "swiper/modules";

const display = {
  delay: 2500,
  disableOnInteraction: false,
};

function Header() {
  const [autoplay, setAutoplay] = useState(display);

  const stopAutoplay = () => {
    setAutoplay(false);
  };

  const startAutoplay = () => {
    setTimeout(() => {
      setAutoplay({
        delay: 2500,
        disableOnInteraction: false,
      });
    }, 500); 
  };

  return (
    <div className={headerCSS.header_wrapper}>
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        loop={true}
        // autoplay={autoplay}
        speed={1500}
        parallax={true}
        modules={[Autoplay, Parallax]}
        className={headerCSS.swiper}
      >
        <SwiperSlide>
          <div className={`${headerCSS.Header_slide} ${headerCSS.slide1}`}>
            <Nav  />
            <Searchtrem onFocus={stopAutoplay} onBlur={startAutoplay} />
            <div className={headerCSS.content}>
              <small data-swiper-parallax="100px">
                Luxury hotel & Restaurant
              </small>
              <h2 data-swiper-parallax="100px">
                Enjoy your <span>dream </span>time
              </h2>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className={`${headerCSS.Header_slide} ${headerCSS.slide2}`}>
            <Nav />
            <Searchtrem onFocus={stopAutoplay} onBlur={startAutoplay} />
            <div className={headerCSS.content}>
              <small data-swiper-parallax="100px">
                Luxury hotel & Restaurant
              </small>
              <h2 data-swiper-parallax="100px">
                Enjoy your <span>dream </span>time
              </h2>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className={`${headerCSS.Header_slide} ${headerCSS.slide3}`}>
            <Nav  />
            <Searchtrem onFocus={stopAutoplay} onBlur={startAutoplay} />
            <div className={headerCSS.content}>
              <small data-swiper-parallax="100px">
                Luxury hotel & Restaurant
              </small>
              <h2 data-swiper-parallax="100px">
                Enjoy your <span>dream </span>time
              </h2>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default Header;
