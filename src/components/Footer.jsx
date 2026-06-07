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

          {/* Column 2: Explicit Useful Links Requirement */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Useful Links
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <Link
                  href="/"
                  className="hover:text-white hover:underline transition-all"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/rooms"
                  className="hover:text-white hover:underline transition-all"
                >
                  Rooms
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-white hover:underline transition-all"
                >
                  About Us
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
            </ul>
          </div>

          {/* Column 3: Contact Details & Social Medias */}
          <div className="md:col-span-4 space-y-4">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-2">
                Contact Information
              </h4>
              <ul className="space-y-1.5 text-xs text-gray-300 font-mono">
                <li className="flex items-center gap-2">
                  <span>✉️</span>
                  <a
                    href="mailto:mahmudul1106@gmail.com"
                    className="hover:text-white transition-colors"
                  >
                    mahmudul1106@gmail.com
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <span>📞</span>
                  <a
                    href="tel:+8801234567890"
                    className="hover:text-white transition-colors"
                  >
                    +8801914419338
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Icons Container Block */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                Follow Our Space
              </h4>
              <div className="flex items-center gap-2.5">
                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-[#3A5A40] text-[#DAD7CD] flex items-center justify-center hover:bg-white hover:text-[#344E41] transition-all"
                  aria-label="Facebook"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M9 8H7v3h2v9h3v-9h3l.5-3H12V6c0-.88.72-1 1-1h2V2h-3c-2.76 0-5 2.24-5 5v1z" />
                  </svg>
                </a>

                {/* X (New Logo Architecture Line) */}
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-[#3A5A40] text-[#DAD7CD] flex items-center justify-center hover:bg-white hover:text-[#344E41] transition-all"
                  aria-label="X"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-[#3A5A40] text-[#DAD7CD] flex items-center justify-center hover:bg-white hover:text-[#344E41] transition-all"
                  aria-label="LinkedIn"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z" />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-[#3A5A40] text-[#DAD7CD] flex items-center justify-center hover:bg-white hover:text-[#344E41] transition-all"
                  aria-label="Instagram"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                  </svg>
                </a>
              </div>
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
            <Link href="/" className="hover:text-white hover:underline">
              Privacy Terms
            </Link>
            <span>•</span>
            <Link href="/" className="hover:text-white hover:underline">
              Security Protocols
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
