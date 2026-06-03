"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { MdEmail } from "react-icons/md";
import BookingModal from "@/components/BookingModal";
import EditRoomModal from "@/components/EditRoomModal"; // 🔥 Added modal import references

const RoomDetailsPage = () => {
  const { id } = useParams();
  const router = useRouter();

  const { data: session, isPending: sessionLoading } = authClient.useSession();

  const [roomDetails, setRoomDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false); // 🔥 Added Edit toggle tracker

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/rooms/${id}`,
          { cache: "no-store" },
        );
        if (!res.ok) throw new Error("Target document missing");
        const data = await res.json();
        setRoomDetails(data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load room details");
        router.push("/rooms");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchRoomDetails();
  }, [id, router]);

  if (loading || sessionLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-zinc-950">
        <span className="loading loading-spinner loading-lg text-[#3A5A40]"></span>
      </div>
    );
  }

  if (!roomDetails) return null;

  const {
    name,
    bio,
    image,
    floor,
    capacity,
    pricePerHour,
    amenities,
    bookingCount = 0,
    ownerName = "Anonymous Provider",
    ownerImage,
    ownerEmail,
    createdAt,
  } = roomDetails;

  const isLoggedIn = !!session?.user;
  const isOwner = isLoggedIn && session?.user?.email === ownerEmail;

  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Recently Added";

  const handleBookingTrigger = () => {
    if (!isLoggedIn) {
      toast.error("Please login to secure a booking");
      router.push("/auth/login");
    } else {
      setShowBookingModal(true);
    }
  };

  const confirmDeleteResource = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/rooms/${id}`,
        { method: "DELETE" },
      );
      if (!res.ok) throw new Error();

      toast.success("Study space asset permanently deleted.");
      router.push("/rooms");
    } catch (err) {
      toast.error("Failed to drop database records.");
    }
  };

  return (
    <div className=" mx-auto px-4 pt-5 pb-10">
      <div className="pb-6 text-center">
        <h2 className="text-3xl tracking-tight font-heading text-[#344E41] dark:text-zinc-100 sm:text-4xl">
          Room Details
        </h2>
      </div>

      <div className="card p-5 grid grid-cols-1 lg:grid-cols-2 gap-6 bg-base-200 w-full h-full border border-base-200/60 hover:shadow-lg transition-all duration-300 overflow-hidden dark:bg-zinc-950 dark:border-zinc-900 rounded-2xl">
        <div className="hover-3d w-full h-full min-h-[300px] lg:min-h-[400px]">
          <figure className="relative h-full w-full bg-base-200 dark:bg-zinc-900 rounded-xl overflow-hidden min-h-[300px] lg:min-h-[400px]">
            <Image
              className="w-full h-full object-cover"
              alt={name || "Premium Study Space"}
              src={
                image ||
                "https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
              }
              unoptimized
              fill
              sizes="(max-w-768px) 100vw, (max-w-1024px) 50vw, 33vw"
            />
          </figure>
        </div>

        <div className="flex flex-col gap-4 justify-between">
          <div className="card-body bg-[#DAD7CD] text-neutral-800 p-5 flex flex-col grow rounded-xl justify-between">
            <div>
              <div className="flex justify-between items-start gap-2">
                <h3 className="text-2xl font-bold line-clamp-1 text-[#1c2e24]">
                  {name}
                </h3>
                <div className="bg-white py-1 px-3 rounded-md shrink-0 border border-[#344E41]/20 shadow-xs">
                  <span className="text-xl font-bold text-[#344E41]">
                    ${pricePerHour}
                  </span>
                  <span className="text-xs text-black/70 font-semibold">
                    {" "}
                    /hr
                  </span>
                </div>
              </div>

              <div className="mt-2 flex flex-wrap gap-2 items-center justify-between">
                <span className="bg-[#344E41] text-white text-[11px] uppercase tracking-wider font-extrabold px-3 py-2 rounded-sm">
                  🔄 Booked {bookingCount} Times
                </span>
                <span className="text-xs px-3 py-2 rounded-md text-gray-600 font-medium border border-[#344E41]">
                  Listed on {formattedDate}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-x-2 text-xs text-black/70 font-bold mt-3 mb-2">
                <span>🏢 {floor ? `Floor ${floor}` : "Main Floor"}</span>
                <span className="text-black/30">•</span>
                <span>👥 {capacity} Seats Capacity</span>
              </div>

              <div className="flex flex-wrap gap-1.5 my-3">
                {amenities?.map((amenity, index) => (
                  <div
                    key={index}
                    className="badge badge-outline border-[#344E41]/40 bg-[#A3B18A] text-[#1c2e24] badge-sm rounded-md capitalize font-bold text-[11px] tracking-wide py-2.5 px-2"
                  >
                    {amenity}
                  </div>
                ))}
              </div>

              <p className="text-sm text-black/80 font-medium leading-relaxed my-2">
                {bio ||
                  "No background documentation provided for this space asset."}
              </p>
              <div className="border-t border-[#344E41]/20">
                <button
                  onClick={handleBookingTrigger}
                  className="w-full py-3 mt-3 bg-linear-to-r from-[#588157] to-[#3A5A40] hover:from-[#3A5A40] hover:to-[#344E41] cursor-pointer rounded-xl font-bold text-sm text-white shadow-md transition-all"
                >
                  {isLoggedIn
                    ? "Confirm Selection & Book Now"
                    : "🔒 Login to Book Room"}
                </button>
              </div>
            </div>
          </div>

          <div className="bg-[#DAD7CD] rounded-xl shadow-xs p-5">
            <div className=" flex items-center justify-between">
              <div className="flex items-center gap-3">
                <figure>
                  <Image
                    className="w-12 h-12 rounded-md"
                    alt={ownerName || "Admin"}
                    src={
                      ownerImage ||
                      "https://i.ibb.co.com/MxZjwyFH/default-avater.jpg"
                    }
                    unoptimized
                    width={48}
                    height={48}
                  />
                </figure>

                <div>
                  <span className="text-[10px] text-gray-500 block uppercase font-bold tracking-wider">
                    Room Owner
                  </span>
                  <h4 className="text-sm font-bold text-[#23382c]">
                    {ownerName}
                  </h4>
                </div>
              </div>
              <span className="flex gap-1 items-center text-xs bg-white/60 dark:bg-black/20 text-[#344E41] font-semibold px-2 py-1 rounded-md max-w-[180px] truncate">
                <MdEmail className="text-[14px]" />
                {ownerEmail}
              </span>
            </div>

            <div>
              {isOwner && (
                <div className="mt-4 pt-4 border-t border-[#344E41]/20 flex gap-2 w-full">
                  {/* 🔥 FIXED: Click handler now triggers inline configuration update modal status */}
                  <button
                    onClick={() => setShowEditModal(true)}
                    className="w-1/2 py-2 border border-[#344E41] bg-white hover:bg-[#344E41] hover:text-white text-[#344E41] font-bold text-xs rounded-xl cursor-pointer transition-colors"
                  >
                    🛠️ Update Room Info
                  </button>
                  <button
                    onClick={() => setShowDeleteModal(true)}
                    className="w-1/2 py-2 text-red-600 border border-red-600 bg-white hover:bg-red-500 hover:text-white font-bold text-xs rounded-xl cursor-pointer transition-colors"
                  >
                    🗑️ Remove Room
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ─── MODAL CONTAINER: CONFIRM BOOKING TRANSACTION ─── */}
      {showBookingModal && (
        <BookingModal
          onClose={() => setShowBookingModal(false)}
          roomDetails={roomDetails}
          userSession={session}
        />
      )}

      {/* ─── 🔥 MODAL CONTAINER: EDIT ROOM LISTING INFO ─── */}
      {showEditModal && (
        <EditRoomModal
          onClose={() => setShowEditModal(false)}
          roomDetails={roomDetails}
          onUpdateSuccess={(updatedData) => setRoomDetails(updatedData)} // Real-time client structural update hook sync
        />
      )}

      {/* ─── MODAL CONTAINER: Delete Room ─── */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white dark:bg-zinc-900 border border-red-500/20 rounded-2xl max-w-sm w-full p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-red-500">Remove {name}?</h3>
            <p className="text-xs text-gray-500 dark:text-zinc-400 mt-2 leading-relaxed">
              This action completely removes study room:{" "}
              <span className="font-bold text-gray-800">{name}</span> from the
              database. This modification is permanent.
            </p>
            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-3 py-1.5 border border-[#344E41] text-xs font-bold text-[#344E41] bg-gray-200 dark:bg-zinc-800 rounded-lg cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteResource}
                className="px-4 py-1.5 text-xs font-bold bg-red-500 text-white rounded-lg cursor-pointer hover:bg-red-600"
              >
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomDetailsPage;
