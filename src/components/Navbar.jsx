"use client";

import React, { useState, useEffect, useRef } from "react";
import NavLink from "@/components/NavLink";
import logo from "@/assets/logo.png";
import userAvatar from "@/assets/user.png";
import Link from "next/link";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { HiMenu, HiX } from "react-icons/hi";
import { FiLogOut, FiPlusCircle, FiList, FiBookmark } from "react-icons/fi";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Navbar = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [isOpen, setIsOpen] = useState(false); // Mobile drawer state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Profile dropdown state
  const dropdownRef = useRef(null);
  const user = session?.user;

  // Close dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          setIsDropdownOpen(false);
          setIsOpen(false);
          toast.success("Logged out successfully");

          // Refresh server layout properties to instantly clear private link visibility
          router.refresh();
          router.push("/");
        },
      },
    });
  };

  return (
    <nav className="bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border-b border-gray-200/80 dark:border-zinc-800/80 px-4 sm:px-8 py-3 fixed top-0 left-0 w-full z-50 shadow-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left Side: Logo & Name */}
        <div className="shrink-0">
          <Link
            href="/"
            className="flex items-center"
            onClick={() => setIsOpen(false)}
          >
            <Image
              src={logo}
              alt="StudyNook Logo"
              width={40}
              height={40}
              priority
              className="object-contain"
            />
            <span className="ml-2.5 text-xl font-bold tracking-tight text-[#344E41] dark:text-cyan-400">
              StudyNook
            </span>
          </Link>
        </div>

        {/* Center: Core Public Routes (Desktop) */}
        <div className="hidden md:flex items-center justify-center flex-1">
          <ul className="flex items-center gap-1 font-semibold text-gray-600 dark:text-zinc-300 ">
            <li>
              <NavLink
                href="/"
                className="px-3 py-2 rounded-lg hover:bg-slate-300 dark:hover:bg-zinc-900 transition-colors block"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                href="/rooms"
                className="px-3 py-2 rounded-lg hover:bg-slate-300 dark:hover:bg-zinc-900 transition-colors block"
              >
                Rooms
              </NavLink>
            </li>

            {/* Private Routes: Dynamic Layout Displayed Only When Authenticated */}
            {user && (
              <>
                <li className="hover:bg-slate-300 py-2 rounded-md">
                  <NavLink href={"/addRoom"} className="p-2 rounded-sm">
                    Add Room
                  </NavLink>
                </li>
                <li className="hover:bg-slate-300 py-2 rounded-md">
                  <NavLink href={"/my-listings"} className="p-2 rounded-sm">
                    My Listings
                  </NavLink>
                </li>
                <li className="hover:bg-slate-300 py-2 rounded-md">
                  <NavLink href={"/my-bookings"} className="p-2 rounded-sm">
                    My Bookings
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Right Side: Authentication Controls & Profile (Desktop) */}
        <div className="hidden md:flex items-center gap-4 shrink-0">
          {isPending ? (
            <span className="loading loading-spinner loading-sm text-cyan-600"></span>
          ) : user ? (
            /* Logged In - Profile Dropdown View */
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2.5 p-1 pr-3 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-900 border border-gray-200/60 dark:border-zinc-800 transition-all cursor-pointer focus:outline-hidden"
              >
                <div className="w-8 h-8 relative rounded-full overflow-hidden bg-slate-100 dark:bg-zinc-800 shrink-0">
                  <img
                    src={user.image || userAvatar.src}
                    alt={user.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = userAvatar.src;
                    }}
                  />
                </div>
                <span className="text-sm font-semibold text-gray-700 dark:text-zinc-200">
                  {user.name?.split(" ")[0]}
                </span>
                <svg
                  className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Absolute Dropdown Modal Panel */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-100">
                  <div className="px-4 py-2 border-b border-gray-100 dark:border-zinc-900 mb-1">
                    <p className="text-xs text-gray-400 font-medium">
                      Signed in as
                    </p>
                    <p className="text-sm font-bold text-gray-800 dark:text-zinc-200 truncate">
                      {user.name}
                    </p>
                  </div>

                  <Link
                    href="/addRoom"
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-900 font-medium transition-colors"
                  >
                    <FiPlusCircle className="text-gray-400 text-base" /> Add
                    Room
                  </Link>
                  <Link
                    href="/my-listings"
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-900 font-medium transition-colors"
                  >
                    <FiList className="text-gray-400 text-base" /> My Listings
                  </Link>
                  <Link
                    href="/my-bookings"
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-900 font-medium transition-colors"
                  >
                    <FiBookmark className="text-gray-400 text-base" /> My
                    Bookings
                  </Link>

                  <div className="border-t border-gray-100 dark:border-zinc-900 mt-1.5 pt-1.5">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 font-semibold transition-colors cursor-pointer text-left"
                    >
                      <FiLogOut className="text-base" /> Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Logged Out view buttons */
            <div className="flex items-center gap-2.5">
              <Link
                href="/auth/login"
                className="px-4 py-2 text-sm font-semibold bg-linear-to-r from-[#588157] to-[#3A5A40] hover:from-[#3A5A40] hover:to-[#344E41] text-white rounded-md transition-all shadow-xs"
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                className="px-4 py-2 text-sm font-semibold border border-[#3A5A40] dark:border-zinc-700 hover:bg-slate-300 dark:hover:bg-zinc-900 text-gray-700 dark:text-zinc-300 rounded-md transition-all"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Layout Menu Icon */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-xl text-gray-600 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-900 cursor-pointer focus:outline-hidden"
          >
            {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown Layout Context */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-zinc-950 border-b border-gray-200 dark:border-zinc-800 px-4 py-5 shadow-xl flex flex-col gap-4 animate-in fade-in slide-in-from-top-2 duration-150">
          <ul className="flex flex-col gap-1 font-semibold text-gray-700 dark:text-zinc-300">
            <li>
              <NavLink
                href="/"
                className="px-3 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-900 block"
                onClick={() => setIsOpen(false)}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                href="/rooms"
                className="px-3 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-900 block"
                onClick={() => setIsOpen(false)}
              >
                Rooms
              </NavLink>
            </li>

            {/* Private Routes shown directly inside the mobile stack */}
            {user && (
              <>
                <div className="border-t border-gray-100 dark:border-zinc-900 my-2 pt-2" />
                <p className="text-xxs font-bold text-gray-400 uppercase tracking-widest px-3 mb-1">
                  Workspace Manager
                </p>
                <li>
                  <NavLink
                    href="/addRoom"
                    className="px-3 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-900 flex items-center gap-2"
                    onClick={() => setIsOpen(false)}
                  >
                    <FiPlusCircle className="text-gray-400" /> Add Room
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    href="/my-listings"
                    className="px-3 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-900 flex items-center gap-2"
                    onClick={() => setIsOpen(false)}
                  >
                    <FiList className="text-gray-400" /> My Listings
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    href="/my-bookings"
                    className="px-3 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-900 flex items-center gap-2"
                    onClick={() => setIsOpen(false)}
                  >
                    <FiBookmark className="text-gray-400" /> My Bookings
                  </NavLink>
                </li>
              </>
            )}
          </ul>

          <div className="border-t border-gray-100 dark:border-zinc-900 pt-3">
            {isPending ? (
              <span className="loading loading-spinner loading-sm text-cyan-600 block mx-auto"></span>
            ) : user ? (
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center gap-3 px-3 py-1">
                  <div className="w-9 h-9 relative rounded-full overflow-hidden bg-slate-100">
                    <img
                      src={user.image || userAvatar.src}
                      alt={user.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = userAvatar.src;
                      }}
                    />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium">
                      Logged in
                    </p>
                    <p className="text-sm font-bold text-gray-800 dark:text-zinc-200">
                      {user.name}
                    </p>
                  </div>
                </div>
                <button
                  className="w-full text-center px-4 py-2.5 text-sm font-semibold bg-red-500 hover:bg-red-600 text-white rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2"
                  onClick={handleLogout}
                >
                  <FiLogOut /> Logout Account
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2.5 px-1">
                <Link
                  href="/auth/login"
                  onClick={() => setIsOpen(false)}
                  className="text-center px-4 py-2.5 text-sm font-semibold bg-linear-to-r from-[#588157] to-[#3A5A40] hover:from-[#3A5A40] hover:to-[#344E41] text-white rounded-xl transition-all"
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  onClick={() => setIsOpen(false)}
                  className="text-center px-4 py-2.5 text-sm font-semibold border border-[#3A5A40] dark:border-zinc-700 text-gray-700 dark:text-zinc-300 rounded-xl transition-all"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
