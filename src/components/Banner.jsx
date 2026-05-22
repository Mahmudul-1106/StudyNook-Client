import React from "react";

const Banner = () => {
  return (
    <div
      className=" mx-auto hero min-h-[85vh] w-full bg-cover bg-center"
      style={{
        backgroundImage:
          "url(https://images.stockcake.com/public/0/1/1/0116f996-5785-4d14-9d85-0ba7a5bcf79a_large/serene-library-space-stockcake.jpg)",
      }}
    >
      <div className="hero-overlay bg-black/60 "></div>
      <div className="hero-content text-center text-neutral-content px-4">
        <div className="max-w-2xl">
          <h1 className="mb-6 text-4xl tracking-tight font-heading sm:text-5xl md:text-6xl text-white">
            Find Your Perfect Study Room
          </h1>
          <p className="mb-8 text-base text-neutral-content/90 sm:text-lg max-w-xl mx-auto leading-relaxed">
            Browse and book quiet, private study rooms in your library by the
            hour. List your own room and earn — without the scheduling
            headaches.
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
            <button className="btn btn-primary px-8 font-bold text-white shadow-lg shadow-primary/20 normal-case hover:scale-105 transition-transform duration-200">
              Explore Rooms
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
