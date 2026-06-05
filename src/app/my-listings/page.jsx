//
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
// 1. Keep authClient for client-side authentication states
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import EditRoomModal from "@/components/EditRoomModal";

// ❌ REMOVED: import { auth } from "@/lib/auth"; (This was leaking server code to the browser)

const MyListingsPage = () => {
  const { data: session, isPending: sessionLoading } = authClient.useSession();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);
  const [roomToEdit, setRoomToEdit] = useState(null);

  useEffect(() => {
    const fetchUserListings = async () => {
      if (!session?.user?.email) return;

      try {
        // 2. FETCH TOKEN CORRECTLY ON THE CLIENT SIDE USING authClient
        const { data: tokenData } = await authClient.token();

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/rooms?ownerEmail=${session.user.email}`,
          {
            method: "GET",
            cache: "no-store",
            headers: {
              // 3. Attach the token to your authorization headers securely
              Authorization: `Bearer ${tokenData?.token}`,
            },
          },
        );
        // console.log("Token", tokenData?.token);
        if (!res.ok) throw new Error();
        const data = await res.json();

        const filteredListings = data.filter(
          (room) => room.ownerEmail === session.user.email,
        );
        setRooms(filteredListings);
      } catch (error) {
        console.error("Listing retrieval failure:", error);
        toast.error("Failed to load your room assets pipeline.");
      } finally {
        setLoading(false);
      }
    };

    if (!sessionLoading) {
      if (session?.user) {
        fetchUserListings();
      } else {
        setLoading(false);
      }
    }
  }, [session, sessionLoading]);

  const triggerDeleteClick = (room) => {
    setSelectedRoom(room);
    setShowDeleteModal(true);
  };

  const triggerEditClick = (room) => {
    setRoomToEdit(room);
    setShowEditModal(true);
  };

  const handleUpdateSuccess = (updatedRoom) => {
    setRooms((prev) =>
      prev.map((room) => (room._id === updatedRoom._id ? updatedRoom : room)),
    );
  };

  const executeRoomDeletion = async () => {
    if (!selectedRoom) return;
    try {
      setIsDeleting(true);

      // Get token here too for your DELETE request security validation
      const { data: tokenData } = await authClient.token();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/rooms/${selectedRoom._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${tokenData?.token}`,
          },
        },
      );

      if (!res.ok) throw new Error();

      toast.success("Study space asset permanently deleted.");
      setRooms((prev) => prev.filter((r) => r._id !== selectedRoom._id));
      setShowDeleteModal(false);
    } catch (err) {
      toast.error("Failed to drop selected database room record assets.");
    } finally {
      setIsDeleting(false);
      setSelectedRoom(null);
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
          Please log in to manage your spaces.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-3xl font-bold text-[#344E41] tracking-tight">
            My Shared Listings
          </h2>
          <p className="text-xs text-gray-500 dark:text-zinc-400 mt-1">
            Monitor, update metrics, edit information, or remove your registered
            study spaces.
          </p>
        </div>
        <Link href="/addRoom" className="shrink-0">
          <button className="btn bg-[#3A5A40] hover:bg-[#344E41] text-white font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-xs cursor-pointer">
            ➕ Add New Room
          </button>
        </Link>
      </div>

      {rooms.length === 0 ? (
        <div className="bg-[#DAD7CD]/40 border border-dashed border-gray-300 rounded-2xl p-12 text-center">
          <p className="text-lg font-bold text-gray-700">
            You have no listings yet.
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Get started by sharing a classroom or open nook resource asset.
          </p>
          <Link href="/addRoom" className="inline-block mt-4">
            <button className="text-xs font-bold text-[#3A5A40] underline hover:text-[#344E41]">
              List your first space now &rarr;
            </button>
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl shadow-xs">
          <table className="table w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#DAD7CD] text-neutral-800 border-b border-gray-200 dark:border-zinc-800 text-xs font-bold uppercase tracking-wider">
                <th className="p-4">Room Space</th>
                <th className="p-4">Floor Location</th>
                <th className="p-4">Seat Capacity</th>
                <th className="p-4">Hourly Price</th>
                <th className="p-4">Total Reservations</th>
                <th className="p-4 text-center">Management Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-zinc-800 text-sm">
              {rooms.map((room) => (
                <tr
                  key={room._id}
                  className="hover:bg-slate-50/50 dark:hover:bg-zinc-800/30 transition-colors"
                >
                  <td className="p-4 flex items-center gap-3">
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                      <Image
                        src={
                          room.image ||
                          "https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
                        }
                        alt={room.name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <div className="max-w-[200px] sm:max-w-xs">
                      <h4 className="font-bold text-gray-900 dark:text-white line-clamp-1 hover:text-[#3A5A40] transition-colors">
                        <Link href={`/rooms/${room._id}`}>{room.name}</Link>
                      </h4>
                      <p className="text-xs text-gray-400 line-clamp-1 whitespace-normal break-all mt-0.5">
                        {room.bio || "No summary added."}
                      </p>
                    </div>
                  </td>

                  <td className="p-4 font-semibold text-gray-700 dark:text-zinc-300">
                    🏢 {room.floor ? `Floor ${room.floor}` : "Main Ground"}
                  </td>

                  <td className="p-4 font-semibold text-gray-600 dark:text-zinc-400">
                    👥 {room.capacity} Max Seats
                  </td>

                  <td className="p-4 font-black text-gray-900 dark:text-white">
                    ${room.pricePerHour}/hr
                  </td>

                  <td className="p-4">
                    <span className="inline-flex items-center gap-1 bg-[#588157]/10 text-[#2b4432] font-mono text-xs font-black px-3 py-1 rounded-md">
                      🔄 {room.bookingCount || 0} Bookings
                    </span>
                  </td>

                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => triggerEditClick(room)}
                        className="btn btn-xs sm:btn-sm border border-gray-300 bg-white hover:bg-gray-100 text-gray-700 font-bold rounded-lg cursor-pointer transition-all"
                      >
                        🛠️ Edit
                      </button>
                      <button
                        onClick={() => triggerDeleteClick(room)}
                        className="btn btn-xs sm:btn-sm border border-red-200 bg-red-50 hover:bg-red-500 text-red-600 hover:text-white font-bold rounded-lg cursor-pointer transition-all"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showEditModal && roomToEdit && (
        <EditRoomModal
          roomDetails={roomToEdit}
          onClose={() => {
            setShowEditModal(false);
            setRoomToEdit(null);
          }}
          onUpdateSuccess={handleUpdateSuccess}
        />
      )}

      {showDeleteModal && selectedRoom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white dark:bg-zinc-900 border border-red-200 dark:border-zinc-800 rounded-2xl max-w-sm w-full p-6 shadow-2xl animate-in fade-in-50 zoom-in-95">
            <h3 className="text-lg font-bold text-red-600">
              Permanently Delete Your Room?
            </h3>
            <p className="text-xs text-gray-500 dark:text-zinc-400 mt-2 leading-relaxed">
              Are you sure you want to drop the database node for{" "}
              <span className="font-bold text-gray-800 dark:text-white">
                {selectedRoom.name}
              </span>
              ? This will remove all associated statistics. This modification is
              permanent.
            </p>
            <div className="flex justify-end gap-2 mt-6">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedRoom(null);
                }}
                className="px-4 py-2 text-xs font-bold text-gray-500 bg-gray-100 dark:bg-zinc-800 rounded-xl cursor-pointer hover:bg-gray-200 transition-colors"
              >
                Cancel Action
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={executeRoomDeletion}
                className="px-4 py-2 text-xs font-bold bg-red-600 text-white rounded-xl cursor-pointer hover:bg-red-700 transition-all flex items-center justify-center min-w-[100px]"
              >
                {isDeleting ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : (
                  "Yes, Delete Room"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyListingsPage;
