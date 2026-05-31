"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useSpring, animated, useSprings } from "@react-spring/web";

const RoomCard = ({ room }) => {
  const { _id, name, bio, image, floor, capacity, pricePerHour, amenities } =
    room;

  const [props, set] = useSpring(() => ({
    scale: 1,
    shadow: "0px 5px 15px rgba(0,0,0,0.1)",
    config: { tension: 300, friction: 10 }, // Bouncy config
  }));

  return (
    <animated.div
      // 2. Apply the animated props to the style
      style={{
        transform: props.scale.to((s) => `scale(${s})`),
        boxShadow: props.shadow,
      }}
      // 3. Trigger changes on hover
      onMouseEnter={() =>
        set({ scale: 1.05, shadow: "0px 15px 30px rgba(0,0,0,0.2)" })
      }
      onMouseLeave={() =>
        set({ scale: 1, shadow: "0px 5px 15px rgba(0,0,0,0.1)" })
      }
      // 'flex flex-col h-full' ensures cards maintain a matching equal height footprint
      className="card bg-[#DAD7CD] mb-0 pb-0 w-full border border-base-200/60 hover:shadow-lg transition-shadow duration-300 flex flex-col h-full overflow-hidden"
    >
      {/* Uniform Crop Image Field */}
      <div className="hover-3d">
        <figure className="relative h-48 w-full bg-base-200 rounded-md">
          <Image
            className="w-full h-full object-cover"
            alt={name || "Premium Study Space"}
            src={image}
            unoptimized
            fill
            sizes="(max-w-768px) 100vw, (max-w-1024px) 50vw, 33vw"
          />
        </figure>
      </div>

      {/* Card Body Container */}
      <div className="card-body p-2 flex flex-col grow">
        {/* Title */}
        <h3 className="text-2xl font-bold  line-clamp-1">{name}</h3>

        {/* Metric Meta Row: Floor & Seats Layout */}
        <div className="flex flex-wrap items-center  gap-x-2 text-xs text-black/70 font-medium mt-1">
          <span>🏢 {floor || "Main Floor"}</span>
          <span className="text-base-300">•</span>
          <span>👥 {capacity} people</span>
        </div>

        {/* Short Description: Truncated smoothly to ~100 characters via line-clamp utilities */}
        <p className="text-sm text-base-content/80 line-clamp-2 my-1 overflow-hidden wrap-break-word whitespace-normal">
          {bio}
        </p>

        {/* Dynamic Slice Amenity Chips Container */}
        <div className="flex flex-wrap gap-1.5 mb-2 ">
          {amenities?.slice(0, 3).map((amenity, index) => (
            <div
              key={index}
              className="badge badge-outline border-[#344E41] bg-[#A3B18A]  badge-sm rounded-md capitalize font-medium text-[11px] tracking-wide py-2"
            >
              {amenity}
            </div>
          ))}
          {amenities?.length > 3 && (
            <div className="badge badge-outline border-[#344E41] badge-sm rounded-md font-bold text-[11px] text-[#344E41] py-2">
              +{amenities.length - 3} more
            </div>
          )}
        </div>

        {/* Action / Pricing Boundary Footer */}
        <div className="card-actions justify-between items-center mt-auto pt-4 border-t border-[#344E41]/20">
          <div>
            <span className="text-xl font-bold text-[#344E41]">
              ${pricePerHour}
            </span>
            <span className="text-xs text-black/70 font-semibold">/hr</span>
          </div>
          <Link href={`/rooms/${_id}`}>
            <button className=" py-2 bg-linear-to-r from-[#588157] to-[#3A5A40] hover:from-[#3A5A40] hover:to-[#344E41] cursor-pointer rounded-xl text-white px-4">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </animated.div>
  );
};

export default RoomCard;
