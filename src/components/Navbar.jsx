"use client";

import React from "react";
import NavLink from "./NavLink";
import logo from "@/assets/logo.png";
import userAvatar from "@/assets/user.png";
import Link from "next/link";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";

const Navbar = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  return (
    <div className="bg-white px-2 sm:px-10 mx-auto flex items-center flex-col sm:flex-row justify-between gap-4 py-3 fixed top-0 left-0 w-full z-50 border-b border-gray-100">
      {/* Brand Logo Wrapper */}
      <div className="flex flex-1">
        <Link href={"/"}>
          <Image
            src={logo}
            alt="StudyNook Logo"
            width={50}
            height={50}
            priority
          />
        </Link>
      </div>

      {/* Navigation Links - Updated to match StudyNook Layout Requirements */}
      <ul className="flex flex-1 justify-center font-semibold items-center text-gray-700 gap-3">
        <li>
          <NavLink href={"/"} className="p-2 rounded-sm">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink href={"/rooms"} className="p-2 rounded-sm">
            Rooms
          </NavLink>
        </li>

        {/* Private Routes: Dynamic Layout Displayed Only When Authenticated */}
        {user && (
          <>
            <li>
              <NavLink href={"/add-room"} className="p-2 rounded-sm">
                Add Room
              </NavLink>
            </li>
            <li>
              <NavLink href={"/my-listings"} className="p-2 rounded-sm">
                My Listings
              </NavLink>
            </li>
            <li>
              <NavLink href={"/my-bookings"} className="p-2 rounded-sm">
                My Bookings
              </NavLink>
            </li>
          </>
        )}
      </ul>

      {/* Authentication Action Status Area */}
      <div className="flex flex-1 justify-end items-center gap-4">
        {isPending ? (
          <span className="loading loading-spinner loading-md text-cyan-600"></span>
        ) : user ? (
          <div className="flex items-center gap-3">
            <h2 className="text-sm font-medium text-gray-700 hidden md:block">
              Hello, {user.name.split(" ")[0]}
            </h2>

            {/* Profile Avatar handling external strings directly without breaking Next.js builds */}
            <div className="w-10 h-10 relative rounded-full overflow-hidden border border-gray-200">
              <img
                src={user.image || userAvatar.src}
                alt={`${user.name || "User"}'s Profile avatar`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = userAvatar.src;
                  // Safe client fallback if remote string fails
                }}
              />
            </div>

            <button
              className="px-4 py-2 text-sm font-medium bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
              onClick={async () => await authClient.signOut()}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              href="/auth/login"
              className="px-4 py-2 text-sm font-medium bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors"
            >
              Login
            </Link>
            <Link
              href="/auth/register"
              className="px-4 py-2 text-sm font-medium border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg transition-colors"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
