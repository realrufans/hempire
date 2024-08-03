import React from "react";
import Link from "next/link";

const ProductBanners: React.FC = () => {
  return (
    <section id="product-banners">
      <div className="container mx-auto py-10">
        <div className="flex flex-wrap -mx-4">
          {/* Category 1 */}
          <div className="w-full sm:w-1/3 px-4 mb-8">
            <div className="category-banner relative overflow-hidden rounded-lg shadow-lg group">
              <img
                src="/assets/images/cat-image1.jpg"
                alt="Category 1"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gray-light bg-opacity-50"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Men</h2>
                <Link href="/">
                  <a className="bg-primary hover:bg-transparent border border-transparent hover:border-white text-white hover:text-white font-semibold px-4 py-2 rounded-full inline-block">
                    Shop now
                  </a>
                </Link>
              </div>
            </div>
          </div>
          {/* Category 2 */}
          <div className="w-full sm:w-1/3 px-4 mb-8">
            <div className="category-banner relative overflow-hidden rounded-lg shadow-lg group">
              <img
                src="/assets/images/cat-image4.jpg"
                alt="Category 2"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gray-light bg-opacity-50"></div>
              <div className="category-text absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4 transition duration-300">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Women</h2>
                <Link href="/">
                  <a className="bg-primary hover:bg-transparent border border-transparent hover:border-white text-white hover:text-white font-semibold px-4 py-2 rounded-full inline-block">
                    Shop now
                  </a>
                </Link>
              </div>
            </div>
          </div>
          {/* Category 3 */}
          <div className="w-full sm:w-1/3 px-4 mb-8">
            <div className="category-banner relative overflow-hidden rounded-lg shadow-lg group">
              <img
                src="/assets/images/cat-image5.jpg"
                alt="Category 3"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gray-light bg-opacity-50"></div>
              <div className="category-text absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4 transition duration-300">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Accessories
                </h2>
                <Link href="/">
                  <a className="bg-primary hover:bg-transparent border border-transparent hover:border-white text-white hover:text-white font-semibold px-4 py-2 rounded-full inline-block">
                    Shop now
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductBanners;
