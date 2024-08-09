import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import { ProductType } from "@/lib/sanity/types";
import { urlFor } from "@/lib/sanity/urlBulder";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { formatBalance } from "@/lib/numberShortener";
import { currencyFormater } from "@/lib/currencyFormater";
import { MdCheck } from "react-icons/md";

type addCartItem = (arg: ProductType) => void;

interface props {
  products: ProductType[];
  addCartItem: addCartItem;
}

const roboto = Poppins({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const LatestProducts = ({ products, addCartItem }: props) => {
  console.log(products[0]);
  return (
    <section id="latest-products" className=" pt-10 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2
          className={`text-xl relative  font-bold mb-8 text-[#ff8c00] uppercase  `}
        >
          Latest products
          <span className=" absolute left-0 right-0 pb-2 h-2 w-[5%] max-md:w-[30%] flex "></span>
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
            <SwiperSlide key={product._id} className=" border-gray-200 group">
              <div
                className={`  p-3 flex flex-col rounded-sm   ${roboto.className} `}
              >
                <div className="relative hover:blur-sm w-full h-64 mb-2 rounded-sm overflow-hidden">
                  <Image
                    src={urlFor(product.cover_image.asset._ref).url()}
                    alt={product.cover_image.alt}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-sm group-hover:rotate-1 group-hover:scale-95"
                  />
    
                </div>

                <div className="space-y-1">
                  <p
                    className={`text-xs line-clamp-1 uppercase text-gray-950  `}
                  >
                    {product.category.name}
                  </p>
                  <Link
                    href="#"
                    className="text-md font-medium line-clamp-1  capitalize  text-gray-800 "
                  >
                    {product.name}
                  </Link>

                  <div className="flex  max-md:space-y-1  sm:items-center  max-sm:flex-col ">
                    <span className="text-xs font-semibold text-gray-700">
                      ₦{currencyFormater(product.price.toString())}
                    </span>

                    <span className="text-xs line-through text-gray-600  sm:ml-2">
                      ₦
                      {product.original_price &&
                        currencyFormater(product.original_price.toString())}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => addCartItem(product)}
                  className="bg-[#ff8c00]      hover:bg-[#ff9c00] hover:border-[#ff8c00] text-white   font-semibold py-2  px-4 rounded-sm w-full  my-2"
                >
                  Add to Cart
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default LatestProducts;
