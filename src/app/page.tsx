"use client";

import DemoSlider from "@/components/DemoSlider";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LatestProducts from "@/components/LatestProducts";
import ProductsCategory from "@/components/ProductsCategory";
import ProductSlider from "@/components/ProductSlider";
import Under100K from "@/components/Under100K";
import { getCategories } from "@/lib/sanity/category-query";
import { ToastContainer, toast } from "react-toastify";

import {
  getProducts,
  getSelectedProducts,
  getUnder100kProducts,
} from "@/lib/sanity/product-query";
import "react-toastify/ReactToastify.min.css";

import { CartProductType, CategoryType, ProductType } from "@/lib/sanity/types";
import { useEffect, useState, useCallback } from "react";

export default function Home() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [under100k, setUnder100k] = useState<ProductType[]>([]);
  const [cartItems, setCartItems] = useState<CartProductType[]>([]);
  const [cartItemsCount, setCartItemsCount] = useState<number>(0);

  useEffect(() => {
    async function fetchData() {
      const [allProducts, allUnder100k, allCategories] = await Promise.all([
        getProducts(),
        getUnder100kProducts(),
        getCategories(),
      ]);

      setProducts(allProducts);
      setUnder100k(allUnder100k);
      setCategories(allCategories.reverse());

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
    }

    fetchData();
  }, []);

  const handleProductFilter = useCallback(async (category: string) => {
    const products = category
      ? await getSelectedProducts(category)
      : await getProducts();
    setProducts(products);
    setSelectedCategory(category);
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

 

  return (
    <div>
      <ToastContainer />
      <Header itemCount={cartItemsCount} />
      <DemoSlider />
      <LatestProducts addCartItem={addCartItem} products={products} />
      <ProductsCategory categories={categories} />
      <Under100K addCartItem={addCartItem} under100k={under100k} />
      <Footer />
    </div>
  );
}
