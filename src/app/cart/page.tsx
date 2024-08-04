"use client";

import Link from "next/link";
import Image from "next/image";
import { CiBadgeDollar } from "react-icons/ci";
import { MdDelete, MdShoppingCart, MdHome } from "react-icons/md";
import { useState, useEffect, useCallback } from "react";
import { CartProductType, ProductType } from "@/lib/sanity/types";
import { urlFor } from "@/lib/sanity/urlBulder";
import Header from "@/components/Header";

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartProductType[]>([]);
  const [cartItemsCount, setCartItemsCount] = useState<number>(0);

  useEffect(() => {
    const localStorageCartItem =
      typeof window !== "undefined" && localStorage.getItem("hempire_cart");
    const parsedCartItems =
      localStorageCartItem && JSON.parse(localStorageCartItem);
    const itemsInCart = parsedCartItems ? parsedCartItems : [];
    setCartItems(itemsInCart);

    const localStorageCartItemCount =
      typeof window !== "undefined" &&
      localStorage.getItem("hempire_cartCount");
    const cartCount: number =
      localStorageCartItemCount && JSON.parse(localStorageCartItemCount);
    setCartItemsCount(cartCount || 0);
  }, []);

  const totalItems = 2;
  const totalCost = 2;

  const removeItemFromCart = (product: ProductType) => {
    const filteredItems = cartItems.filter(
      (item: ProductType) => item._id !== product._id
    );
    const count = cartItemsCount - 1;

    setCartItems(filteredItems);
    setCartItemsCount(count);

    updateLocalStorage(count, filteredItems);
  };

  const updateLocalStorage = useCallback(
    (count: number, cart: ProductType[]) => {
      if (typeof window !== "undefined") {
        localStorage.setItem("hempire_cartCount", JSON.stringify(count));
        localStorage.setItem("hempire_cart", JSON.stringify(cart));
      }
    },
    []
  );
  console.log(cartItems.length);
  return (
    <div className="flex flex-col min-h-screen  bg-white text-gray-900 ">
      <Header itemCount={cartItemsCount} />
      <main className="flex-1 bg-background  px-2 lg:max-w-4xl lg:mx-auto w-full  py-8 md:px-6 md:py-12">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
          <div className="grid gap-6">
            {cartItems.map((item, i) => (
              <div
                key={i}
                className="bg-card p-2  items-center  rounded-lg shadow-sm flex items-center gap-1"
              >
                <Image
                  src={urlFor(item.cover_image.asset._ref).url()}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="rounded-md object-cover"
                  style={{ aspectRatio: "1 / 1" }}
                />
                <div className="flex-1">
                  <h3 className="text-lg font-medium">{item.name}</h3>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <span>Quantity:</span>
                    <input
                      type="number"
                      className="font-medium w-10"
                      value={item.quantity}
                    />
                  </div>

                
                </div>
                <div className="text-righdt flex  flex-col items-center ">
                  <div className="text-lg font-medium">
                    ${item.price.toFixed(8)}
                  </div>
                  <button
                    onClick={() => removeItemFromCart(item)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <MdDelete className="h-5 w-5" />
                    <span className="sr-only">Remove</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <div className="     mb-5  mx-auto lg:max-w-4xl flex flex-col md:flex-row items-center justify-between  gap-4">
        <div className="flex items-center gap-2 text-muted-foreground">
          <MdShoppingCart className="h-5 w-5" />
          <span>{totalItems} item in cart</span>
        </div>
        <div className="text-lg font-medium">${totalCost.toFixed(2)}</div>
        <button className="w-full md:w-auto bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow-md hover:bg-primary-hover">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
