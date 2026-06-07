"use client";

import React, { useState, useEffect } from "react";

const RootLoading = () => {
  const [showLoading, setShowLoading] = useState(false);

  // Prevent loading flicker on lightning-fast API responses
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(true);
    }, 200); // Only shows if the page takes longer than 200ms to resolve

    return () => clearTimeout(timer);
  }, []);

  if (!showLoading) return null;

  return (
    <div className="min-h-[85vh] w-full max-w-6xl mx-auto px-4 py-12 flex flex-col justify-center items-center transition-all duration-300">
      {/* --- Micro-Interaction Centerpiece Animation --- */}
      <div className="flex flex-col items-center justify-center space-y-4 mb-16 animate-in fade-in duration-500">
        <div className="relative flex items-center justify-center">
          {/* Outer elegant spinning halo ring */}
          <div className="w-16 h-16 rounded-full border-4 border-[#3A5A40]/10 border-t-[#3A5A40] animate-spin"></div>
          {/* Inner pulse node */}
          <div className="absolute w-6 h-6 rounded-xl bg-[#588157]/20 animate-ping"></div>
          <div className="absolute text-base">🌿</div>
        </div>

        <div className="text-center space-y-1">
          <h3 className="text-sm font-black text-[#344E41] dark:text-zinc-200 tracking-wider font-mono uppercase">
            Syncing StudyNook
          </h3>
          <p className="text-[11px] text-gray-400 dark:text-zinc-500 font-mono animate-pulse">
            Resolving structural pipeline data nodes...
          </p>
        </div>
      </div>

      {/* --- Blueprint Layout Skeleton Grid --- */}
      <div className="w-full space-y-8 opacity-40 select-none pointer-events-none aria-hidden">
        {/* Header Block Mock */}
        <div className="flex justify-between items-center border-b border-gray-100 dark:border-zinc-800 pb-6">
          <div className="space-y-2">
            <div className="h-7 w-48 bg-gray-200 dark:bg-zinc-800 rounded-xl animate-pulse"></div>
            <div className="h-3 w-80 bg-gray-100 dark:bg-zinc-800/60 rounded-lg animate-pulse"></div>
          </div>
          <div className="h-10 w-32 bg-gray-200 dark:bg-zinc-800 rounded-xl animate-pulse"></div>
        </div>

        {/* Data Matrix / Table Rows Mock */}
        <div className="border border-gray-100 dark:border-zinc-800 rounded-2xl overflow-hidden space-y-0.5">
          {[1, 2, 3].map((row) => (
            <div
              key={row}
              className="p-4 bg-gray-50/50 dark:bg-zinc-900/30 flex items-center justify-between gap-4 border-b border-gray-50 dark:border-zinc-800/50 last:border-0"
            >
              <div className="flex items-center gap-3 w-1/3">
                <div className="w-12 h-12 bg-gray-200 dark:bg-zinc-800 rounded-xl shrink-0 animate-pulse"></div>
                <div className="space-y-2 w-full">
                  <div className="h-4 w-3/4 bg-gray-200 dark:bg-zinc-800 rounded-md animate-pulse"></div>
                  <div className="h-3 w-1/2 bg-gray-100 dark:bg-zinc-800/60 rounded-md animate-pulse"></div>
                </div>
              </div>
              <div className="h-4 w-24 bg-gray-200 dark:bg-zinc-800 rounded-md animate-pulse"></div>
              <div className="h-4 w-16 bg-gray-200 dark:bg-zinc-800 rounded-md animate-pulse"></div>
              <div className="h-6 w-24 bg-gray-200 dark:bg-zinc-800 rounded-lg animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RootLoading;
