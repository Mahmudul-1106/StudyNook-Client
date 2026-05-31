"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

const MyBookingsPage = () => {
  const { data: session, isPending: sessionLoading } = authClient.useSession();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal states for cancellation target
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isCancelling, setIsCancelling] = useState(false);

  // Fetch all bookings matching the current user session email/ID
  useEffect(() => {
    const fetchUserBookings = async () => {
      if (!session?.user?.email) return;
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/bookings?email=${session.user.email}`,
          { cache: "no-store" },
        );
        if (!res.ok) throw new Error();
        const data = await res.json();
        setBookings(data);
      } catch (error) {
        console.error("Fetch bookings failed:", error);
        toast.error("Failed to load your bookings dashboard.");
      } finally {
        setLoading(false);
      }
    };

    if (!sessionLoading) {
      if (session?.user) {
        fetchUserBookings();
      } else {
        setLoading(false);
      }
    }
  }, [session, sessionLoading]);

  // Conditional Logic: Check if a booking date is in the future or is today
  const isCancellable = (bookingDateStr, status) => {
    if (status !== "confirmed") return false;

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to compare structural dates cleanly

    const bookingDate = new Date(bookingDateStr);
    bookingDate.setHours(0, 0, 0, 0);

    return bookingDate >= today; // Returns true if reservation is today or later
  };

  // Open confirmation modal handler
  const triggerCancelClick = (booking) => {
    setSelectedBooking(booking);
    setShowCancelModal(true);
  };

  // Execute database PATCH state update
  const executeCancellation = async () => {
    if (!selectedBooking) return;
    try {
      setIsCancelling(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/bookings/${selectedBooking._id}/cancel`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userEmail: session?.user?.email }), // Pass for server-side ownership check
        },
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Cancellation rejected.");

      // Success UI update loop
      toast.success("Booking cancelled");

      // Opt-in sync layout updates locally on the client array reference hook
      setBookings((prev) =>
        prev.map((b) =>
          b._id === selectedBooking._id ? { ...b, status: "cancelled" } : b,
        ),
      );
      setShowCancelModal(false);
    } catch (err) {
      toast.error(err.message || "Failed to process cancellation.");
    } finally {
      setIsCancelling(false);
      setSelectedBooking(null);
    }
  };

  if (sessionLoading || loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-[#3A5A40]"></span>
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center p-4">
        <h3 className="text-xl font-bold text-red-500">Access Denied</h3>
        <p className="text-sm text-gray-500 mt-1">
          Please log in to check your bookings list summary.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-[#344E41] tracking-tight">
          My Bookings
        </h2>
        <p className="text-xs text-gray-500 dark:text-zinc-400 mt-1">
          Manage your personal room reservations, access active states, and
          monitor scheduling.
        </p>
      </div>

      {bookings.length === 0 ? (
        /* Empty State Display Section */
        <div className="bg-[#DAD7CD]/40 border border-dashed border-gray-300 rounded-2xl p-12 text-center">
          <p className="text-lg font-bold text-gray-700">
            You have no bookings yet.
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Head over to our available rooms catalog to secure an asset space.
          </p>
        </div>
      ) : (
        /* Data Processing Grid Table Layer */
        <div className="overflow-x-auto bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl shadow-xs">
          <table className="table w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#DAD7CD] text-neutral-800 border-b border-gray-200 dark:border-zinc-800 text-xs font-bold uppercase tracking-wider">
                <th className="p-4">Room Details</th>
                <th className="p-4">Date</th>
                <th className="p-4">Time Slot</th>
                <th className="p-4">Total Price</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-zinc-800 text-sm">
              {bookings.map((booking) => (
                <tr
                  key={booking._id}
                  className="hover:bg-slate-50/50 dark:hover:bg-zinc-800/30 transition-colors"
                >
                  {/* Column 1: Image + Name Layout */}
                  <td className="p-4 flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                      <Image
                        src={
                          booking.roomImage ||
                          "https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
                        }
                        alt={booking.roomName}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white line-clamp-1">
                        {booking.roomName}
                      </h4>
                      <span className="text-[11px] text-gray-400 block font-mono">
                        ID: {booking.roomId}
                      </span>
                    </div>
                  </td>

                  {/* Column 2: Booking Date */}
                  <td className="p-4 font-medium text-gray-700 dark:text-zinc-300">
                    {new Date(booking.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>

                  {/* Column 3: Hours Block */}
                  <td className="p-4 font-semibold text-gray-600 dark:text-zinc-400">
                    {booking.startTime < 10
                      ? `0${booking.startTime}:00`
                      : `${booking.startTime}:00`}{" "}
                    -{" "}
                    {booking.endTime < 10
                      ? `0${booking.endTime}:00`
                      : `${booking.endTime}:00`}
                  </td>

                  {/* Column 4: Cost */}
                  <td className="p-4 font-black text-gray-900 dark:text-white">
                    ${booking.totalCost}
                  </td>

                  {/* Column 5: Status Badges Contexts */}
                  <td className="p-4">
                    {booking.status === "confirmed" ? (
                      <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400 text-xs font-bold px-2.5 py-1 rounded-full">
                        ● Confirmed
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400 text-xs font-bold px-2.5 py-1 rounded-full">
                        ● Cancelled
                      </span>
                    )}
                  </td>

                  {/* Column 6: Cancellation Handler */}
                  <td className="p-4 text-right">
                    {isCancellable(booking.date, booking.status) ? (
                      <button
                        onClick={() => triggerCancelClick(booking)}
                        className="btn btn-xs sm:btn-sm border border-red-200 hover:border-red-500 bg-red-50 hover:bg-red-500 text-red-600 hover:text-white font-bold rounded-lg cursor-pointer transition-all"
                      >
                        Cancel Booking
                      </button>
                    ) : (
                      <span className="text-xs text-gray-400 italic">
                        Locked
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ─── MODAL CONTAINER: DYNAMIC ACTION CANCELLATION DIALOG ─── */}
      {showCancelModal && selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white dark:bg-zinc-900 border border-red-200 dark:border-zinc-800 rounded-2xl max-w-sm w-full p-6 shadow-2xl animate-in fade-in-50 zoom-in-95">
            <h3 className="text-lg font-bold text-red-600">
              Cancel standard reservation?
            </h3>
            <p className="text-xs text-gray-500 dark:text-zinc-400 mt-2 leading-relaxed">
              Are you sure you want to drop your slot allocation for{" "}
              <span className="font-bold text-gray-800 dark:text-white">
                {selectedBooking.roomName}
              </span>
              ? This will switch your status permanently to{" "}
              <span className="text-red-500 font-bold">cancelled</span>.
            </p>
            <div className="flex justify-end gap-2 mt-6">
              <button
                type="button"
                disabled={isCancelling}
                onClick={() => {
                  setShowCancelModal(false);
                  setSelectedBooking(null);
                }}
                className="px-4 py-2 text-xs font-bold text-gray-500 bg-gray-100 dark:bg-zinc-800 rounded-xl cursor-pointer hover:bg-gray-200 transition-colors"
              >
                Go Back
              </button>
              <button
                type="button"
                disabled={isCancelling}
                onClick={executeCancellation}
                className="px-4 py-2 text-xs font-bold bg-red-600 text-white rounded-xl cursor-pointer hover:bg-red-700 transition-all flex items-center justify-center min-w-[100px]"
              >
                {isCancelling ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : (
                  "Yes, Cancel"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookingsPage;
