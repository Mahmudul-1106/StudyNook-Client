"use client";

import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#344E41] text-[#DAD7CD] border-t border-[#3A5A40] transition-colors duration-300">
      {/* Upper Grid Section */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <h3 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
              🌿 StudyNook
            </h3>
            <p className="text-xs text-gray-300 max-w-sm leading-relaxed">
              Bridging the gap between vacant campus classrooms and students who
              need a quiet, productive place to build their future. Find your
              space, secure your slot, and dive into deep work.
            </p>
            {/* System Status Indicator */}
            <div className="inline-flex items-center gap-1.5 bg-[#3A5A40]/40 border border-[#588157]/30 px-2.5 py-1 rounded-md text-[11px] font-mono text-green-300">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              All Systems Operational
            </div>
          </div>

          {/* Column 2: Explore Links */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Reserve Spaces
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <Link
                  href="/rooms"
                  className="hover:text-white hover:underline transition-all"
                >
                  Browse Catalog
                </Link>
              </li>
              <li>
                <Link
                  href="/my-bookings"
                  className="hover:text-white hover:underline transition-all"
                >
                  My Bookings
                </Link>
              </li>
              <li>
                <Link
                  href="/rooms"
                  className="hover:text-white hover:underline transition-all"
                >
                  All Floor Nooks
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Management Links */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Hosts & Landlords
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <Link
                  href="/addRoom"
                  className="hover:text-white hover:underline transition-all"
                >
                  ➕ Share a Room
                </Link>
              </li>
              <li>
                <Link
                  href="/my-listings"
                  className="hover:text-white hover:underline transition-all"
                >
                  Manage Listings
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="hover:text-white hover:underline transition-all"
                >
                  Capacity Guidelines
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Platform Community */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Connect With Us
            </h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              Have questions regarding token authorizations or property metrics?
              Shoot us an email or follow our repositories.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-[#3A5A40] flex items-center justify-center hover:bg-white hover:text-[#344E41] transition-all text-sm font-bold shadow-xs"
              >
                💻
              </a>
              <a
                href="mailto:mahmudul1106@gmail.com"
                className="w-8 h-8 rounded-lg bg-[#3A5A40] flex items-center justify-center hover:bg-white hover:text-[#344E41] transition-all text-sm font-bold shadow-xs"
              >
                ✉️
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Lower Copyright Rule Bar */}
      <div className="border-t border-[#3A5A40]/60 bg-[#2C4337]/50 py-4 text-center px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-[11px] text-gray-400 font-mono">
          <p>
            © {new Date().getFullYear()} StudyNook Inc. All structural pipeline
            data secured.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/privacy" className="hover:text-white hover:underline">
              Privacy Terms
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-white hover:underline">
              Security Protocols
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
