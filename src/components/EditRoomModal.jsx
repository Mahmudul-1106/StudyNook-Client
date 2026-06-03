"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";

// Define a master list of available options for selection
const AVAILABLE_AMENITIES = [
  "WiFi",
  "Whiteboard",
  "Projector",
  "AC",
  "Sound System",
  "Catering",
];

const EditRoomModal = ({ onClose, roomDetails, onUpdateSuccess }) => {
  const [name, setName] = useState(roomDetails.name || "");
  const [pricePerHour, setPricePerHour] = useState(
    roomDetails.pricePerHour || "",
  );
  const [floor, setFloor] = useState(roomDetails.floor || "");
  const [capacity, setCapacity] = useState(roomDetails.capacity || "");
  const [image, setImage] = useState(roomDetails.image || "");
  const [bio, setBio] = useState(roomDetails.bio || "");

  // Tracks selected values cleanly as an array directly matching database logic
  const [selectedAmenities, setSelectedAmenities] = useState(
    Array.isArray(roomDetails.amenities) ? roomDetails.amenities : [],
  );

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedPayload = {
      name,
      pricePerHour: Number(pricePerHour),
      floor: Number(floor),
      capacity: Number(capacity),
      image,
      bio,
      amenities: selectedAmenities, // Directly send the active array
    };

    try {
      setIsSubmitting(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/rooms/${roomDetails._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedPayload),
        },
      );

      if (!res.ok) throw new Error("Failed to modify room record parameters.");

      toast.success("Listing updated successfully!");

      onUpdateSuccess({ ...roomDetails, ...updatedPayload });
      onClose();
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong updating listings.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-[#DAD7CD] dark:bg-zinc-900 border border-gray-300 dark:border-zinc-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-[#344E41] dark:text-emerald-400">
            Edit Listing Configuration
          </h3>
          <p className="text-xs text-gray-600 dark:text-zinc-400">
            Modify properties for: {roomDetails.name}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Room Name */}
          <div>
            <label className="block text-xs font-bold text-[#1c2e24] dark:text-zinc-300 uppercase tracking-wide mb-1">
              Room Title *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-xl px-3 py-2 text-sm text-black dark:text-white focus:outline-hidden"
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            {/* Price */}
            <div>
              <label className="block text-xs font-bold text-[#1c2e24] dark:text-zinc-300 uppercase tracking-wide mb-1">
                Price/hr ($) *
              </label>
              <input
                type="number"
                required
                value={pricePerHour}
                onChange={(e) => setPricePerHour(e.target.value)}
                className="w-full bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-xl px-3 py-2 text-sm text-black dark:text-white focus:outline-hidden"
              />
            </div>
            {/* Floor Location */}
            <div>
              <label className="block text-xs font-bold text-[#1c2e24] dark:text-zinc-300 uppercase tracking-wide mb-1">
                Floor Level
              </label>
              <input
                type="number"
                value={floor}
                onChange={(e) => setFloor(e.target.value)}
                className="w-full bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-xl px-3 py-2 text-sm text-black dark:text-white focus:outline-hidden"
              />
            </div>
            {/* Max Capacity */}
            <div>
              <label className="block text-xs font-bold text-[#1c2e24] dark:text-zinc-300 uppercase tracking-wide mb-1">
                Seats limit *
              </label>
              <input
                type="number"
                required
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                className="w-full bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-xl px-3 py-2 text-sm text-black dark:text-white focus:outline-hidden"
              />
            </div>
          </div>

          {/* Amenities Selection Block */}
          <div className="p-4 bg-white/40 dark:bg-zinc-800/40 border border-gray-300 dark:border-zinc-700 rounded-xl">
            <h3 className="text-xs font-bold tracking-wider text-[#1c2e24] dark:text-zinc-300 mb-3 block uppercase">
              AMENITIES & SPACE INCLUSIONS{" "}
              <span className="text-red-500">*</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {AVAILABLE_AMENITIES.map((amenity, index) => {
                const isChecked = selectedAmenities.includes(amenity);
                return (
                  <div
                    key={index}
                    onClick={() => {
                      setSelectedAmenities((prev) =>
                        prev.includes(amenity)
                          ? prev.filter((item) => item !== amenity)
                          : [...prev, amenity],
                      );
                    }}
                    className="flex items-center gap-2 cursor-pointer group select-none py-1"
                  >
                    <div
                      className={`w-4 h-4 rounded border transition-all flex items-center justify-center shrink-0 ${
                        isChecked
                          ? "bg-emerald-600 border-emerald-600 shadow-xs"
                          : "bg-white dark:bg-zinc-900 border-gray-300 dark:border-zinc-700"
                      }`}
                    >
                      {isChecked && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-2.5 h-2.5 text-white"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </div>
                    <span className="text-xs font-medium text-gray-800 dark:text-zinc-300 group-hover:text-black dark:group-hover:text-white transition-colors truncate">
                      {amenity}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Image Node Link URL */}
          <div>
            <label className="block text-xs font-bold text-[#1c2e24] dark:text-zinc-300 uppercase tracking-wide mb-1">
              Image Asset Link Url
            </label>
            <input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-xl px-3 py-2 text-sm text-black dark:text-white focus:outline-hidden"
            />
          </div>

          {/* Room Description Box */}
          <div>
            <label className="block text-xs font-bold text-[#1c2e24] dark:text-zinc-300 uppercase tracking-wide mb-1">
              Room Bio Background Summary
            </label>
            <textarea
              rows="3"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-xl px-3 py-2 text-sm text-black dark:text-white resize-none focus:outline-hidden"
            />
          </div>

          {/* Action Trigger Row */}
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              disabled={isSubmitting}
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-gray-600 bg-white/50 hover:bg-white dark:bg-zinc-800 dark:text-zinc-300 rounded-xl cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 text-xs font-bold bg-[#3A5A40] hover:bg-[#344E41] text-white rounded-xl cursor-pointer min-w-[110px]"
            >
              {isSubmitting ? (
                <span className="loading loading-spinner loading-xs"></span>
              ) : (
                "Save Updates"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRoomModal;
