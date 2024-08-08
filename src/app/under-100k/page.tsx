"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProductType, CategoryType, ProductType } from "@/lib/sanity/types";
import { getUnder100kProducts } from "@/lib/sanity/product-query";
import { urlFor } from "@/lib/sanity/urlBulder";
import Under100K from "@/components/Under100K";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";

interface Wig {
  id: number;
  image: string;
  title: string;
  price: number;
  category: string;
  hairType: string;
}

export default function Under100kPage() {
  const wigs: Wig[] = [
    {
      id: 1,
      image: "/placeholder.svg",
      title: "Luxurious Lace Front Wig",
      price: 85000,
      category: "Lace Front",
      hairType: "Straight",
    },
    {
      id: 2,
      image: "/placeholder.svg",
      title: "Bouncy Curly Wig",
      price: 65000,
      category: "Curly",
      hairType: "Curly",
    },
    {
      id: 3,
      image: "/placeholder.svg",
      title: "Sleek Bob Wig",
      price: 75000,
      category: "Bob",
      hairType: "Straight",
    },
    {
      id: 4,
      image: "/placeholder.svg",
      title: "Voluminous Wavy Wig",
      price: 90000,
      category: "Wavy",
      hairType: "Wavy",
    },
    {
      id: 5,
      image: "/placeholder.svg",
      title: "Elegant Long Wig",
      price: 95000,
      category: "Long",
      hairType: "Straight",
    },
    {
      id: 6,
      image: "/placeholder.svg",
      title: "Chic Pixie Cut Wig",
      price: 55000,
      category: "Short",
      hairType: "Straight",
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);

  const [under100k, setUnder100k] = useState<ProductType[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<
    [number, number]
  >([0, 100000]);
  const [selectedHairType, setSelectedHairType] = useState<string[]>([]);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);

  const [cartItems, setCartItems] = useState<CartProductType[]>([]);
  const [cartItemsCount, setCartItemsCount] = useState<number>(0);

  useEffect(() => {
    const a = async () => {
      const allUnder100k = await getUnder100kProducts();
      setUnder100k(allUnder100k);

      // update states from localstroage

      if (typeof window !== "undefined") {
        const storedCartItems = localStorage.getItem("hempire_cart");
        const storedCartCount = localStorage.getItem("hempire_cartCount");

        if (storedCartItems) {
          setCartItems(JSON.parse(storedCartItems));
        }
        if (storedCartCount) {
          setCartItemsCount(JSON.parse(storedCartCount));
        }
      }
    };

    a();
  }, []);

  const updateLocalStorage = useCallback(
    (count: number, cart: ProductType[]) => {
      if (typeof window !== "undefined") {
        localStorage.setItem("hempire_cartCount", JSON.stringify(count));
        localStorage.setItem("hempire_cart", JSON.stringify(cart));
      }
    },
    []
  );

  const addCartItem = useCallback(
    (product: ProductType) => {
      // Cast to CartProductType to use quantity property
      const cartProduct = { ...product, quantity: 1 } as CartProductType;

      const existingProductIndex = cartItems.findIndex(
        (item) => item._id === product._id
      );

      let newCartItems: CartProductType[];
      let newCount: number;

      if (existingProductIndex !== -1) {
        // Product already exists in the cart, update quantity
        newCartItems = [...cartItems];
        newCartItems[existingProductIndex].quantity += 1;
        newCount = cartItemsCount + 1;

        // Alternatively, if you want to update count based on the total items, uncomment the next line
        // newCount = cartItemsCount + 1;
        toast.info("Cart updated!");
      } else {
        // Product doesn't exist in the cart, add to cart
        newCartItems = [...cartItems, cartProduct];
        newCount = cartItemsCount + 1;
        toast.success("Item successfully added to cart");
      }

      setCartItems(newCartItems);
      setCartItemsCount(newCount);
      updateLocalStorage(newCount, newCartItems);
    },
    [cartItems, cartItemsCount, updateLocalStorage]
  );

  const filteredWigs = useMemo(() => {
    return under100k.filter((wig) => {
      console.log(selectedCategory, wig.category.name);
      console.log(selectedCategory.includes(wig.category?.name));
      return (
        (selectedCategory.length === 0 ||
          selectedCategory.includes(wig.category?.name.trim())) &&
        (selectedHairType.length === 0 ||
          selectedHairType.includes(wig.tags[0]))
      );
    });
  }, [selectedCategory, selectedPriceRange, selectedHairType, under100k]);

  console.log(under100k);

  return (
    <>
      <ToastContainer />
      <Header itemCount={cartItemsCount} />
      <Head>
        <title>Affordable Wigs Under ₦100,000 | Harnah Empire Wig Store</title>
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
      <div className="bg-white text-gray-900">
        <header className="bg-[#ff8c00] text-gray-100 py-12 px-4 md:px-6">
          <div className="container mx-auto max-w-4xl">
            <h1 className="text-3xl font-bold mb-4">
              Discover High-Quality Wigs
            </h1>
            <p className="text-lg mb-8">
              Find the perfect wig for any occasion, all under ₦100,000.
            </p>
            <div className="relative">
              <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search for wigs..."
                className="w-full rounded-md px-12 py-3 focus:outline-none focus:ring-2 focus:ring-primary-foreground"
              />
            </div>
          </div>
        </header>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8 py-12 px-4 md:px-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold mb-4">Category</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2 font-normal">
                  <input
                    type="checkbox"
                    checked={selectedCategory.includes("Pixie curls")}
                    onChange={() => {
                      setSelectedCategory((prev) =>
                        prev.includes("Pixie curls")
                          ? prev.filter((c) => c !== "Pixie curls")
                          : [...prev, "Pixie curls"]
                      );
                    }}
                  />
                  Pixie curls
                </label>
                <label className="flex items-center gap-2 font-normal">
                  <input
                    type="checkbox"
                    checked={selectedCategory.includes("Curly")}
                    onChange={() => {
                      setSelectedCategory((prev) =>
                        prev.includes("Curly")
                          ? prev.filter((c) => c !== "Curly")
                          : [...prev, "Curly"]
                      );
                    }}
                  />
                  Curly
                </label>
                <label className="flex items-center gap-2 font-normal">
                  <input
                    type="checkbox"
                    checked={selectedCategory.includes("Bob")}
                    onChange={() => {
                      setSelectedCategory((prev) =>
                        prev.includes("Bob")
                          ? prev.filter((c) => c !== "Bob")
                          : [...prev, "Bob"]
                      );
                    }}
                  />
                  Bob
                </label>
                <label className="flex items-center gap-2 font-normal">
                  <input
                    type="checkbox"
                    checked={selectedCategory.includes("Wavy")}
                    onChange={() => {
                      setSelectedCategory((prev) =>
                        prev.includes("Wavy")
                          ? prev.filter((c) => c !== "Wavy")
                          : [...prev, "Wavy"]
                      );
                    }}
                  />
                  Wavy
                </label>
                <label className="flex items-center gap-2 font-normal">
                  <input
                    type="checkbox"
                    checked={selectedCategory.includes("Long")}
                    onChange={() => {
                      setSelectedCategory((prev) =>
                        prev.includes("Long")
                          ? prev.filter((c) => c !== "Long")
                          : [...prev, "Long"]
                      );
                    }}
                  />
                  Long
                </label>
                <label className="flex items-center gap-2 font-normal">
                  <input
                    type="checkbox"
                    checked={selectedCategory.includes("Short")}
                    onChange={() => {
                      setSelectedCategory((prev) =>
                        prev.includes("Short")
                          ? prev.filter((c) => c !== "Short")
                          : [...prev, "Short"]
                      );
                    }}
                  />
                  Short
                </label>
              </div>
            </div>
          </div>
          {/* <div className="flex flex-wrap -mx-4">
            {under100k.map((wig, i) => (
              <div
                key={i}
                className={`w-full max-w-[50%]   lg:w-1/4 max-sm:px-1 px-4 mb-8 `}
              >
                <div className="bg-white p-2 rounded-sm shadow-sm md:shadow-md ">
                  <img
                    src={urlFor(wig.cover_image.asset._ref).url()}
                    alt={wig.cover_image.alt}
                    width={300}
                    height={300}
                    className="w-full h-48 object-cover"
                    style={{ aspectRatio: "300/300", objectFit: "cover" }}
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-bold mb-2">{wig.name}</h3>
                    <p className="text-muted-foreground mb-4">
                      ₦{wig.price.toLocaleString()}
                    </p>
                    <button className="btn btn-primary w-full">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div> */}

          <Under100K
            under100k={filteredWigs}
            addCartItem={addCartItem}
            showmore={false}
          />
        </div>
      </div>

      <Footer />
    </>
  );
}

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
