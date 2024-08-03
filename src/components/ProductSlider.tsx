import React, { useEffect } from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
 

import Link from "next/link";

const ProductSlider: React.FC = () => {
  return (
    <Swiper
      className="main-slider"
      slidesPerView={1}
      navigation
      pagination={{ type: "bullets", clickable: true }}
      autoplay={true}
      loop={true}
      modules={[Autoplay, Navigation, Pagination]}
    >
      <section className=" border-2 relative " id="product-slider">
        {[0, 0, 0].map((data, index) => {
          return (
            <SwiperSlide key={index}>
              <img
                src={`assets/images/main-slider/${index + 1}.jpg`}
                alt="Product 1"
              />
              <div className="  absolute z-50 top-0">
                <h2 className="text-3xl md:text-7xl font-bold text-white mb-2 md:mb-4">
                  Women
                </h2>
                <p className="mb-4 text-white md:text-2xl">
                  Experience the best in sportswear with <br />
                  our latest collection.
                </p>
                <Link
                  href="/"
                  className="bg-primary hover:bg-transparent text-white hover:text-white border border-transparent hover:border-white font-semibold px-4 py-2 rounded-full inline-block"
                >
                  Shop now
                </Link>
              </div>
            </SwiperSlide>
          );
        })}

     
      </section>
    </Swiper>
  );
};

export default ProductSlider;
