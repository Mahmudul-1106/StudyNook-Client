import Link from "next/link";
import React from "react";

const Banner = () => {
  return (
    <div
      className=" mx-auto hero min-h-[85vh] w-full bg-cover bg-center"
      style={{
        backgroundImage: "url(https://i.ibb.co.com/why29PMG/banner.jpg)",
      }}
    >
      <div className="hero-overlay bg-black/60 "></div>
      <div className="hero-content text-center text-neutral-content px-4">
        <div className="max-w-2xl">
          <h1 className="mb-6 text-4xl tracking-tight font-heading sm:text-5xl md:text-6xl text-white">
            Find Your Perfect Study Room
          </h1>
          <p className="mb-8 text-base text-neutral-content/90 sm:text-lg max-w-xl mx-auto leading-relaxed">
            Browse and book quiet, private study rooms in your library. List
            your own room and earn.
          </p>
          <span className="text-rotate text-3xl leading-[2]">
            <span className="justify-items-center font-semibold">
              <span>👍🏼 4.9 Avg. Rating</span>
              <span>⏱️ 8k Hours Booked</span>
              <span>🏠 120+ Rooms</span>
            </span>
          </span>
          <br />
          <div>
            <Link href={"/rooms"}>
              <button className="p-3 border border-white rounded-xl bg-linear-to-r from-[#588157] to-[#3A5A40] hover:from-[#3A5A40] hover:to-[#344E41] px-8 font-bold text-white  hover:scale-105 transition-transform duration-200">
                Explore Rooms
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
