import React, { useState } from "react";
import headerCSS from "./Header.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Autoplay, Parallax } from "swiper/modules";

const display = {
  delay: 2500,
  disableOnInteraction: false,
};

function Header() {
  const [autoplay, setAutoplay] = useState(display);



  return (
    <div className={headerCSS.header_wrapper}>
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        loop={true}
        autoplay={autoplay}
        speed={1500}
        parallax={true}
        modules={[Autoplay, Parallax]}
        className={headerCSS.swiper}
      >
        <SwiperSlide>
          <div className={`${headerCSS.Header_slide} ${headerCSS.slide1}`}>
    
            <div className={headerCSS.content}>
              <small data-swiper-parallax="100px">
                Luxury Hotel & Restaurant
              </small>
              <h2 data-swiper-parallax="100px">
                Enjoy your <span>dream </span>vacation
              </h2>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className={`${headerCSS.Header_slide} ${headerCSS.slide2}`}>

            <div className={headerCSS.content}>
              <small data-swiper-parallax="100px">
                Luxury Hotel & Restaurant
              </small>
              <h2 data-swiper-parallax="100px">
                Find <span>luxurious </span>experiences
              </h2>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className={`${headerCSS.Header_slide} ${headerCSS.slide3}`}>

            <div className={headerCSS.content}>
              <small data-swiper-parallax="100px">
                Luxury Hotel & Restaurant
              </small>
              <h2 data-swiper-parallax="100px">
                Experience <span>new </span>destinations
              </h2>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default Header;
