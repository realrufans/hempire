import React, { useState } from "react";
import Link from "next/link";

const MobileMenu: React.FC = () => {
  const [menOpen, setMenOpen] = useState(false);
  const [womenOpen, setWomenOpen] = useState(false);

  const toggleMenDropdown = () => setMenOpen(!menOpen);
  const toggleWomenDropdown = () => setWomenOpen(!womenOpen);

  return (
    <nav
      id="mobile-menu-placeholder"
      className="mobile-menu hidden flex flex-col items-center space-y-8 lg:hidden"
    >
      <ul className="w-full">
        <li>
          <Link href="/index.html">
            <a className="hover:text-secondary font-bold block py-2">Home</a>
          </Link>
        </li>

        {/* Men Dropdown */}
        <li className="relative group">
          <a
            onClick={(e) => {
              e.preventDefault();
              toggleMenDropdown();
            }}
            className="hover:text-secondary font-bold block py-2 flex justify-center items-center cursor-pointer"
          >
            <span>Men</span>
            <span
              onClick={(e) => {
                e.stopPropagation();
                toggleMenDropdown();
              }}
            >
              <i
                className={
                  menOpen
                    ? "fas fa-chevron-up text-xs ml-2"
                    : "fas fa-chevron-down text-xs ml-2"
                }
              ></i>
            </span>
          </a>
          {menOpen && (
            <ul className="mobile-dropdown-menu space-y-2">
              <li>
                <Link href="/shop.html">
                  <a className="hover:text-secondary font-bold block pt-2 pb-3">
                    Shop Men
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/single-product-page.html">
                  <a className="hover:text-secondary font-bold block py-2">
                    Men item 1
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/single-product-page.html">
                  <a className="hover:text-secondary font-bold block py-2">
                    Men item 2
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/single-product-page.html">
                  <a className="hover:text-secondary font-bold block py-2">
                    Men item 3
                  </a>
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* Women Dropdown */}
        <li className="relative group">
          <a
            onClick={(e) => {
              e.preventDefault();
              toggleWomenDropdown();
            }}
            className="hover:text-secondary font-bold block py-2 flex justify-center items-center cursor-pointer"
          >
            <span>Women</span>
            <span
              onClick={(e) => {
                e.stopPropagation();
                toggleWomenDropdown();
              }}
            >
              <i
                className={
                  womenOpen
                    ? "fas fa-chevron-up text-xs ml-2"
                    : "fas fa-chevron-down text-xs ml-2"
                }
              ></i>
            </span>
          </a>
          {womenOpen && (
            <ul className="mobile-dropdown-menu pl-4 space-y-2">
              <li>
                <Link href="/shop.html">
                  <a className="hover:text-secondary font-bold block py-2">
                    Shop Women
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/single-product-page.html">
                  <a className="hover:text-secondary font-bold block py-2">
                    Women item 1
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/single-product-page.html">
                  <a className="hover:text-secondary font-bold block py-2">
                    Women item 2
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/single-product-page.html">
                  <a className="hover:text-secondary font-bold block py-2">
                    Women item 3
                  </a>
                </Link>
              </li>
            </ul>
          )}
        </li>

        <li>
          <Link href="/shop.html">
            <a className="hover:text-secondary font-bold block py-2">Shop</a>
          </Link>
        </li>
        <li>
          <Link href="/single-product-page.html">
            <a className="hover:text-secondary font-bold block py-2">Product</a>
          </Link>
        </li>
        <li>
          <Link href="/404.html">
            <a className="hover:text-secondary font-bold block py-2">
              404 page
            </a>
          </Link>
        </li>
        <li>
          <Link href="/checkout.html">
            <a className="hover:text-secondary font-bold block py-2">
              Checkout
            </a>
          </Link>
        </li>
      </ul>
      <div className="flex flex-col mt-6 space-y-2 items-center">
        <Link href="/register.html">
          <a className="bg-primary hover:bg-transparent text-white hover:text-primary border border-primary font-semibold px-4 py-2 rounded-full inline-block flex items-center justify-center min-w-[110px]">
            Register
          </a>
        </Link>
        <Link href="/register.html">
          <a className="bg-primary hover:bg-transparent text-white hover:text-primary border border-primary font-semibold px-4 py-2 rounded-full inline-block flex items-center justify-center min-w-[110px]">
            Login
          </a>
        </Link>
        <Link href="/register.html">
          <a className="bg-primary hover:bg-transparent text-white hover:text-primary border border-primary font-semibold px-4 py-2 rounded-full inline-block flex items-center justify-center min-w-[110px]">
            Cart -&nbsp;<span>5</span>&nbsp;items
          </a>
        </Link>
      </div>
      {/* Search field */}
      <div className="top-full right-0 mt-2 w-full bg-white shadow-lg p-2 rounded">
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Search for products..."
        />
      </div>
    </nav>
  );
};

export default MobileMenu;
