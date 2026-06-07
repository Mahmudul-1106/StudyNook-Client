"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const NotFoundPage = () => {
  const router = useRouter();
  const [countdown, setCountdown] = useState(10);

  // Automated evacuation loop back to homepage if user stays idle
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <div className="min-h-[80vh] px-4 flex flex-col justify-center items-center text-center bg-white dark:bg-zinc-950 transition-colors duration-300">
      {/* Visual Identity Layer */}
      <div className="relative mb-6 animate-in fade-in zoom-in-95 duration-500">
        {/* Large Decorative Absolute Number */}
        <h1 className="text-9xl font-black text-[#DAD7CD]/40 dark:text-zinc-900 select-none font-mono tracking-tighter">
          404
        </h1>
        {/* The Float Node */}
        <div className="absolute inset-0 flex items-center justify-center text-5xl animate-bounce duration-1000">
          🔍
        </div>
      </div>

      {/* Messaging Layout */}
      <div className="max-w-md mx-auto space-y-3 mb-8 animate-in fade-in slide-in-from-bottom-4 delay-150 duration-500">
        <h2 className="text-2xl font-black text-[#344E41] dark:text-zinc-100 tracking-tight">
          Nook Allocation Not Found
        </h2>
        <p className="text-xs text-gray-500 dark:text-zinc-400 leading-relaxed">
          The structural asset folder or endpoint path you are looking for does
          not exist, has been dropped from our database index, or moved
          permanently.
        </p>

        {/* Active Countdown Badge */}
        <div className="inline-block bg-[#3A5A40]/10 text-[#3A5A40] dark:text-green-400 font-mono text-[11px] px-3 py-1 rounded-full border border-[#3A5A40]/20">
          ⏳ Auto-re-routing to safety in{" "}
          <span className="font-bold">{countdown}s</span>
        </div>
      </div>

      {/* Fast Action Routing Interface */}
      <div className="flex flex-col sm:flex-row items-center gap-3 animate-in fade-in slide-in-from-bottom-4 delay-300 duration-500">
        <button
          onClick={() => router.back()}
          className="w-full sm:w-auto px-5 py-2.5 text-xs font-black text-gray-600 dark:text-zinc-300 bg-gray-100 dark:bg-zinc-900 rounded-xl hover:bg-gray-200 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
        >
          ← Go Back One Step
        </button>

        <Link
          href="/"
          className="w-full sm:w-auto px-6 py-2.5 text-xs font-black text-white bg-[#3A5A40] hover:bg-[#344E41] rounded-xl shadow-md hover:shadow-lg transition-all text-center cursor-pointer"
        >
          🏡 Return to Main Nook
        </Link>
      </div>

      {/* Help Link Footer Line */}
      <p className="text-[11px] text-gray-400 font-mono mt-12">
        Lost completely? Report broken links to{" "}
        <a
          href="mailto:support@studynook.com"
          className="underline hover:text-gray-600"
        >
          system administrators
        </a>
        .
      </p>
    </div>
  );
};

export default NotFoundPage;
