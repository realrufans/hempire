import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const Reviews = () => {
  return (
    <section id="latest-products" className=" pt-10 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-xl  relative     font-bold mb-8  uppercase text-[#ff8c00]">
          certified customers
          <span className="border-b-4 absolute left-0 right-0 pb-2 h-2 w-[5%] max-md:w-[30%] flex "></span>
        </h2>
        <Swiper
          navigation
          loop
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          modules={[Navigation, Autoplay, Pagination]}
          spaceBetween={20}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
        >
          {[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((product, index) => (
            <SwiperSlide key={index} className=" border-gray-200">
              <div className="bg-white p-3 flex flex-col rounded-sm   s ">
                <div className="relative   w-full h-72 mb-4 rounded-sm overflow-hidden">
                  <Zoom>
                    <Image
                      src={`/assets/images/reviews/${index}.jpeg`}
                      alt="harnah empire bardie"
                      layout="fill"
                      objectFit="cover"
                      className="rounded-sm"
                    />
                  </Zoom>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Reviews;
