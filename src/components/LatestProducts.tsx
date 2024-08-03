import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import { ProductType } from "@/lib/sanity/types";
import { urlFor } from "@/lib/sanity/urlBulder";

interface productsType {
  products: ProductType[];
}

const LatestProducts = ({ products }: productsType) => {
  console.log(products, "inside");
  return (
    <section id="latest-products" className="py-10 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">
          Latest products
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
          {products.map(
            ({
              _id,
              cover_image,
              name,
              description,
              price,
              original_price,
            }) => (
              <SwiperSlide key={_id}>
                <div className="bg-white p-3 flex flex-col rounded-lg shadow-lg">
                  <div className="relative hover:blur-sm w-full h-64 mb-4 rounded-lg overflow-hidden">
                    <Image
                      src={urlFor(cover_image.asset._ref).url()}
                      alt={cover_image.alt}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg"
                    />
                  </div>

                  <div className="">
                    <a
                      href="#"
                      className="text-lg font-semibold text-gray-800 mb-2"
                    >
                      {name}
                    </a>
                    <p className="my-2 max-sm:text-sm line-clamp-2 text-gray-950">
                      {description}
                    </p>
                    <div className="flex items-center mb-4">
                      <span className="text-lg font-bold text-gray-800">
                        {price}
                      </span>
                      <span className="text-sm line-through text-gray-800 ml-2">
                        {original_price && original_price}
                      </span>
                    </div>
                    <button className="bg-[#ff8c00] border hover:text-[#ff8c00] border-transparent hover:bg-transparent hover:border-[#ff8c00] text-white hover:bg-[#ff8c00] font-semibold py-2 px-4 rounded-full">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            )
          )}
        </Swiper>
      </div>
    </section>
  );
};

export default LatestProducts;
