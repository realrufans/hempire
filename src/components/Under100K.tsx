import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CategoryType, ProductType } from "@/lib/sanity/types";
import { getCategories } from "@/lib/sanity/category-query";
import imageUrlBuilder from "@sanity/image-url";
import { urlFor } from "@/lib/sanity/urlBulder";
import { currencyFormater } from "@/lib/currencyFormater";
import { formatBalance } from "@/lib/numberShortener";
import Head from "next/head";

type addCartItem = (arg: ProductType) => void;

interface categoryArr {
  under100k: ProductType[];
}

interface props {
  under100k: ProductType[];
  addCartItem: addCartItem;
  showmore?: boolean;
}
 
const Under100K = ({ addCartItem, under100k, showmore = true }: props) => {
  const [viewMore, setViewMore] = useState(false);
  return (
    <section id="latest-products " className="mx-1 bg-gray-100">
      <div className="container  mx-auto px-4">
        <h2 className="text-xl relative font-bold mb-8 text-[#ff8c00] uppercase">
          Everything under ₦100,000
          <span className="border-b-4 absolute left-0 right-0 pb-2 h-2 w-[5%]  max-md:w-[30%] flex "></span>
        </h2>
        <div className="flex flex-wrap -mx-4">
          {under100k.map((product, i) => {
            return (
              <div
                key={i}
                className={`w-full max-w-[50%]   lg:w-1/4 max-sm:px-1 px-4 mb-8 ${!viewMore && i > 3 && "hidden"}`}
              >
                <div className=" relative group  rounded-sm  md:shadow-md ">
                  <div className="relative w-full   h-64 max-md:h-36  mb-4 hover:blur-sm rounded-sm overflow-hidden">
                    <Image
                      src={urlFor(product.cover_image.asset._ref).url()}
                      alt={"title"}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-sm "
                    />
                    <button
                      onClick={() => addCartItem(product)}
                      className="bg-[#ff8c00] max-sm:group-hover:absolute  mt-2  sm:hidden max-sm:top-24 max-sm:left-[20%]   max-sm:w-fit max-sm:text-xs border border-transparent hover:bg-[#ff9c00] hover:border-[#ff8c00] text-white   font-semibold py-2  px-4 rounded-sm w-full"
                    >
                      Add to Cart
                    </button>
                  
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
                    className="bg-[#ff8c00]  max-sm:hidden    hover:bg-[#ff9c00] hover:border-[#ff8c00] text-white   font-semibold py-2  px-4 rounded-sm w-full  my-2"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        {showmore && (
          <Link
            href="/under-100k"
            className={`border-2 
              max-w-md  mx-auto  hover:transition-all  flex justify-center hover:translate-x-2   max-md:w-40 duration-1000 border-[#ff8c00] text-[#ff8c00] font-semibold py-2 px-4 rounded-sm w-full  `}
          >
            View more
          </Link>
        )}
      </div>
    </section>
  );
};

export default Under100K;
