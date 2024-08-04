import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CiShoppingCart } from "react-icons/ci";
import { ToastContainer } from "react-toastify";

interface counter {
  itemCount: number;
}
const Header = ({ itemCount }: counter) => {
  const [isMenOpen, setIsMenOpen] = useState(false);
  const [isWomenOpen, setIsWomenOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="bg-gray-900 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-4">
        {/* Left section: Logo */}
        <Link
          className="flex items-center text-[#ff8c00] font-bold text-2xl"
          href="/"
        >
          <h1>HarnahEmpire</h1>
        </Link>

        {/* Hamburger menu (for mobile) */}
        <div className="flex lg:hidden">
          <button id="hamburger" className="text-white focus:outline-none">
            <svg
              className="w-6 h-6"
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

        {/* Center section: Menu */}
        <nav className="hidden lg:flex md:flex-grow justify-center">
          <ul className="flex justify-center space-x-4 text-white">
            <li>
              <Link className="hover:text-secondary font-semibold" href="/">
                Home
              </Link>
            </li>

            {/* Men Dropdown */}
            <li
              className="relative group"
              onMouseEnter={() => setIsMenOpen(true)}
              onMouseLeave={() => setIsMenOpen(false)}
            >
              <Link
                className="hover:text-secondary font-semibold flex items-center"
                href="/shop"
              >
                Men
                <i
                  className={`ml-1 text-xs ${
                    isMenOpen ? "fas fa-chevron-up" : "fas fa-chevron-down"
                  }`}
                ></i>
              </Link>
              {isMenOpen && (
                <ul className="absolute left-0 bg-white text-black space-y-2 mt-1 p-2 rounded shadow-lg">
                  <li>
                    <Link
                      className="min-w-40 block px-4 py-2 hover:bg-[#ff8c00] hover:text-white rounded"
                      href="/shop"
                    >
                      Men Item 1
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="min-w-40 block px-4 py-2 hover:bg-[#ff8c00] hover:text-white rounded"
                      href="/shop"
                    >
                      Men Item 2
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="min-w-40 block px-4 py-2 hover:bg-[#ff8c00] hover:text-white rounded"
                      href="/shop"
                    >
                      Men Item 3
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* Women Dropdown */}
            <li
              className="relative group"
              onMouseEnter={() => setIsWomenOpen(true)}
              onMouseLeave={() => setIsWomenOpen(false)}
            >
              <Link
                className="hover:text-secondary font-semibold flex items-center"
                href="/shop"
              >
                Women
                <i
                  className={`ml-1 text-xs ${
                    isWomenOpen ? "fas fa-chevron-up" : "fas fa-chevron-down"
                  }`}
                ></i>
              </Link>
              {isWomenOpen && (
                <ul className="absolute left-0 bg-white text-black space-y-2 mt-1 p-2 rounded shadow-lg">
                  <li>
                    <Link
                      href="/shop"
                      className="min-w-40 block px-4 py-2 hover:bg-[#ff8c00] hover:text-white rounded"
                    >
                      Women Item 1
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/shop"
                      className="min-w-40 block px-4 py-2 hover:bg-[#ff8c00] hover:text-white rounded"
                    >
                      Women Item 2
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/shop"
                      className="min-w-40 block px-4 py-2 hover:bg-[#ff8c00] hover:text-white rounded"
                    >
                      Women Item 3
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <Link href="/shop" className="hover:text-secondary font-semibold">
                Shop
              </Link>
            </li>
            <li>
              <Link
                href="/single-product-page"
                className="hover:text-secondary font-semibold"
              >
                Product
              </Link>
            </li>
            <li>
              <Link href="/404" className="hover:text-secondary font-semibold">
                404 page
              </Link>
            </li>
            <li>
              <Link
                href="/checkout"
                className="hover:text-secondary font-semibold"
              >
                Checkout
              </Link>
            </li>
          </ul>
        </nav>

        {/* Right section: Buttons (for desktop) */}
        <div className="hidden lg:flex items-center space-x-4 relative">
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
