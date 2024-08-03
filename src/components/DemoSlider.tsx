"use client"; // <===== REQUIRED

import React from "react";

// Swiper components, modules and styles
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SliderButtons from "./SliderButtons";
import Image from "next/image";
import Link from "next/link";

// Our custom button component

interface Slide {
  id: number;
  title: string;
  tagline: string;
  image: string;
  buttons: ButtonProps[];
}

interface ButtonProps {
  id: number;
  text: string;
  link: string;
  type: string;
}

const DemoSlider = () => {
  return (
    <div className="relative w-full h-screen">
      <Image
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        alt="Homepage featured image"
        priority
        src="/assets/images/main-slider/3.jpg"
        className="absolute inset-0 opacity-80"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 px-4 py-20  bg-opacity-40">
        <h1 className="text-center text-[32px] leading-[38px] font-bold  py-2    bg-transparent/50 rounded-full border-2 border-white/50 px-5 tracking-tighter sm:text-[77px] sm:leading-[79px] md:text-left text-white">
          Luxury Look At It&apos;s Peak
        </h1>
        <Link href="/products" target="_blank" prefetch={false}>
          <button className="py-[10px] text-[21px] md:py-[14px] md:text-[23px] bg-[#ff8a00] font-bold text-white  hover:border-2 hover:bg-transparent px-5  rounded-lg">
            Shop Now!
          </button>
        </Link>
      </div>
    </div>
  );
};

export default DemoSlider;
