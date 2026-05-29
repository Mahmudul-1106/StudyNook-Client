import Banner from "@/components/Banner";
import RoomCard from "@/components/RoomCard";
import Image from "next/image";

// Forces Next.js to re-render this server page on every navigation request
export const dynamic = "force-dynamic";

export default async function Home() {
  // Explicitly tell fetch not to store static build cache shards
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/featured`, {
    cache: "no-store", 
  });
  const featuredRooms = await res.json(); 
  console.log(featuredRooms);

  return (
    <div> 
      <Banner />

      {/* Dynamic Section – Available Study Rooms (last-6) */}
      <section className="py-10">
        <div className="pb-5 text-center">
          <h2 className="text-3xl tracking-tight font-heading text-[#344E41] sm:text-4xl">
            Available Study Rooms
          </h2>
          <p className="mt-3 text-center mx-auto text-sm text-black/80 max-w-xl">
            Hand-picked rooms recently added to StudyNook.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-base-200 p-5 rounded-xl">
          {featuredRooms?.map((room) => (
            <RoomCard key={room._id} room={room} />
          ))}
        </div>
      </section>
    </div>
  );
}