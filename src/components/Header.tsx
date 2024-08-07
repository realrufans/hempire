"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CiShoppingCart } from "react-icons/ci";
import { ToastContainer } from "react-toastify";
import { MdClose, MdMenu } from "react-icons/md";
import Script from "next/script";

interface counter {
  itemCount: number;
}
const Header = ({ itemCount }: counter) => {
  const [isMenOpen, setIsMenOpen] = useState(false);
  const [isWomenOpen, setIsWomenOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className=" relative bg-gray-900 sticky top-0 z-50">
      <Script
        src="https://checkout.flutterwave.com/v3.js"
        strategy="beforeInteractive"
      />
      <div className="container mx-auto flex justify-between items-center py-4">
        {/* Left section: Logo */}
        <div className="relative group cart-wrapper">
          <Link href="/">
            <Image
              src="/assets/images/logo.png"
              alt="Cart"
              width={500}
              height={500}
              className="h-8 w-8  border-2 rounded-full border-gray-800  p-[1px] group-hover:scale-120"
            />
          </Link>
        </div>

        {/* Hamburger menu (for mobile) */}
        <div className="flex p-2 space-x-2 items-center sm:hidden">
          <div className="relative group cart-wrapper">
            <Link href="/cart">
              <Image
                src="/assets/images/cart-shopping.svg"
                alt="Cart"
                width={24}
                height={24}
                className="h-8 w-8 group-hover:scale-120"
              />
              <p className="absolute  left-2 -top-5 text-[#ff8c00] font-extrabold z-50">
                {itemCount}
              </p>
            </Link>
          </div>

          <button
            onClick={toggleMenu}
            id="hamburger"
            className="text-white focus:outline-none"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div className=" sm:hidden   absolute bg-white  h-screen top-20  left-0 right-0  w-full text-gray-900">
            <nav className="flex flex-col   space-y-8 items-center gap-4 py-4">
              <Link
                href="/men"
                className="font-semibold  first-letter:capitalize"
              >
                Bone Straight
              </Link>
              <Link
                href="/women"
                className="font-semibold  first-letter:capitalize"
              >
                Body wavy
              </Link>
              <Link
                href="/shop"
                className="font-semibold  first-letter:capitalize"
              >
                Pixie curls
              </Link>
              <Link
                href="/product"
                className="font-semibold  first-letter:capitalize"
              >
                Factory Wig
              </Link>
              <Link
                href="/404"
                className="font-semibold  first-letter:capitalize"
              >
                Under 100k Products
              </Link>
              <Link
                href="/checkout"
                className="font-semibold  first-letter:capitalize"
              >
                Checkout
              </Link>
              <div className=" flex justify-between   w-48 mx-2">
                <Link
                  href="/register"
                  className="bg-[#ff8c00] border border-[#ff8c00] hover:bg-transparent text-white hover:text-[#ff8c00] font-semibold px-4 py-2 rounded-full inline-block"
                >
                  Register
                </Link>
                <Link
                  href="/register"
                  className="bg-[#ff8c00] border border-[#ff8c00] hover:bg-transparent text-white hover:text-[#ff8c00] font-semibold px-4 py-2 rounded-full inline-block"
                >
                  Login
                </Link>
              </div>
            </nav>
          </div>
        )}

        {/* Right section: Buttons (for desktop) */}
        <div className="hidden sm:flex items-center space-x-4 relative">
          <Link
            href="/register"
            className="border  text-white hover:text-[#ff8c00] font-semibold px-4 py-2 rounded-full inline-block"
          >
            Register
          </Link>
          <Link
            href="/register"
            className="bg-[#ff8c00] border border-[#ff8c00] hover:bg-transparent text-white hover:text-[#ff8c00] font-semibold px-4 py-2 rounded-full inline-block"
          >
            Login
          </Link>
          <div className="relative group cart-wrapper">
            <Link href="/cart">
              <Image
                src="/assets/images/cart-shopping.svg"
                alt="Cart"
                width={24}
                height={24}
                className="h-6 w-6 group-hover:scale-120"
              />
              <p className="absolute  left-2 -top-5 text-[#ff8c00] font-extrabold z-50">
                {itemCount}
              </p>
            </Link>

            {/* Cart dropdown */}
            <div
              className={`absolute right-0 mt-1 w-80 bg-white shadow-lg p-4 rounded ${
                isCartOpen ? "block" : "hidden"
              }`}
              onMouseEnter={() => setIsCartOpen(true)}
              onMouseLeave={() => setIsCartOpen(false)}
            >
              <div className="space-y-4">
                {/* product item */}
                <div className="flex items-center justify-between pb-4 border-b border-gray-line">
                  <div className="flex items-center">
                    <Image
                      src="/assets/images/single-product/1.jpg"
                      alt="Product"
                      width={48}
                      height={48}
                      className="h-12 w-12 object-cover rounded mr-2"
                    />
                    <div>
                      <p className="font-semibold">Summer black dress</p>
                      <p className="text-sm">Quantity: 1</p>
                    </div>
                  </div>
                  <p className="font-semibold">$25.00</p>
                </div>
                {/* product item */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Image
                      src="/assets/images/single-product/2.jpg"
                      alt="Product"
                      width={48}
                      height={48}
                      className="h-12 w-12 object-cover rounded mr-2"
                    />
                    <div>
                      <p className="font-semibold">Black suit</p>
                      <p className="text-sm">Quantity: 1</p>
                    </div>
                  </div>
                  <p className="font-semibold">$125.00</p>
                </div>
              </div>
              <Link
                href="/cart"
                className="block text-center mt-4 border border-[#ff8c00] bg-[#ff8c00] hover:bg-transparent text-white hover:text-[#ff8c00] py-2 rounded-full font-semibold"
              >
                Go to Cart
              </Link>
            </div>
          </div>
          <button
            id="search-icon"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="text-white hover:text-secondary group"
          >
            <Image
              src="/assets/images/search-icon.svg"
              alt="Search"
              width={24}
              height={24}
              className="h-6 w-6 transition-transform transform group-hover:scale-120"
            />
          </button>
          {/* Search field */}
          {isSearchOpen && (
            <div
              id="search-field"
              className="absolute top-full right-0 mt-2 w-full bg-white shadow-lg p-2 rounded"
            >
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Search for products..."
              />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
