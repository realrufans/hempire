import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import { ProductType } from "@/lib/sanity/types";
import { urlFor } from "@/lib/sanity/urlBulder";

type addCartItem = (arg: ProductType) => void;

interface props {
  products: ProductType[];
  addCartItem: addCartItem;
}

const LatestProducts = ({ products, addCartItem }: props) => {
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
          {products.map((product, index) => (
            <SwiperSlide key={product._id}>
              <div className="bg-white p-3 flex flex-col rounded-lg shadow-lg">
                <div className="relative hover:blur-sm w-full h-64 mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={urlFor(product.cover_image.asset._ref).url()}
                    alt={product.cover_image.alt}
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
                    {product.name}
                  </a>
                  <p className="my-2 max-sm:text-sm line-clamp-2 text-gray-950">
                    {product.description}
                  </p>
                  <div className="flex items-center mb-4">
                    <span className="text-lg font-bold text-gray-800">
                      ₦{product.price}
                    </span>
                    <span className="text-sm line-through text-gray-800 ml-2">
                      ₦{product.original_price && product.original_price}
                    </span>
                  </div>
                  <button
                    onClick={() => addCartItem(product)}
                    className="bg-[#ff8c00] border hover:text-[#ff8c00] border-transparent hover:bg-transparent hover:border-[#ff8c00] text-white hover:bg-[#ff8c00] font-semibold py-2 px-4 rounded-full"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default LatestProducts;
