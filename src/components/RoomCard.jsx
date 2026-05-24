import Image from "next/image";
import Link from "next/link";
import React from "react";

const RoomCard = ({ room }) => {
  const { _id, name, bio, image, floor, capacity, pricePerHour, amenities } =
    room;

  return (
    // 'flex flex-col h-full' ensures cards maintain a matching equal height footprint
    <div className="card bg-base-200 w-full shadow-md border border-base-200/60 hover:shadow-lg transition-shadow duration-300 flex flex-col h-full overflow-hidden">
      {/* Uniform Crop Image Field */}
      <figure className="relative h-48 w-full bg-base-200">
        <Image
          className="w-full h-full object-cover"
          alt={name || "Premium Study Space"}
          src={image}
          unoptimized
          fill
          sizes="(max-w-768px) 100vw, (max-w-1024px) 50vw, 33vw"
        />
      </figure>

      {/* Card Body Container */}
      <div className="card-body p-5 flex flex-col grow">
        {/* Title */}
        <h3 className="text-2xl font-heading  line-clamp-1">{name}</h3>

        {/* Metric Meta Row: Floor & Seats Layout */}
        <div className="flex flex-wrap items-center gap-x-2 text-xs text-black/70 font-medium mt-1">
          <span>🏢 {floor || "Main Floor"}</span>
          <span className="text-base-300">•</span>
          <span>👥 {capacity} people</span>
        </div>

        {/* Short Description: Truncated smoothly to ~100 characters via line-clamp utilities */}
        <p className="text-sm text-base-content/80 line-clamp-2 my-3 grow">
          {bio}
        </p>

        {/* Dynamic Slice Amenity Chips Container */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {amenities?.slice(0, 3).map((amenity, index) => (
            <div
              key={index}
              className="badge badge-outline badge-sm rounded-md capitalize font-medium text-[11px] tracking-wide py-2"
            >
              {amenity}
            </div>
          ))}
          {amenities?.length > 3 && (
            <div className="badge badge-outline badge-sm rounded-md font-bold text-[11px] text-primary py-2">
              +{amenities.length - 3} more
            </div>
          )}
        </div>

        {/* Action / Pricing Boundary Footer */}
        <div className="card-actions justify-between items-center mt-auto pt-3 border-t border-base-200/80">
          <div>
            <span className="text-xl font-bold text-primary">
              ${pricePerHour}
            </span>
            <span className="text-xs text-black/70 font-semibold">/hr</span>
          </div>
          <Link
            href={`/rooms/${_id}`}
            className="btn btn-primary btn-sm rounded-xl text-white font-semibold tracking-wide px-4 shadow-sm"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
