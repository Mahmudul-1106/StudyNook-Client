"use client";

import React from "react";

const WhyChooseUs = () => {
  const highlights = [
    {
      icon: "🎯",
      title: "Granular Room Metrics",
      desc: "Filter allocations strictly down to precise floor numbers, maximum seat capacities, and individual structural setups.",
    },
    {
      icon: "🛡️",
      title: "Secure Verification Pipelines",
      desc: "Protected by state-of-the-art authentication token loops, ensuring your personal identity matrices remain completely safe.",
    },
    {
      icon: "🔄",
      title: "Real-Time Synchronizations",
      desc: "Instantly update database targets, edit room criteria, or securely cancel confirmed reservations directly on the fly.",
    },
    {
      icon: "⏳",
      title: "Flexible Hourly Structures",
      desc: "No long-term infrastructure commitments. Rent micro-spaces exclusively for the exact timeline hours you need.",
    },
  ];

  return (
    <section className="py-16 px-4 bg-white dark:bg-zinc-950 transition-colors">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Box Block */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-bold text-[#588157] tracking-widest uppercase block">
              Core Core Competencies
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-[#344E41] dark:text-white tracking-tight leading-none">
              Engineered for Modern Productivity Hubs.
            </h2>
            <p className="text-xs text-gray-500 dark:text-zinc-400 leading-relaxed">
              We bridge the structural gap between underutilized campus
              properties and focused students who require reliable room
              allocations.
            </p>
            <div className="pt-2">
              <div className="inline-flex items-center gap-2 bg-[#3A5A40]/10 text-[#2b4432] dark:text-green-400 font-mono text-[11px] font-black px-3 py-1.5 rounded-lg">
                🚀 Faster booking speeds than standard reservation maps.
              </div>
            </div>
          </div>

          {/* Right Highlights Grid Block */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {highlights.map((card, idx) => (
              <div
                key={idx}
                className="bg-[#DAD7CD]/10 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800/80 rounded-2xl p-5 hover:border-gray-200 dark:hover:border-zinc-700 transition-all shadow-2xs"
              >
                <div className="w-10 h-10 rounded-xl bg-[#DAD7CD] dark:bg-zinc-800 flex items-center justify-center text-xl mb-4 shadow-2xs">
                  {card.icon}
                </div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1.5">
                  {card.title}
                </h3>
                <p className="text-xs text-gray-400 dark:text-zinc-400 leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
