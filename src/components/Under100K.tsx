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
    <section id="latest-products " className="py-10 bg-gray-100">
      <div className="container  mx-auto px-4">
        <Head>
          <title className="">
            Affordable Wigs Under ₦100,000 | Harnah Empire Wig Store
          </title>
          <meta
            name="description"
            content="Discover high-quality wigs under ₦100,000 at Harnah Empire Wig Store. Shop our collection of stylish and affordable wigs today!"
          />
          <meta
            name="keywords"
            content="affordable wigs, wigs under ₦100,000, Harnah Empire Wig Store, cheap wigs, stylish wigs, quality wigs, buy wigs Nigeria"
          />
          <meta name="author" content="Harnah Empire Wig Store" />
          <meta
            property="og:title"
            content="Affordable Wigs Under ₦100,000 | Harnah Empire Wig Store"
          />
          <meta
            property="og:description"
            content="Discover high-quality wigs under ₦100,000 at Harnah Empire Wig Store. Shop our collection of stylish and affordable wigs today!"
          />
          <meta property="og:type" content="website" />
          <meta
            property="og:url"
            content="https://www.harnah-empire-wigs.com/under-100k"
          />
          <meta
            property="og:image"
            content="https://www.harnah-empire-wigs.com/images/og-image.jpg"
          />
          <meta property="og:site_name" content="Harnah Empire Wig Store" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:title"
            content="Affordable Wigs Under ₦100,000 | Harnah Empire Wig Store"
          />
          <meta
            name="twitter:description"
            content="Discover high-quality wigs under ₦100,000 at Harnah Empire Wig Store. Shop our collection of stylish and affordable wigs today!"
          />
          <meta
            name="twitter:image"
            content="https://www.harnah-empire-wigs.com/images/twitter-image.jpg"
          />
          <meta name="twitter:site" content="@HarnahEmpireWigs" />
          <meta name="twitter:creator" content="@HarnahEmpireWigs" />
          <link
            rel="canonical"
            href="https://www.harnah-empire-wigs.com/under-100k"
          />
        </Head>

        <h2 className="text-xl relative font-bold mb-8 text-[#ff8c00] uppercase">
          Everything under ₦100,000
          <span className="border-b-4 absolute left-0 right-0 pb-2 h-2 w-[5%]  max-md:w-[30%] flex "></span>
        </h2>
        <div className="flex flex-wrap -mx-4">
          {under100k.map((category, i) => {
            return (
              <div
                key={i}
                className={`w-full max-w-[50%]   lg:w-1/4 max-sm:px-1 px-4 mb-8 ${!viewMore && i > 3 && "hidden"}`}
              >
                <div className="bg-white p-2 rounded-sm shadow-sm md:shadow-md ">
                  <div className="relative w-11/12 h-64 max-md:h-36  mb-4 hover:blur-sm rounded-sm overflow-hidden">
                    <Image
                      src={urlFor(category.cover_image.asset._ref).url()}
                      alt={"title"}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-sm "
                    />
                  </div>

                  <Link
                    className="text-lg text-gray-800  line-clamp-1 font-semibold mb-2"
                    href={category._id}
                  >
                    {category.name}
                  </Link>

                  <div className="flex space-x-1   items-center mb-2 md:mb-4">
                    <p className="text-sm font-bold text-gray-800">
                      ₦{formatBalance(category.price)}
                    </p>
                    <p className="text-sm   line-through text-gray-800 ">
                      ₦
                      {category.original_price &&
                        formatBalance(category.original_price)}
                    </p>
                  </div>
                  <button
                    onClick={() => addCartItem(category)}
                    className="bg-[#ff8c00] max-md:w-fit max-md:text-xs border border-transparent hover:bg-transparent hover:border-[#ff8c00] text-white hover:text-[#ff8c00] font-semibold py-2  px-4 rounded-sm w-full"
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
