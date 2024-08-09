// components/Footer.tsx
import React from "react";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="mt-20  border-gray-line bg-gray-900">
      {/* Top part */}
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-wrap -mx-4">
          {/* Menu 1 */}
          <div className="w-full sm:w-1/6 px-4 mb-8">
            <h3 className="text-lg font-semibold mb-4">Shop</h3>
            <ul>
              <li>
                <Link href="/shop">Shop</Link>
              </li>
              <li>
                <Link href="/single-product-page">Women</Link>
              </li>
              <li>
                <Link href="/shop">Men</Link>
              </li>
              <li>
                <Link href="/single-product-page">Shoes</Link>
              </li>
              <li>
                <Link href="/single-product-page">Short hairs</Link>
              </li>
            </ul>
          </div>
          {/* Menu 2 */}
          <div className="w-full sm:w-1/6 px-4 mb-8">
            <h3 className="text-lg font-semibold mb-4">Pages</h3>
            <ul>
              <li>
                <Link href="/shop">Short</Link>
              </li>
              <li>
                <Link href="/single-product-page">Colored wig</Link>
              </li>
              <li>
                <Link href="/checkout">Checkout</Link>
              </li>
              <li>
                <Link href="/404">Test</Link>
              </li>
            </ul>
          </div>
          {/* Menu 3 */}
          <div className="w-full sm:w-1/6 px-4 mb-8">
            <h3 className="text-lg font-semibold mb-4">Account</h3>
            <ul>
              <li>
                <Link href="/cart">sdsd</Link>
              </li>
              <li>
                <Link href="/register">Register</Link>
              </li>
              <li>
                <Link href="/register">Login</Link>
              </li>
            </ul>
          </div>
          {/* Social Media */}
          <div className="w-full sm:w-1/6 px-4 mb-8">
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <ul>
              <li className="flex items-center mb-2">
                <img
                  src="/assets/images/social_icons/facebook.svg"
                  alt="Facebook"
                  className="w-4 h-4 transition-transform transform hover:scale-110 mr-2"
                />
                <Link href="#">Facebook</Link>
              </li>
              <li className="flex items-center mb-2">
                <img
                  src="/assets/images/social_icons/twitter.svg"
                  alt="Twitter"
                  className="w-4 h-4 transition-transform transform hover:scale-110 mr-2"
                />
                <Link href="#">Twitter</Link>
              </li>
              <li className="flex items-center mb-2">
                <img
                  src="/assets/images/social_icons/instagram.svg"
                  alt="Instagram"
                  className="w-4 h-4 transition-transform transform hover:scale-110 mr-2"
                />
                <Link href="#">Instagram</Link>
              </li>
            </ul>
          </div>
          {/* Contact Information */}
          <div className="w-full sm:w-2/6 px-4 mb-8">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p></p>
            <p>123 Street Name, Paris, France</p>
            <p className="text-xl font-bold my-4">Phone: (123) 456-7890</p>
            <Link href="mailto:info@company.com" className="underline">
              Email: info@company.com
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom part */}
      <div className="py-6 border-t border-gray-line">
        <div className="container mx-auto px-4 flex flex-wrap justify-between items-center">
          {/* Copyright and Links */}
          <div className="w-full lg:w-3/4 text-center lg:text-left mb-4 lg:mb-0">
            <p className="mb-2 font-bold">
              &copy; 2024 Your Company. All rights reserved.
            </p>
            <ul className="flex justify-center lg:justify-start space-x-4 mb-4 lg:mb-0">
              <li>
                <Link href="#">Privacy Policy</Link>
              </li>
              <li>
                <Link href="#">Terms of Service</Link>
              </li>
              <li>
                <Link href="#">FAQ</Link>
              </li>
            </ul>
            <p className="text-sm mt-4">
              Your shop&apos;s description goes here. This is a brief
              introduction to your shop and what you offer.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
