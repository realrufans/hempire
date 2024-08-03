import React from "react";

const BrandsSection: React.FC = () => {
  return (
    <section id="brands" className="bg-white py-16 px-4">
      <div className="container mx-auto max-w-screen-xl px-4 testimonials">
        <div className="text-center mb-12 lg:mb-20">
          <h2 className="text-5xl font-bold mb-4">
            Discover <span className="text-primary">Our Brands</span>
          </h2>
          <p className="my-7">Explore the top brands we feature in our store</p>
        </div>
        <div className="swiper brands-swiper-slider">
          <div className="swiper-wrapper">
            {/* Brand Logo 1 */}
            <div className="swiper-slide flex-none bg-gray-200 flex items-center justify-center rounded-md">
              <img
                src="/assets/images/brands/html.svg"
                alt="Client Logo"
                className="max-h-full max-w-full"
              />
            </div>
            {/* Brand Logo 2 */}
            <div className="swiper-slide flex-none bg-gray-200 flex items-center justify-center rounded-md">
              <img
                src="/assets/images/brands/js.svg"
                alt="Client Logo"
                className="max-h-full max-w-full"
              />
            </div>
            {/* Brand Logo 3 */}
            <div className="swiper-slide flex-none bg-gray-200 flex items-center justify-center rounded-md">
              <img
                src="/assets/images/brands/laravel.svg"
                alt="Client Logo"
                className="max-h-full max-w-full"
              />
            </div>
            {/* Brand Logo 4 */}
            <div className="swiper-slide flex-none bg-gray-200 flex items-center justify-center rounded-md">
              <img
                src="/assets/images/brands/php.svg"
                alt="Client Logo"
                className="max-h-full max-w-full"
              />
            </div>
            {/* Brand Logo 5 */}
            <div className="swiper-slide flex-none bg-gray-200 flex items-center justify-center rounded-md">
              <img
                src="/assets/images/brands/react.svg"
                alt="Client Logo"
                className="max-h-full max-w-full"
              />
            </div>
            {/* Brand Logo 6 */}
            <div className="swiper-slide flex-none bg-gray-200 flex items-center justify-center rounded-md">
              <img
                src="/assets/images/brands/tailwind.svg"
                alt="Client Logo"
                className="max-h-full max-w-full"
              />
            </div>
            {/* Brand Logo 7 */}
            <div className="swiper-slide flex-none bg-gray-200 flex items-center justify-center rounded-md">
              <img
                src="/assets/images/brands/typescript.svg"
                alt="Client Logo"
                className="max-h-full max-w-full"
              />
            </div>
          </div>
          <div className="swiper-button-prev"></div>
          <div className="swiper-button-next"></div>
        </div>
      </div>
    </section>
  );
};

export default BrandsSection;
