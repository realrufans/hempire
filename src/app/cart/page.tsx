"use client";

import Link from "next/link";
import Image from "next/image";
import { CiBadgeDollar, CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import {
  MdDelete,
  MdShoppingCart,
  MdHome,
  Md1kPlus,
  Md9kPlus,
} from "react-icons/md";
import { useState, useEffect, useCallback } from "react";
import { CartProductType, ProductType } from "@/lib/sanity/types";
import { urlFor } from "@/lib/sanity/urlBulder";
import Header from "@/components/Header";
import { formatBalance } from "@/lib/numberShortener";
import { currencyFormater } from "@/lib/currencyFormater";
import Script from "next/script";

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartProductType[]>([]);
  const [cartItemsCount, setCartItemsCount] = useState<number>(0);
  const [editValue, setEditValue] = useState<string>("");
  const [editing, setEditing] = useState<boolean>(false);
  const [editId, setEditId] = useState<string>("");

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

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const totalCost = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const removeItemFromCart = (product: CartProductType) => {
    const filteredItems = cartItems.filter(
      (item: ProductType) => item._id !== product._id
    );
    const count = cartItemsCount - product.quantity;

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

  const handleQuantityChange = (newQuantity: number, item: CartProductType) => {
    if (isNaN(newQuantity) || newQuantity <= 0) return;
    const updatedCartItems = cartItems.map((cartItem) =>
      cartItem._id === item._id
        ? { ...cartItem, quantity: newQuantity }
        : cartItem
    );

    setCartItems(updatedCartItems);
    setCartItemsCount(
      updatedCartItems.reduce((acc, item) => acc + item.quantity, 0)
    );
    updateLocalStorage(
      updatedCartItems.reduce((acc, item) => acc + item.quantity, 0),
      updatedCartItems
    );
  };

  // Declare the function outside the block
  function makePayment() {
    window.FlutterwaveCheckout({
      public_key: "FLWPUBK_TEST-02b9b5fc6406bd4a41c3ff141cc45e93-X",
      tx_ref: "txref-DI0NzMx13",
      amount: 2500,
      currency: "NGN",
      payment_options: "card, banktransfer, ussd",
      meta: {
        source: "docs-inline-test",
        consumer_mac: "92a3-912ba-1192a",
      },
      customer: {
        email: "test@mailinator.com",
        phone_number: "08100000000",
        name: "Ayomide Jimi-Oni",
      },
      customizations: {
        title: "Flutterwave Developers",
        description: "Test Payment",
        logo: "https://checkout.flutterwave.com/assets/img/rave-logo.png",
      },
      callback: function (data: any) {
        console.log("payment callback:", data);
      },
      onclose: function () {
        console.log("Payment cancelled!");
      },
    });
  }

  return (
    <div className="flex flex-col min-h-screen  bg-white text-gray-900 ">
      <Header itemCount={cartItemsCount} />
      <main className="flex-1 bg-background  px-2 lg:max-w-4xl lg:mx-auto w-full  py-8 md:px-6 md:py-12">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
          <div className="grid gap-6">
            {cartItems.length == 0 ? (
              <div className=" flex   justify-center   max-h-screen">
                Your cart is empty
              </div>
            ) : (
              cartItems.map((item, i) => (
                <div
                  key={item._id}
                  className="grid grid-cols-1  border-b-[1px] border-transparent/10 md:grid-cols-2 gap-4 p-4 md:p-6"
                >
                  <div className="flex items-center gap-4">
                    <Image
                      src={urlFor(item.cover_image.asset._ref).url()}
                      alt="Product Image"
                      width={100}
                      height={100}
                      className="aspect-square object-cover rounded-md"
                    />
                    <div>
                      <h3 className="text-lg font-semibold  first-letter:uppercase">
                        {item.name}
                      </h3>
                      <div className="text-2xl font-semibold">
                        {" "}
                        ₦{item.price}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div
                      onClick={() => removeItemFromCart(item)}
                      className="text-muted-foreground cursor-pointer"
                    >
                      Delete
                    </div>
                    <div className="flex items-center gap-2">
                      <CiCircleMinus
                        className="text-4xl  text-gray-600 cursor-pointer hover:bg-[#ff8a00] rounded-full hover:text-white"
                        onClick={(e) => {
                          let newQuantity = item.quantity;
                          newQuantity--;
                          handleQuantityChange(newQuantity, item);
                        }}
                      />
                      <span className="text-lg font-semibold">
                        {item.quantity}
                      </span>
                      <CiCirclePlus
                        className="text-4xl  text-gray-600 cursor-pointer hover:bg-[#ff8a00] rounded-full hover:text-white"
                        onClick={(e) => {
                          let newQuantity = item.quantity;
                          newQuantity++;
                          handleQuantityChange(newQuantity, item);
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
      <div className="mb-10  mx-auto lg:max-w-4xl  flex flex-col md:flex-r items-center justify-between  gap-4">
        <div className="flex items-center gap-2 text-muted-foreground">
          <MdShoppingCart className="h-5 w-5" />
          <span>
            {cartItems.length} items & {totalItems} pieces in the cart
          </span>
        </div>
        <div className="text-lg font-bold">
          Total: ₦{currencyFormater(totalCost.toFixed(2))}
        </div>
        <button
          onClick={makePayment}
          disabled={cartItems.length <= 0}
          className={`w-full md:w-auto  bg-[#ff8c00] text-white hover:bg-[#ff9c00]  px-4 py-2 rounded-lg shadow-md ${cartItems.length <= 0 && "cursor-not-allowed bg-gray-500 hover:bg-gray-500"}`}
        >
          Proceed to Checkout
        </button>

        <Script
          src="https://checkout.flutterwave.com/v3.js"
          strategy="beforeInteractive"
        />
      </div>
    </div>
  );
}
