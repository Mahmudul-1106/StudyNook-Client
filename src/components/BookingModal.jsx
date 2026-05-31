import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const BookingModal = ({ onClose, roomDetails, userSession }) => {
  const router = useRouter();
  const {
    _id: roomId,
    pricePerHour,
    name: roomName,
    image: roomImage,
  } = roomDetails;

  // Form States
  const [bookingDate, setBookingDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [specialNote, setSpecialNote] = useState("");
  const [totalCost, setTotalCost] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Generate standard 24-hour slots from 08:00 to 20:00
  const timeSlots = [];
  for (let i = 8; i <= 20; i++) {
    const formattedHour = i < 10 ? `0${i}:00` : `${i}:00`;
    timeSlots.push(formattedHour);
  }

  // Minimum date constraint (Today's date in YYYY-MM-DD format)
  const getTodayDateString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Real-time Total Cost Calculator Effect
  useEffect(() => {
    if (startTime && endTime) {
      const startHour = parseInt(startTime.split(":")[0], 10);
      const endHour = parseInt(endTime.split(":")[0], 10);

      if (endHour > startHour) {
        const hoursCalculated = endHour - startHour;
        setTotalCost(hoursCalculated * pricePerHour);
      } else {
        setTotalCost(0);
      }
    } else {
      setTotalCost(0);
    }
  }, [startTime, endTime, pricePerHour]);

  // Handle Dynamic Changes on Start Time to prevent manual negative selections
  const handleStartTimeChange = (e) => {
    const selectedStart = e.target.value;
    setStartTime(selectedStart);
    setEndTime(""); // Reset end time to force re-evaluation
  };

  // Filter valid End Times dynamically based on the current Start Time selection
  const getFilteredEndTimes = () => {
    if (!startTime) return [];
    const startHour = parseInt(startTime.split(":")[0], 10);
    return timeSlots.filter((slot) => {
      const currentSlotHour = parseInt(slot.split(":")[0], 10);
      return currentSlotHour > startHour; // Forces minimum 1-hour granularity
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!bookingDate || !startTime || !endTime) {
      toast.error("Please complete all required fields.");
      return;
    }

    const startHour = parseInt(startTime.split(":")[0], 10);
    const endHour = parseInt(endTime.split(":")[0], 10);

    const bookingPayload = {
      roomId,
      roomName,
      roomImage,
      userEmail: userSession?.user?.email,
      userName: userSession?.user?.name,
      date: bookingDate,
      startTime: startHour,
      endTime: endHour,
      totalCost,
      specialNote: specialNote.trim(),
    };

    try {
      setIsSubmitting(true);

      // POST Request handling both creation and back-end database slot collision/conflict check matches
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/bookings`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bookingPayload),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        // If conflict check status code drops or custom server message fires
        throw new Error(
          data.message || "This specific slot is already reserved.",
        );
      }

      toast.success("Room booked successfully!");
      onClose(); // Cleanly exit and terminate current modal view layer
      router.push("/my-bookings");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Booking submission failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-[#DAD7CD] dark:bg-zinc-900 border border-gray-300 dark:border-zinc-800 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
        {/* Modal Header */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-[#344E41] dark:text-emerald-400">
            Book Room: {roomName}
          </h3>
          <p className="text-xs text-gray-600 dark:text-zinc-400">
            Rate:{" "}
            <span className="font-bold text-gray-900 dark:text-white">
              ${pricePerHour}/hr
            </span>
          </p>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-4">
          {/* Input 1: Date Picker */}
          <div>
            <label className="block text-xs font-bold text-[#1c2e24] dark:text-zinc-300 uppercase tracking-wide mb-1">
              Select Target Date *
            </label>
            <input
              type="date"
              required
              min={getTodayDateString()} // Restricts past dates right inside native pickers
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
              className="w-full bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-xl px-3 py-2 text-sm focus:outline-hidden focus:border-[#3A5A40] dark:text-white"
            />
          </div>

          {/* Time Slot Row Group */}
          <div className="grid grid-cols-2 gap-3">
            {/* Input 2: Start Time */}
            <div>
              <label className="block text-xs font-bold text-[#1c2e24] dark:text-zinc-300 uppercase tracking-wide mb-1">
                Start Time *
              </label>
              <select
                required
                value={startTime}
                onChange={handleStartTimeChange}
                className="w-full bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-xl px-3 py-2 text-sm focus:outline-hidden focus:border-[#3A5A40] dark:text-white"
              >
                <option value="">Select</option>
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>

            {/* Input 3: End Time */}
            <div>
              <label className="block text-xs font-bold text-[#1c2e24] dark:text-zinc-300 uppercase tracking-wide mb-1">
                End Time *
              </label>
              <select
                required
                disabled={!startTime}
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-xl px-3 py-2 text-sm focus:outline-hidden focus:border-[#3A5A40] dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="">Select</option>
                {getFilteredEndTimes().map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Input 4: Special Note Box */}
          <div>
            <label className="block text-xs font-bold text-[#1c2e24] dark:text-zinc-300 uppercase tracking-wide mb-1">
              Special Note{" "}
              <span className="text-gray-400 font-normal">(Optional)</span>
            </label>
            <textarea
              rows="2"
              placeholder="Any specific requests or requirements..."
              value={specialNote}
              onChange={(e) => setSpecialNote(e.target.value)}
              className="w-full bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-xl px-3 py-2 text-sm focus:outline-hidden focus:border-[#3A5A40] dark:text-white resize-none"
            />
          </div>

          {/* Real-time calculated Dynamic Pricing Container */}
          <div className="bg-white/60 dark:bg-black/30 border border-dashed border-[#344E41]/30 p-3 rounded-xl flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-700 dark:text-zinc-400">
              Computed Total Cost:
            </span>
            <span className="text-xl font-black text-[#344E41] dark:text-emerald-400">
              ${totalCost}
            </span>
          </div>

          {/* Modal Action Controls footer layout row */}
          <div className="flex justify-end gap-2 mt-2 pt-2">
            <button
              type="button"
              disabled={isSubmitting}
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-gray-600 bg-white/50 hover:bg-white dark:bg-zinc-800 dark:text-zinc-300 rounded-xl cursor-pointer transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || totalCost === 0}
              className="px-5 py-2 text-xs font-bold bg-[#3A5A40] hover:bg-[#344E41] text-white rounded-xl cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[120px]"
            >
              {isSubmitting ? (
                <span className="loading loading-spinner loading-xs"></span>
              ) : (
                "Confirm Booking"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
