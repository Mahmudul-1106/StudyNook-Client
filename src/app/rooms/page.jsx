"use client";

import React, { useState, useEffect } from "react";
import RoomCard from "@/components/RoomCard";

// Complete static list matching your room document definitions
const AMENITIES_LIST = [
  "Whiteboard",
  "Projector",
  "High-Speed Wi-Fi",
  "Air Conditioning",
  "Power Outlets",
  "Quiet Zone",
];

const RoomPage = () => {
  const [allRooms, setAllRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  // State Handlers for Filter Queries
  const [search, setSearch] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedFloor, setSelectedFloor] = useState("");

  // Track state alterations and fire API queries with slight input debouncing
  useEffect(() => {
    const fetchFilteredRooms = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams();

        if (search.trim()) queryParams.append("search", search.trim());
        if (maxPrice) queryParams.append("maxPrice", maxPrice);
        if (selectedFloor) queryParams.append("floor", selectedFloor);
        if (selectedAmenities.length > 0) {
          queryParams.append("amenities", selectedAmenities.join(","));
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/rooms?${queryParams.toString()}`,
          { cache: "no-store" },
        );
        const data = await res.json();
        setAllRooms(data);
      } catch (error) {
        console.error("Failed fetching rooms catalog query:", error);
      } finally {
        setLoading(false);
      }
    };

    // Debounce state calls for 300ms to stop unnecessary server traffic spikes on typing
    const delayDebounce = setTimeout(() => {
      fetchFilteredRooms();
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [search, selectedAmenities, maxPrice, selectedFloor]);

  // Push or pop targeted selections from state array
  const handleAmenityCheck = (amenity) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(
        selectedAmenities.filter((item) => item !== amenity),
      );
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  return (
    <div className="pt-5 pb-10 mx-auto px-4 min-h-screen">
      {/* Page Header Section */}
      <div className="mb-8 border-b border-gray-100 dark:border-zinc-900 pb-5">
        <h1 className="text-3xl font-extrabold tracking-tight text-[#344E41] dark:text-cyan-400 sm:text-4xl">
          All Study Rooms
        </h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-zinc-400 max-w-2xl">
          Browse our complete catalog of private rooms. Refine your discovery
          environment using filters below.
        </p>
      </div>

      {/* Main 12-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* SIDEBAR: Search and Filter Panel (Takes up 3 columns) */}
        <div className="lg:col-span-3 bg-[#DAD7CD]/30 dark:bg-zinc-900/40 border border-gray-200/80 dark:border-zinc-800/80 p-5 rounded-2xl flex flex-col gap-5 sticky top-24">
          <div>
            <h3 className="font-bold text-xs uppercase tracking-wider text-[#344E41] dark:text-zinc-400 mb-2.5">
              Search by Room Name
            </h3>
            <input
              type="text"
              placeholder="Room Name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white dark:bg-zinc-950 border border-gray-300 dark:border-zinc-800 rounded-xl px-3 py-2 text-sm focus:outline-hidden focus:border-[#3A5A40] transition-colors"
            />
          </div>

          <hr className="border-gray-200/60 dark:border-zinc-800/60" />

          {/* Optional Filter: Price Point Boundary */}
          <div>
            <h3 className="font-bold text-xs uppercase tracking-wider text-[#344E41] dark:text-zinc-400 mb-2.5">
              Hourly Budget Limit ($)
            </h3>
            <input
              type="number"
              placeholder="Maximum hourly rate"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full bg-white dark:bg-zinc-950 border border-gray-300 dark:border-zinc-800 rounded-xl px-3 py-2 text-sm focus:outline-hidden focus:border-[#3A5A40] transition-colors"
            />
          </div>

          <hr className="border-gray-200/60 dark:border-zinc-800/60" />

          {/* Amenities Filter Group */}
          <div>
            <h3 className="font-bold text-xs uppercase tracking-wider text-[#344E41] dark:text-zinc-400 mb-3">
              Included Amenities
            </h3>
            <div className="flex flex-col gap-2">
              {AMENITIES_LIST.map((amenity) => (
                <label
                  key={amenity}
                  className="flex items-center gap-2.5 text-sm font-medium text-gray-700 dark:text-zinc-300 cursor-pointer select-none group"
                >
                  <input
                    type="checkbox"
                    checked={selectedAmenities.includes(amenity)}
                    onChange={() => handleAmenityCheck(amenity)}
                    className="w-4 h-4 rounded border-gray-300 dark:border-zinc-800 accent-[#3A5A40] cursor-pointer"
                  />
                  <span className="group-hover:text-black dark:group-hover:text-white transition-colors">
                    {amenity}
                  </span>
                </label>
              ))}
            </div>
          </div>
          <hr className="border-gray-200/60 dark:border-zinc-800/60" />
          <button
            onClick={() => {
              setSearch("");
              setSelectedAmenities([]);
              setMaxPrice("");
              // setSelectedFloor("");
            }}
            className="px-4 py-2 text-xs font-bold bg-[#3A5A40] text-white rounded-lg hover:bg-[#344E41] transition-all cursor-pointer"
          >
            Clear All Filters
          </button>
        </div>

        {/* MAIN BODY: Grid Component Container (Takes up 9 columns) */}
        <div className="lg:col-span-9">
          {loading ? (
            <div className="w-full flex flex-col items-center justify-center py-24 gap-3">
              <span className="loading loading-spinner loading-lg text-[#3A5A40]"></span>
              <p className="text-xs font-semibold text-gray-400 animate-pulse">
                Syncing room inventory...
              </p>
            </div>
          ) : allRooms.length > 0 ? (
            /* Layout matches home page grid properties to retain identical visual standard definitions */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-gray-50 dark:bg-zinc-950 border border-gray-100 dark:border-zinc-900 p-5 rounded-2xl">
              {allRooms.map((room) => (
                <RoomCard key={room._id} room={room} />
              ))}
            </div>
          ) : (
            /* Friendly "No Rooms Found" User Interface Fallback Block */
            <div className="text-center py-20 px-4 bg-white dark:bg-zinc-950 border-2 border-dashed border-gray-200 dark:border-zinc-800 rounded-2xl flex flex-col items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-amber-50 dark:bg-amber-950/20 text-amber-600 flex items-center justify-center mb-4 text-xl font-bold">
                !
              </div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-zinc-200">
                No Study Rooms Found
              </h3>
              <p className="text-sm text-gray-500 dark:text-zinc-400 mt-1 max-w-sm">
                We couldn't find any rooms matching your exact query criteria.
                Try removing or adjusting your filter metrics!
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  setSelectedAmenities([]);
                  setMaxPrice("");
                  // setSelectedFloor("");
                }}
                className="mt-4 px-4 py-2 text-xs font-bold bg-[#3A5A40] text-white rounded-lg hover:bg-[#344E41] transition-all cursor-pointer"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomPage;
