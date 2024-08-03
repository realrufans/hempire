import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Image from "next/image";

const productData = [
  {
    id: 1,
    image: "assets/images/products/1.jpg",
    title: "Blue women's suit",
    description:
      "Women wig small head will rock this very well. Full closure, long length, and makeup me.",
    price: "$19.99",
    originalPrice: "$24.99",
  },
  {
    id: 2,
    image: "assets/images/products/2.jpg",
    title: "Casual men's jacket",
    description:
      "Stylish and comfortable jacket for men. Perfect for casual outings.",
    price: "$29.99",
    originalPrice: "$34.99",
  },
  {
    id: 3,
    image: "assets/images/products/3.jpg",
    title: "Elegant evening gown",
    description:
      "Perfect gown for evening events and parties. Elegant and fashionable.",
    price: "$39.99",
    originalPrice: "$44.99",
  },
  {
    id: 4,
    image: "assets/images/products/4.jpg",
    title: "Leather handbag",
    description: "Premium leather handbag for women. Stylish and durable.",
    price: "$49.99",
    originalPrice: "$54.99",
  },
  {
    id: 5,
    image: "assets/images/products/5.jpeg",
    title: "Running shoes",
    description:
      "Comfortable and lightweight running shoes. Ideal for athletes.",
    price: "$59.99",
    originalPrice: "$64.99",
  },
  {
    id: 6,
    image: "assets/images/products/6.jpg",
    title: "Designer sunglasses",
    description: "Trendy designer sunglasses with UV protection.",
    price: "$69.99",
    originalPrice: "$74.99",
  },
  {
    id: 7,
    image: "assets/images/products/7.jpg",
    title: "Smartwatch",
    description:
      "Advanced smartwatch with multiple features. Stay connected on the go.",
    price: "$79.99",
    originalPrice: "$84.99",
  },
  {
    id: 8,
    image: "assets/images/products/8.jpg",
    title: "Casual sneakers",
    description: "Comfortable casual sneakers for everyday wear.",
    price: "$89.99",
    originalPrice: "$94.99",
  },
];

const LatestProducts: React.FC = () => {
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
          {productData.map(
            ({ id, image, title, description, price, originalPrice }) => (
              <SwiperSlide key={id}>
                <div className="bg-white p-3 flex flex-col rounded-lg shadow-lg">
                  <div className="relative hover:blur-sm w-full h-64 mb-4 rounded-lg overflow-hidden">
                    <Image
                      src={`/${image}`}
                      alt={title}
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
                      {title}
                    </a>
                    <p className="my-2 max-sm:text-sm line-clamp-2 text-gray-950">
                      {description}
                    </p>
                    <div className="flex items-center mb-4">
                      <span className="text-lg font-bold text-gray-800">
                        {price}
                      </span>
                      <span className="text-sm line-through text-gray-800 ml-2">
                        {originalPrice}
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
