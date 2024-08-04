import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CategoryType, ProductType } from "@/lib/sanity/types";
import { getCategories } from "@/lib/sanity/category-query";
import imageUrlBuilder from "@sanity/image-url";
import { urlFor } from "@/lib/sanity/urlBulder";

interface categoryArr {
  under100k: ProductType[];
}

const Under100K = ({ under100k }: categoryArr) => {
  const [viewMore, setViewMore] = useState(false);
  return (
    <section id="latest-products " className="py-10 bg-white">
      <div className="container  mx-auto px-4">
        <h2 className="text-3xl  font-bold mb-8 text-gray-800">
          Everything under ₦100,000
        </h2>
        <div className="flex flex-wrap -mx-4">
          {under100k.map((category, i) => {
            return (
              <div
                key={i}
                className={`w-full max-w-[50%] lg:w-1/4 max-sm:px-1 px-4 mb-8 ${!viewMore && i > 3 && "hidden"}`}
              >
                <div className="bg-white p-3 rounded-lg shadow-lg">
                  <div className="relative w-full h-64 max-md:h-48 mb-4 hover:blur-sm rounded-lg overflow-hidden">
                    <Image
                      src={urlFor(category.cover_image.asset._ref).url()}
                      alt={"title"}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg "
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
                  <div className="flex items-center mb-4">
                    <span className="text-lg font-bold text-gray-800">
                      ₦{category.price}
                    </span>
                    <span className="text-sm line-through text-gray-800 ml-2">
                      ₦{category.original_price && category.original_price}
                    </span>
                  </div>
                  <button className="bg-[#ff8c00] max-md:w-fit max-md:text-xs border border-transparent hover:bg-transparent hover:border-[#ff8c00] text-white hover:text-[#ff8c00] font-semibold py-2  px-4 rounded-full w-full">
                    View Collection
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={() => setViewMore(!viewMore)}
          className={`border-2 
              max-w-md  mx-auto  hover:transition-all  flex justify-center hover:translate-x-2   max-md:w-40 duration-1000 border-[#ff8c00] text-[#ff8c00] font-semibold py-2 px-4 rounded-full w-full ${(!under100k.length || under100k.length < 5) && "hidden"} `}
        >
          {viewMore ? "View less" : "View more"}
        </button>
      </div>
    </section>
  );
};

export default Under100K;
