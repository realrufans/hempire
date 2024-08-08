import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CategoryType } from "@/lib/sanity/types";
import { getCategories } from "@/lib/sanity/category-query";
import imageUrlBuilder from "@sanity/image-url";
import { urlFor } from "@/lib/sanity/urlBulder";

interface categoryArr {
  categories: CategoryType[];
}

const ProductsCategory = ({ categories }: categoryArr) => {
  return (
    <section id="latest-products " className="py-10 bg-gray-100">
      <div className="container  mx-auto px-4">
        <h2 className="text-xl  relative     font-bold mb-8  uppercase text-[#ff8c00]">
          Shop by Category
          <span className="border-b-4 absolute left-0 right-0 pb-2 h-2 w-[5%] max-md:w-[30%] flex "></span>
        </h2>
        <div className="flex flex-wrap -mx-4">
          {categories.map((category, i) => {
            return (
              <div key={i} className="w-full sm:w-1/2 lg:w-1/4 px-4 mb-8">
                <div className="bg-white p-3 rounded-sm shadow-lg">
                  <div className="relative hover:blur-sm w-full h-64 mb-4 rounded-sm overflow-hidden">
                    <Image
                      src={urlFor(category.cover_image.asset._ref).url()}
                      alt={"title"}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-sm "
                    />
                  </div>

                  <Link
                    className="text-lg text-gray-800 font-semibold mb-2"
                    href={category._id}
                  >
                    {category.name}
                  </Link>
                  <p className="my-2 text-gray-800 line-clamp-2">
                    {category.description}
                  </p>

                  <button className="bg-[#ff8c00] border border-transparent hover:bg-transparent hover:border-[#ff8c00] text-white hover:text-[#ff8c00] font-semibold py-2 px-4 rounded-sm w-full">
                    View Collection
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductsCategory;
