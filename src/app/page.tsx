"use client";

import DemoSlider from "@/components/DemoSlider";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LatestProducts from "@/components/LatestProducts";
import ProductsCategory from "@/components/ProductsCategory";

import ProductSlider from "@/components/ProductSlider";
import { getCategories } from "@/lib/sanity/category-query";
import { getProducts, getSelectedProducts } from "@/lib/sanity/product-query";
import { CategoryType, ProductType } from "@/lib/sanity/types";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const [cartItems, setCartItems] = useState<ProductType[]>([]);
  const [cartItemsCount, setCartItemsCount] = useState<number>(0);

  const localStorageCartItem =
    typeof window !== "undefined" && localStorage.getItem("cart");
  const parsedCartItems =
    localStorageCartItem && JSON.parse(localStorageCartItem);
  const itemsInCart = cartItems.length > 0 ? cartItems : parsedCartItems;

  const localStorageCartItemCount =
    typeof window !== "undefined" && localStorage.getItem("cartCount");
  const cartCount: number =
    localStorageCartItemCount && JSON.parse(localStorageCartItemCount);
  const itemCount = cartItemsCount || cartCount;

  useEffect(() => {
    async function fetchProducts() {
      const allProducts: ProductType[] = await getProducts();
      setProducts(allProducts);
    }
    fetchProducts();
  }, []);

  useEffect(() => {
    async function fetchCategories() {
      const allCategories: CategoryType[] = await getCategories();
      console.log("fetched all categories", allCategories);
      setCategories(allCategories.reverse());
    }
    fetchCategories();
  }, []);

  const handleProductFilter = async (category: string) => {
    let product: ProductType[] = [];
    if (!!category) {
      product = await getSelectedProducts(category);
    } else {
      product = await getProducts();
    }
    setProducts(product);
    setSelectedCategory(category);
  };

  const addCartItem = (product: ProductType) => {
    let cart: ProductType[] = [];
    const count = cartCount + 1;
    const products = [];
    products.push(product);

    if (!!itemsInCart) {
      cart = [...itemsInCart, ...products];
    } else {
      cart = [...products];
    }

    setCartItems(cart);
    setCartItemsCount(count);

    updateLocalStorage(count, cart);
  };

  const removeItemFromCart = (product: ProductType) => {
    const count = cartCount - 1;
    const filteredItems = itemsInCart.filter(
      (item: ProductType) => item._id !== product._id
    );

    setCartItems(filteredItems);
    setCartItemsCount(count);

    updateLocalStorage(count, filteredItems);
  };

  const updateLocalStorage = (count: number, cart: ProductType[]) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cartCount", JSON.stringify(count));
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  };
  return (
    <div>
      <Header />
      <DemoSlider />
      <LatestProducts />
      <ProductsCategory categories={categories} />

      <Footer />
    </div>
  );
}
