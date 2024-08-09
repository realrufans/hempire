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
  MdCheckCircleOutline,
} from "react-icons/md";
import {
  useState,
  useEffect,
  useCallback,
  ChangeEvent,
  FormEvent,
} from "react";
import { CartProductType, ProductType } from "@/lib/sanity/types";
import { urlFor } from "@/lib/sanity/urlBulder";
import Header from "@/components/Header";
import { formatBalance } from "@/lib/numberShortener";
import { currencyFormater } from "@/lib/currencyFormater";
import Script from "next/script";
import Head from "next/head";
import axios from "axios";

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartProductType[]>([]);
  const [cartItemsCount, setCartItemsCount] = useState<number>(0);
  const [txRef, setTxRef] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>("");
  const [editing, setEditing] = useState<boolean>(false);
  const [paying, setPaying] = useState<boolean>(false);
  const [editId, setEditId] = useState<string>("");
  const [paid, setPaid] = useState<boolean>(false);
  const [orderForm, setOrderForm] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: "Test",
    email: "test@gmail.com",
    phone: "123456",
    address: "no, 2 ",
    city: "abuja",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic
    console.log(formData);
  };

  const handleProceed = () => {
    // Handle the proceed action
    console.log("Proceed clicked");
  };
  // genereate TxRef
  useEffect(() => {
    const fetchTxRef = async () => {
      try {
        const response = await axios.get("/api/generate-tx-ref");
        setTxRef(response.data.txRef);
      } catch (error) {
        console.error("Failed to fetch transaction reference:", error);
      }
    };

    fetchTxRef();
  }, []);

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
  }, [paid]);

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

  console.log(txRef)

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
    setPaying(true);
    setOrderForm(false);
    window.FlutterwaveCheckout({
      public_key: "FLWPUBK_TEST-02b9b5fc6406bd4a41c3ff141cc45e93-X",
      tx_ref: txRef,
      amount: 2000,
      // amount: Number(totalCost),

      currency: "NGN",
      payment_options: "card, banktransfer, ussd",
      // meta: {
      //   source: "docs-inline-test",
      //   consumer_mac: "92a3-912ba-1192a",
      // },
      customer: {
        email: "emetsdsdsdomon@gmail.com",
        phone_number: "08100000000",
        name: "Ayomide Jimi-Oni",
      },
      customizations: {
        title: "Harnah Empire",
        description: "Order payment",
        logo: "https://images.hive.blog/DQmXxWnhWk7QRbBRhGtNsXgfEwnwoQP7rMFcHCgkH4Yg7Lk/1.png",
      },
      callback: function (data: any) {
        setPaying(false);

        updateLocalStorage(0, []);
        setPaid(true);
        //  send data to email
        console.log("payment callback:", data);
      },
      onclose: function () {
        setPaying(false);
        console.log("Payment cancelled!");
      },
    });
  }
 alert(txRef)
  return (
    <div className="flex flex-col min-h-screen   bg-white text-gray-900 ">
      <Header itemCount={cartItemsCount} />

      {!paid && !orderForm && (
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
                        <div className="text-base font-semibold">
                          {" "}
                          ₦{currencyFormater(item.price.toString())}
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
      )}
      {!paid && !orderForm && (
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
            onClick={() => setOrderForm(true)}
            disabled={cartItems.length <= 0}
            className={`min-w-52 max-w-60 md:w-auto    bg-[#ff8c00] text-white hover:bg-[#ff9c00]  px-4 py-2 rounded-lg shadow-md ${cartItems.length <= 0 && "cursor-not-allowed bg-gray-500 hover:bg-gray-500"}`}
          >
            {paying ? "Processing" : "Proceed to Checkout"}
          </button>
        </div>
      )}

      {paid && (
        <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-md text-center">
            <div className="inline-block rounded-full  border-2   text-[#ff9c00] p-4">
              <MdCheckCircleOutline className="h-12 w-12 text-[#ff9c00]-foreground" />
            </div>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Thank You!
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Thank you for your purchase. We appreciate your business and look
              forward to serving you again in the future.
            </p>
            <div className="mt-6">
              <Link
                href="/"
                className="inline-flex text-white items-center rounded-md bg-[#ff9c00] px-4 py-2 text-sm font-medium text-[#ff9c00]-foreground shadow-sm transition-colors hover:bg-[#ff9c00]/90 focus:outline-none focus:ring-2 focus:ring-[#ff9c00] focus:ring-offset-2"
                prefetch={false}
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* order form */}

      {orderForm && (
        <div className="max-w-md mx-auto p-6 max-md:mt-20 bg-white shadow-md rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">
            Enter your personal information.
          </h2>
          <form className="space-y-4" onSubmit={makePayment}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                required
                type="text"
                id="name"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                required
                type="email"
                id="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone
              </label>
              <input
                required
                type="tel"
                id="phone"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="123-456-7890"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Address
              </label>
              <input
                required
                type="text"
                id="address"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="123 Main St"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700"
              >
                City
              </label>
              <input
                required
                type="text"
                id="city"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Town"
                value={formData.city}
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-between    w-full">
              <button
                onClick={() => setOrderForm(false)}
                type="button"
                className="w-1/2   bg-black text-white hover:bg-black  px-2  py-2 m-2 rounded-lg shadow-md"
              >
                Cancel
              </button>

              <button
                onClick={makePayment}
                disabled={cartItems.length <= 0}
                className={` w-1/2     bg-[#ff8c00] text-white hover:bg-[#ff9c00]  px-2  py-2 m-2    rounded-lg shadow-md `}
              >
                {paying ? "Processing" : "Checkout"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
