/* eslint-disable react/no-unescaped-entities */
import { HomeIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const NotFoundPage = () => {
  return (
    <div className="border-t border-b border-gray-300 text-center px-16 py-16 sm:py-20 lg:py-24 xl:py-32 flex items-center justify-center">
      <div>
        <Image
          src="/404.svg"
          alt={"404"}
          width={822}
          height={492}
        />

        <h2 ></h2>
        <p className="text-sm md:text-base leading-7 pt-2 md:pt-3.5 pb-7 md:pb-9">
          Sorry, we couldn't find this page.
        </p>
        <Link
          href="/"
          className="text-[13px] md:text-sm lg:text-base  inline-flex items-center cursor-pointer transition ease-in-out duration-300 bg-primary text-white px-4 md:px-6  py-2.5 lg:py-3 hover:text-white hover:bg-gray-600 hover:shadow-cart rounded-lg"
        >
          <HomeIcon />
          <span className=" pr-1.5 ">Go to home</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;