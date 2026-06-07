"use client";

import React, { useState } from "react";

const HowItWorks = () => {
  const [activeTab, setActiveTab] = useState("student");

  const studentSteps = [
    {
      step: "01",
      title: "Explore Spaces",
      desc: "Search through verified study rooms, classrooms, or open nooks by floor location, seating capacity, or hourly rates.",
    },
    {
      step: "02",
      title: "Secure Your Slot",
      desc: "Pick your preferred time window and reserve instantly using our secure token authorization system.",
    },
    {
      step: "03",
      title: "Show Up & Study",
      desc: "Walk straight into your dedicated space, unpack your gear, and focus on your structural pipeline without distraction.",
    },
  ];

  const hostSteps = [
    {
      step: "01",
      title: "List Your Resource Asset",
      desc: "Input your classroom metrics, upload reference images, specify capacity limits, and determine your flexible hourly price.",
    },
    {
      step: "02",
      title: "Monitor Landlord Pipelines",
      desc: "Track incoming booking allocations, update asset records dynamically, or drop entries directly from your listings layout dashboard.",
    },
    {
      step: "03",
      title: "Optimize Empty Spaces",
      desc: "Monetize idle campus corners, group workspace grids, or vacant lecture halls smoothly and securely.",
    },
  ];

  const currentSteps = activeTab === "student" ? studentSteps : hostSteps;

  return (
    <section className="py-16 px-4 rounded-xl bg-[#DAD7CD]/20 dark:bg-zinc-900/50 border-y border-gray-100 dark:border-zinc-800 transition-colors">
      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#588157] tracking-widest uppercase block mb-2">
            Platform Workflow
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-[#344E41] dark:text-white tracking-tight">
            How It Works
          </h2>
          <p className="text-sm text-gray-500 dark:text-zinc-400 mt-2 leading-relaxed">
            Secure your next productive environment or list your open resource
            asset in three straightforward steps.
          </p>
        </div>

        {/* Tab Selection Switches */}
        <div className="flex justify-center mb-12">
          <div className="bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 p-1.5 rounded-2xl flex gap-2 shadow-xs">
            <button
              onClick={() => setActiveTab("student")}
              className={`px-6 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                activeTab === "student"
                  ? "bg-[#3A5A40] text-white shadow-md"
                  : "text-gray-600 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-700"
              }`}
            >
              📖 For Students
            </button>
            <button
              onClick={() => setActiveTab("host")}
              className={`px-6 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                activeTab === "host"
                  ? "bg-[#3A5A40] text-white shadow-md"
                  : "text-gray-600 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-700"
              }`}
            >
              🏢 For Space Owners
            </button>
          </div>
        </div>

        {/* Dynamic Step Mapping Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {currentSteps.map((item, idx) => (
            <div
              key={idx}
              className="relative bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all group duration-300"
            >
              {/* Absoluted Step Counter Badge */}
              <span className="absolute top-4 right-6 text-4xl font-mono font-black text-[#588157]/10 group-hover:text-[#588157]/20 transition-colors">
                {item.step}
              </span>

              <div className="w-10 h-10 rounded-xl bg-[#3A5A40]/10 flex items-center justify-center text-[#3A5A40] font-bold text-sm mb-4">
                {idx + 1}
              </div>

              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                {item.title}
              </h4>
              <p className="text-xs text-gray-500 dark:text-zinc-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
